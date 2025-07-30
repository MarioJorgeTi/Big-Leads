<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Models\Usuario;
use App\Models\Processo;
use Illuminate\Http\Request;
use App\Http\Requests\CriarDocumentoRequest;
use App\Http\Requests\DeletarDocumentoRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

    public function criarDocumento(CriarDocumentoRequest $request)
    {
        $arquivoPath = $request->file('arquivo')->store('documentos');
        $documento = Documento::create([
            'id_processo' => $request->id_processo,
            'nome' => $request->nome,
            'arquivo' => $arquivoPath,
        ]);
        return response()->json([
            'success' => [
                'mensagem' => 'Documento criado com sucesso.',
                'documento' => $documento
            ]
        ], 201);
    }

    public function criarDocumentoProcesso(CriarDocumentoRequest $request)
    {
        $usuario = $request->user();
        $processo = Processo::find($request->id_processo);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'processo' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        if ($processo->id_usuario !== $usuario->id) {
            return response()->json([
                'errors' => [
                    'autorizacao' => 'Você não tem permissão para adicionar documentos a este processo.'
                ]
            ], 403);
        }
        $arquivoPath = $request->file('arquivo')->store('documentos');
        $documento = Documento::create([
            'id_processo' => $request->id_processo,
            'nome' => $request->nome,
            'arquivo' => $arquivoPath,
        ]);
        return response()->json([
            'data' => [
                'mensagem' => 'Documento criado com sucesso.',
                'documento' => $documento
            ]
        ], 201);
    }


    public function deletarDocumento(DeletarDocumentoRequest $request)
    {
        $usuario = $request->user();
        if (!Hash::check($request->senha, $usuario->senha)) {
            return response()->json([
                'errors' => [
                    'senha' => 'Senha incorreta.'
                ]
            ], 401);
        }
        $documento = Documento::find($request->id_documento);
        if (!$documento) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Documento não encontrado.'
                ]
            ], 404);
        }

        if (Storage::exists($documento->arquivo)) {
            Storage::delete($documento->arquivo);
        }
        $documento->delete();
        return response()->json([
            'success' => [
                'mensagem' => 'Documento removido com sucesso.'
            ]
        ], 200);
    }

    public function deletarDocumentoProcesso(DeletarDocumentoRequest $request)
    {
        $usuario = $request->user();
        if (!Hash::check($request->senha, $usuario->senha)) {
            return response()->json([
                'errors' => [
                    'senha' => 'Senha incorreta.'
                ]
            ], 401);
        }
        $documento = Documento::find($request->id_documento);
        if (!$documento) {
            return response()->json([
                'errors' => [
                    'documento' => 'Documento não encontrado.'
                ]
            ], 404);
        }
        $processo = Processo::find($documento->id_processo);
        if (!$processo || $processo->id_usuario !== $usuario->id) {
            return response()->json([
                'errors' => [
                    'autorizacao' => 'Você não tem permissão para excluir este documento.'
                ]
            ], 403);
        }
        if (Storage::exists($documento->arquivo)) {
            Storage::delete($documento->arquivo);
        }
        $documento->delete();
        return response()->json([
            'data' => [
                'mensagem' => 'Documento removido com sucesso.'
            ]
        ], 200);
    }
}
