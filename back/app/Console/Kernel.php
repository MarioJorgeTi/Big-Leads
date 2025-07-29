<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Os comandos Artisan customizados da aplicação.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\ImportarDatajud::class,
        \App\Console\Commands\ImportarProcessos::class,
        \App\Console\Commands\ExecutarRoboPje::class,
        \App\Console\Commands\ImportarContatosProcesso::class,
        \App\Console\Commands\ImportarDadosBanco::class,
        \App\Console\Commands\DbBoot::class,
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
