<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Processo;
use App\Models\PoloAtivo;
use App\Models\PoloPassivo;
use App\Models\Telefone;
use App\Models\Email;
use App\Models\Documento;

class ProcessosSeeder extends Seeder
{
    public function run(): void
    {
        Processo::factory()->count(20)->create()->each(function ($processo) {

            $poloAtivo = PoloAtivo::factory()->create([
                'id_processo' => $processo->id,
            ]);

            $poloPassivo = PoloPassivo::factory()->create([
                'id_processo' => $processo->id,
            ]);

            Documento::factory()->count(3)->create([
                'id_processo' => $processo->id,
            ]);

            Telefone::factory()->count(2)->create([
                'id_polo_passivo' => $poloPassivo->id,
            ]);

            Email::factory()->count(2)->create([
                'id_polo_passivo' => $poloPassivo->id,
            ]);
        });
    }
}
