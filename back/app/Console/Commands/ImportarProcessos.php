<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Processo;
use App\Models\PoloAtivo;
use App\Models\PoloPassivo;
use App\Models\Documento;
use App\Models\Telefone;
use App\Models\Email;

class ImportarProcessos extends Command
{
    protected $signature = 'importar:processos';
    protected $description = 'Importa os processos e documentos do Storage para o banco de dados.';

    public function handle()
    {
        $this->info("Começando importação dos processos.");
        $caminhoJson = storage_path('app/private/processos/processos.json');
        if (!file_exists($caminhoJson)) {
            $this->error("Arquivo JSON não encontrado em: {$caminhoJson}");
            return;
        }
        $dados = json_decode(file_get_contents($caminhoJson), true);
        if (!is_array($dados)) {
            $this->error("JSON inválido.");
            return;
        }
        foreach ($dados as $processoJson) {
            $processoExistente = Processo::where('numero_processo', $processoJson['numero_processo'])->first();
            if ($processoExistente) {
                $this->info("Processo {$processoJson['numero_processo']} já existe. Pulando...");
                continue;
            }
            $processo = Processo::create([
                'numero_processo' => $processoJson['numero_processo'],
                'orgao_julgador' => $processoJson['orgao_julgador'],
                'data_autuacao' => $processoJson['data_autuacao'],
                'classe_judicial' => $processoJson['classe_judicial'],
                'ultima_distribuicao' => $processoJson['ultima_distribuicao'],
                'valor_causa' => $processoJson['valor_causa'],
                'jurisdicao' => $processoJson['jurisdicao'],
                'assunto' => $processoJson['assunto'],
                'segredo_justica' => $processoJson['segredo_justica'],
                'justica_gratuita' => $processoJson['justica_gratuita'],
                'tutela_liminar' => $processoJson['tutela_liminar'],
                'prioridade' => $processoJson['prioridade'],
                'cargo_judicial' => $processoJson['cargo_judicial'],
                'competencia' => $processoJson['competencia'],
            ]);
            foreach ($processoJson['polo_ativo'] as $polo) {
                PoloAtivo::create([
                    'nome' => $polo['nome'],
                    'cpf_cnpj' => $polo['cpf_cnpj'],
                    'id_processo' => $processo->id,
                ]);
            }
            foreach ($processoJson['polo_passivo'] as $polo) {
                $poloPassivo = PoloPassivo::create([
                    'nome' => $polo['nome'],
                    'cpf_cnpj' => $polo['cpf_cnpj'],
                    'id_processo' => $processo->id,
                ]);
                if (isset($polo['telefones']) && is_array($polo['telefones'])) {
                    foreach ($polo['telefones'] as $tel) {
                        if (!empty($tel['numero'])) {
                            Telefone::create([
                                'id_polo_passivo' => $poloPassivo->id,
                                'tipo' => $tel['tipo'] ?? 'desconhecido',
                                'numero' => $tel['numero'],
                            ]);
                        }
                    }
                }
                if (isset($polo['emails']) && is_array($polo['emails'])) {
                    foreach ($polo['emails'] as $email) {
                        if (!empty($email)) {
                            Email::create([
                                'id_polo_passivo' => $poloPassivo->id,
                                'endereco' => $email,
                            ]);
                        }
                    }
                }
            }
            $nomeArquivo = $processoJson['numero_processo'] . '.pdf';
            $caminhoPdf = storage_path("app/private/processos/{$nomeArquivo}");

            if (file_exists($caminhoPdf)) {
                $caminhoRelativo = "private/processos/{$nomeArquivo}";
                Documento::create([
                    'id_processo' => $processo->id,
                    'nome' => 'Petição inicial e anexos',
                    'arquivo' => $caminhoRelativo,
                ]);
            } else {
                $this->warn("PDF não encontrado para o processo {$processo->numero_processo}");
            }
        }
        $this->info("Importação concluída!");
    }
}
