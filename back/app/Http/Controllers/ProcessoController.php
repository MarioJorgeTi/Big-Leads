<?php

namespace App\Http\Controllers;

use App\Models\Processo;

class ProcessoController extends Controller
{
    public function pegarProcessos()
    {
        $processos = Processo::with(['polosAtivos', 'polosPassivos'])->get();
        return response()->json($processos);
    }

    public function pegarProcesso($id)
    {
        $processo = Processo::with(['polosAtivos', 'polosPassivos'])->find($id);
        if (!$processo) {
            return response()->json(['mensagem' => 'Processo não encontrado.'], 404);
        }
        return response()->json($processo);
    }
}
