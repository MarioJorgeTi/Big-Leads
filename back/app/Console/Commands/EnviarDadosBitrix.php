<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Traits\BitrixCrmTrait;

class EnviarDadosBitrix extends Command
{
    use BitrixCrmTrait;

    protected $signature = 'dados:bitrix';
    protected $description = 'Envia leads pro bitrix';

    public function handle()
    {
        $caminhoJson = storage_path('app/private/processos/processos.json');
        $json = file_get_contents($caminhoJson);
        $processos = json_decode($json, true);
        foreach ($processos as $processo) {
            $sourceDescription =
                "--- Dados do Processo ---\n" .
                "Número do Processo: {$processo['numero_processo']} \n" .
                "Classe Judicial: {$processo['classe_judicial']} \n" .
                "Assunto: {$processo['assunto']} \n" .
                "Jurisdição: {$processo['jurisdicao']} \n" .
                "Data Autuação: " . date('d/m/Y', strtotime($processo['data_autuacao'])) . "\n" .
                "Última Distribuição: " . date('d/m/Y', strtotime($processo['ultima_distribuicao'])) . "\n" .
                "Valor da Causa: R$ " . number_format($processo['valor_causa'], 2, ',', '.') . " \n" .
                "Segredo de Justiça: " . ($processo['segredo_justica'] ? 'sim' : 'não') . " \n" .
                "Justiça Gratuita: " . ($processo['justica_gratuita'] ? 'sim' : 'não') . " \n" .
                "Tutela Liminar: " . ($processo['tutela_liminar'] ? 'sim' : 'não') . " \n" .
                "Prioridade: {$processo['prioridade']} \n" .
                "Órgão Julgador: {$processo['orgao_julgador']} \n" .
                "Cargo Judicial: {$processo['cargo_judicial']} \n" .
                "Competência: {$processo['competencia']} \n" .
                "Estado: RJ \n" .
                "\n\n--- Polo Ativo ---\n" .
                "Nome: " . $processo['polo_ativo'][0]['nome'] . "\n" .
                "CPF/CNPJ: " . $processo['polo_ativo'][0]['cpf_cnpj']  . "\n";
            foreach ($processo['polo_passivo'] as $polo) {
                $sourceDescription .= "\n\n--- Polo Passivo ---\n";
                $sourceDescription .= "Nome: " . $polo['nome'] . "\n";
                $sourceDescription .= "CPF/CNPJ: " . $polo['cpf_cnpj'] . "\n";
                if (!empty($polo['telefones'])) {
                    $telefones = array_column($polo['telefones'], 'numero');
                    $sourceDescription .= "Telefones: " . implode(', ', $telefones) . "\n";
                }
                if (!empty($polo['emails'])) {
                    $sourceDescription .= "E-mails: " . implode(', ', $polo['emails']) . "\n";
                }
            }
            $lead = [
                'TITLE' => $processo['polo_passivo'][0]['nome'] . " Robô",
                'NAME' => $processo['polo_passivo'][0]['nome'],
                'CURRENCY_ID' => 'BRL',
                'OPPORTUNITY' => $processo['valor_causa'],
                'COMMENTS' => "Lead criado automaticamente pelo Robo de Leads",
                'SOURCE_DESCRIPTION' => $sourceDescription,
                'CATEGORY_ID' => 1,
            ];
            $resultado = $this->criarLeadNoBitrix($lead);
            if ($resultado) {
                $this->info("Lead para processo {$processo['numero_processo']} enviado com sucesso.");
            } else {
                $this->info("Erro ao enviar lead para processo {$processo['numero_processo']}");
            }
            break;
        }
    }
}
