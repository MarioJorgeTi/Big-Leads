<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ImportarDadosBanco extends Command
{

    protected $signature = 'importar:dados';
    protected $description = 'Executa uma sequencia de scripts para popular o banco.';

    public function handle()
    {
        $this->info('Iniciando execução de todos os comandos...');
        $this->call('executar:robo-pje');
        $this->call('importar:contatos');
        $this->call('importar:processos');
        $this->info('Todos os comandos foram executados com sucesso.');
    }
}
