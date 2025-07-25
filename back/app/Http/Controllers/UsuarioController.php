<?php

namespace App\Http\Controllers;

use App\Models\Processo;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function login(LoginRequest $request)
    {
        $usuario = Usuario::where('email', $request->email)->first();
        if (!$usuario || !Hash::check($request->senha, $usuario->senha)) {
            return response()->json([
                'errors' => [
                    'autenticacao' => 'E-mail ou senha inválidos'
                ]
            ], 401);
        }
        foreach ($usuario->tokens()->where('revoked', false)->get() as $token) {
            $token->revoke();
        }
        $token = $usuario->createToken('token-api')->accessToken;
        return response()->json([
            'success' => [
                'mensagem' => 'Autenticação realizada com sucesso.',
                'token' => $token,
                'usuario' => $usuario
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'success' => [
                'mensagem' => 'Logout realizado com sucesso.'
            ]
        ], 200);
    }

    public function lerUsuario(Request $request)
    {
        $usuario = $request->user();
        if (!$usuario) {
            return response()->json([
                'errors' => [
                    'autenticacao' => 'Usuário não autenticado'
                ]
            ], 401);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Usuário recuperado com sucesso.',
                'usuario' => $usuario
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

    public function atribuirProcessoUsuario(Request $request, $id)
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
}
