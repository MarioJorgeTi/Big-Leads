<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Processo;
use App\Models\PoloAtivo;
use App\Models\PoloPassivo;
use App\Models\Telefone;
use App\Models\Email;
use App\Models\Documento;
use App\Models\Usuario;

class ProcessosSeeder extends Seeder
{
    public function run(): void
    {
        $usuariosDisponiveis = Usuario::where('nivel_acesso', '!=', 1)->get();
        Processo::factory()->count(20)->create()->each(function ($processo) use ($usuariosDisponiveis) {
            $usuario = $usuariosDisponiveis->random();
            $processo->id_usuario = $usuario->id;
            $processo->status = 'alocado';
            $processo->save();
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
        Processo::factory()->count(20)->create();
    }
}
