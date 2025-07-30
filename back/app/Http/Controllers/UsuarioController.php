<?php

namespace App\Http\Controllers;

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

    public function lerUsuarios()
    {
        $usuarios = Usuario::all();
        return response()->json([
            'success' => [
                'mensagem' => 'Usuários encontrados com sucesso.',
                'usuarios' => $usuarios
            ]
        ], 200);
    }

    public function atribuirSubordinado(Request $request, $id)
    {
        $usuario = $request->user();
        if ($usuario->id == $id) {
            return response()->json([
                'errors' => [
                    'subordinacao' => 'Você não pode se atribuir como subordinado.'
                ]
            ], 400);
        }
        $subordinado = Usuario::find($id);
        if (!$subordinado) {
            return response()->json([
                'errors' => [
                    'usuario' => 'Usuário não encontrado.'
                ]
            ], 404);
        }
        $subordinado->id_superior = $usuario->id;
        $subordinado->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Subordinação concluida com sucesso.',
            ]
        ], 200);
    }

    public function lerSubordinados(Request $request)
    {
        $usuario = $request->user();
        $subordinados = Usuario::where('id_superior', $usuario->id)->get();
        if ($subordinados->isEmpty()) {
            return response()->json([
                'errors' => [
                    'subordinados' => 'Nenhum subordinado encontrado.'
                ]
            ], 404);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Subordinados recuperados com sucesso.',
                'subordinados' => $subordinados
            ]
        ], 200);
    }
}
