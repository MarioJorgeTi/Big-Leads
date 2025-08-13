<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ExportarDadosBitrix extends Command
{
    protected $signature = 'exportar:bitrix';
    protected $description = 'Baixa os dados do robo adiciona os contatos e envia pro bitrix';

    public function handle()
    {
        $this->info('Iniciando execução de todos os comandos...');
        $this->call('executar:robo-pje');
        $this->call('importar:contatos');
        
        $this->info('Todos os comandos foram executados com sucesso.');
    }
}
