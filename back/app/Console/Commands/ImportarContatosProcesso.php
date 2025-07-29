<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Traits\AssertivaTrait;

class ImportarContatosProcesso extends Command
{
    use AssertivaTrait;

    protected $signature = 'importar:contatos';
    protected $description = 'Enriquece o JSON de processos com telefones e emails dos polos passivos.';

    public function handle()
    {
        $this->info("Obtendo contatos do polo passivo dos processos.");
        $path = storage_path('app/private/processos/processos.json');
        if (!File::exists($path)) {
            $this->error("Arquivo processos.json não encontrado em $path");
        }
        $json = json_decode(File::get($path), true);
        if (!is_array($json)) {
            $this->error("Conteúdo inválido no JSON");
        }
        foreach ($json as &$processo) {
            if (!isset($processo['polo_passivo']) || !is_array($processo['polo_passivo'])) {
                continue;
            }
            foreach ($processo['polo_passivo'] as &$polo) {
                $cpfCnpj = preg_replace('/\D/', '', $polo['cpf_cnpj'] ?? '');

                if (strlen($cpfCnpj) !== 11 && strlen($cpfCnpj) !== 14) {
                    continue;
                }
                $response = $this->consultarCpfCnpj($cpfCnpj);
                $resposta = $response->getData(true);
                if (!isset($resposta['success']['dados']['resposta'])) {
                    continue;
                }
                $dados = $resposta['success']['dados']['resposta'];
                $telefones = [];
                foreach ($dados['telefones']['fixos'] ?? [] as $fixo) {
                    $telefones[] = [
                        'tipo' => 'fixo',
                        'numero' => $fixo['numero'] ?? null
                    ];
                }
                foreach ($dados['telefones']['moveis'] ?? [] as $movel) {
                    $telefones[] = [
                        'tipo' => 'movel',
                        'numero' => $movel['numero'] ?? null
                    ];
                }
                $emails = [];
                foreach ($dados['emails'] ?? [] as $email) {
                    $emails[] = $email['email'] ?? null;
                }
                $polo['telefones'] = $telefones;
                $polo['emails'] = $emails;
            }
        }
        File::put($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        $this->info("Contatos obtidos com sucesso!");
    }
}
