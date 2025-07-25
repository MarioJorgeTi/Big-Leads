<?php

namespace App\Http\Controllers;

use App\Models\Processo;

class ProcessoController extends Controller
{
    public function lerProcessos()
    {
        $processos = Processo::with(['polosAtivos', 'polosPassivos'])->get();
        return response()->json([
            'success' => [
                'mensagem' => 'Processos recuperados com sucesso.',
                'processos' => $processos
            ]
        ], 200);
    }

    public function lerProcesso($id)
    {
        $processo = Processo::with(['polosAtivos', 'polosPassivos'])->find($id);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Processo recuperado com sucesso.',
                'processo' => $processo
            ]
        ], 200);
    }
}
