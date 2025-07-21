<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class ExecutarRoboPje extends Command
{
    protected $signature = 'executar:robo-pje';
    protected $description = 'Executa o robô Node.js e importa os processos';

    public function handle()
    {
        $this->info('Executando o robô Node.js...');

        $processNode = new Process(['node', base_path('scripts/robo_pje.js')]);
        $processNode->setTimeout(null);
        $processNode->run(function ($type, $buffer) {
            echo $buffer;
        });

        if (!$processNode->isSuccessful()) {
            throw new ProcessFailedException($processNode);
        }

        $this->info('Robô executado com sucesso');

        $this->info('Executando comando importar:processos');
        $this->call('importar:processos');

        $this->info('Importação completa');
    }
}
