<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use \App\Console\Commands\ImportarDatajud;
use \App\Console\Commands\ImportarProcessos;
use \App\Console\Commands\ExecutarRoboPje;
use \App\Console\Commands\ImportarContatosProcesso;
use \App\Console\Commands\ImportarDadosBanco;
use \App\Console\Commands\DbBoot;
use \App\Console\Commands\EnviarDadosBitrix;
use \App\Console\Commands\ExportarDadosBitrix;

class Kernel extends ConsoleKernel
{
    /**
     * Os comandos Artisan customizados da aplicação.
     *
     * @var array
     */
    protected $commands = [
        ImportarDatajud::class,
        ImportarProcessos::class,
        ExecutarRoboPje::class,
        ImportarContatosProcesso::class,
        ImportarDadosBanco::class,
        DbBoot::class,
        ExportarDadosBitrix::class,
        EnviarDadosBitrix::class,
    ];

    /**
     * Defina os comandos agendados.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Agendamentos aqui, se necessário
    }

    /**
     * Registre os comandos do console da aplicação.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
