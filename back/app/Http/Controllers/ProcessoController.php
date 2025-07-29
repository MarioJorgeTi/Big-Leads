<?php

namespace App\Http\Controllers;

use App\Models\Processo;
use App\Models\Usuario;
use Illuminate\Http\Request;

class ProcessoController extends Controller
{
    public function lerProcessos()
    {
        $processos = Processo::with(['polosAtivos', 'polosPassivos.telefones', 'polosPassivos.emails'])->get();
        return response()->json([
            'success' => [
                'mensagem' => 'Processos recuperados com sucesso.',
                'processos' => $processos
            ]
        ], 200);
    }

    public function lerProcesso($id)
    {
        $processo = Processo::with(['polosAtivos', 'polosPassivos.telefones', 'polosPassivos.emails'])->find($id);
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

    public function lerProcessosUsuario(Request $request)
    {
        $usuario = $request->user();
        $processos = Processo::where('id_usuario', $usuario->id)->get();
        if ($processos->isEmpty()) {
            return response()->json([
                'errors' => [
                    'processos' => 'Nenhum processo encontrado'
                ]
            ], 404);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Processos recuperados com sucesso.',
                'processos' => $processos
            ]
        ], 200);
    }

    public function puxarProcessoUsuario(Request $request, $id)
    {
        $usuario = $request->user();
        $processo = Processo::find($id);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'processo' => 'Processo não encontrado'
                ]
            ], 404);
        }
        if ($processo->id_usuario) {
            return response()->json([
                'errors' => [
                    'processo' => 'Este processo já está atribuído a um usuário'
                ]
            ], 409);
        }
        $processo->id_usuario = $usuario->id;
        $processo->status = 'alocado';
        $processo->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Processo atribuído com sucesso.',
                'processo' => $processo
            ]
        ], 200);
    }

    public function atribuirProcessoUsuario($id_processo, $id_usuario)
    {
        $processo = Processo::find($id_processo);
        $usuario = Usuario::find($id_usuario);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'processo' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        if (!$usuario) {
            return response()->json([
                'errors' => [
                    'usuario' => 'Usuário não encontrado.'
                ]
            ], 404);
        }
        if ($processo->id_usuario) {
            return response()->json([
                'errors' => [
                    'processo' => 'Este processo já está atribuído a um usuário.'
                ]
            ], 409);
        }
        $processo->id_usuario = $usuario->id;
        $processo->status = 'alocado';
        $processo->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Processo atribuído ao usuário com sucesso.',
            ]
        ], 200);
    }

    public function processosFunilGeral()
    {
        $processos = Processo::with(['polosAtivos', 'polosPassivos.telefones', 'polosPassivos.emails'])->whereNull('id_usuario')->get();
        return response()->json([
            'success' => [
                'mensagem' => 'Processos não atribuídos encontrados com sucesso.',
                'processos' => $processos
            ]
        ], 200);
    }
}
