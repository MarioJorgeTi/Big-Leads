<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ImportarDatajud extends Command
{
    protected $signature = 'importar:datajud {tribunal} {numero_processo}';
    protected $description = 'Importa metadados processuais do Datajud pelo número do processo.';

    public function handle()
    {
        $tribunal = $this->argument('tribunal');

        $numero = $this->argument('numero_processo');

        $url = "https://api-publica.datajud.cnj.jus.br/api_publica_{$tribunal}/_search";

        /*
        $payload = [
            'query' => [
                'match' => [
                    'numeroProcesso' => $numero
                ],
            ],
        ];

        $payload = [
            'query' => [
                'match' => [
                    'assuntos.nome' => 'Busca e Apreensão',
                ]
            ],
            'size' => 10
        ];

        $payload = [
            'query' => [
                'bool' => [
                    'must' => [
                        ['match' => ['assuntos.nome' => 'Busca e Apreensão']],
                        ['match' => ['dataAjuizamento' => $agora]],
                    ]
                ]
            ],
            'size' => 10
        ];

        */
        $agoraUtc = now()->setTimezone('UTC')->format('Y-m-d\TH:i:s.v\Z');

        $payload = [
            'query' => [
                'match' => [
                    'assuntos.nome' => 'Busca e Apreensão',
                ]
            ],
            'sort' => [
                'dataAjuizamento' => [
                    'order' => 'desc'
                ]
            ],
            'size' => 3
        ];

        $response = Http::withHeaders(['Authorization' => 'APIKey ' . config('services.datajud.chave_api'), 'Content-Type' => 'application/json',])->post($url, $payload);

        if (!$response->successful()) {
            $this->error('Erro ao acessar API: ' . $response->status());
            return 1;
        }

        $dados = $response->json()['hits']['hits'] ?? [];

        if (empty($dados)) {
            $this->info("Nenhum processo encontrado com o número: {$numero}");
            return 0;
        }

        foreach ($dados as $hit) {
            $meta = $hit['_source'] ?? [];
            dump($meta);
        }

        $this->info("Importação do processo {$numero} no tribunal {$tribunal} concluída!");
        return 0;
    }
}
