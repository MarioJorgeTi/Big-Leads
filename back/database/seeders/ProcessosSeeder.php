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
        Processo::factory()->count(50)->create()->each(function ($processo) use ($usuariosDisponiveis) {
            $usuario = $usuariosDisponiveis->random();
            $processo->id_usuario = $usuario->id;
            $processo->save();
            PoloAtivo::factory()->create([
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
        Processo::factory()->count(50)->create()->each(function ($processo) {
            PoloAtivo::factory()->create([
                'id_processo' => $processo->id,
            ]);
            $poloPassivo = PoloPassivo::factory()->create([
                'id_processo' => $processo->id,
            ]);
            Documento::factory()->count(3)->create([
                'id_processo' => $processo->id,
            ]);
            Telefone::factory()->count(rand(1, 3))->create([
                'id_polo_passivo' => $poloPassivo->id,
            ]);
            Email::factory()->count(rand(1, 3))->create([
                'id_polo_passivo' => $poloPassivo->id,
            ]);
        });
        $statusList = ['alocado_dia1', 'alocado_dia2', 'alocado_dia3', 'alocado_dia4', 'alocado_dia5', 'assinado', 'recorrencia', 'devolvido_tramit'];
        $usuario = Usuario::where('email', 'testevendedor@teste.com')->first();
        foreach ($statusList as $status) {
            Processo::factory()->create([
                'id_usuario' => $usuario->id,
                'status' => $status,
            ]);
        }
        $faltam = 50 - count($statusList);
        if ($faltam > 0) {
            Processo::factory()->count($faltam)->create([
                'id_usuario' => $usuario->id,
            ]);
        }
    }
}
