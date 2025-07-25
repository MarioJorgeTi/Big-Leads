<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use Illuminate\Http\Request;

class DocumentoController extends Controller
{

    public function lerDocumentosProcesso($idProcesso)
    {
        $documentos = Documento::where('id_processo', $idProcesso)->get();
        if ($documentos->isEmpty()) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Nenhum documento encontrado para este processo.'
                ]
            ], 404);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Documentos encontrados com sucesso.',
                'documentos' => $documentos
            ]
        ], 200);
    }
}
