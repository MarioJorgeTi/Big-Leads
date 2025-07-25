<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class DbBoot extends Command
{
    protected $signature = 'db:boot';
    protected $description = 'Reseta o BD, semeia o banco e cria o personal access client';

    public function handle()
    {
        $this->info('Rodando migrate:fresh...');
        Artisan::call('migrate:fresh');
        $this->line(Artisan::output());

        $this->info('Rodando db:seed...');
        Artisan::call('db:seed');
        $this->line(Artisan::output());

        $this->info('🔐 Criando Personal Access Client (Passport)...');
        $process = new Process(['php', 'artisan', 'passport:client', '--personal', '--provider=users']);
        $process->setInput("yes\nusers\n");
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $this->info($process->getOutput());
        $this->info('Personal Access Client criado com sucesso!');
        $this->info('Db resetado e semeado!');
    }
}
