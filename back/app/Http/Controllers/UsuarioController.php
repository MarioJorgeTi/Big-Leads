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
            return response()->json(['errors' => ['autenticacao' => ['E-mail ou senha inválidos']]], 401);
        }
        $token = $usuario->createToken('token-api')->accessToken;
        return response()->json(['token' => $token, 'usuario' => $usuario]);
    }

    public function lerUsuario(Request $request)
    {
        $usuario = $request->user();
        if (!$usuario) {
            return response()->json(['errors' => ['autenticacao' => ['Usuário não autenticado']]], 401);
        }
        return response()->json(['usuario' => $usuario]);
    }

    public function lerProcessosUsuario(Request $request)
    {
        $usuario = $request->user();
        $processos = Processo::where('id_usuario', $usuario->id)->get();
        if ($processos->isEmpty()) {
            return response()->json(['errors' => ['processos' => ['Nenhum processo encontrado']]], 404);
        }
        return response()->json(['processos' => $processos]);
    }

    public function atribuirProcessoUsuario(Request $request, $id)
    {
        $usuario = $request->user();
        $processo = Processo::find($id);
        if (!$processo) {
            return response()->json(['errors' => ['processo' => ['Processo não encontrado']]], 404);
        }
        if ($processo->id_usuario) {
            return response()->json(['errors' => ['processo' => ['Este processo já está atribuído a um usuário']]], 409);
        }
        $processo->id_usuario = $usuario->id;
        $processo->status = 'alocado';
        $processo->save();
        return response()->json(['mensagem' => 'Processo atribuído com sucesso.', 'processo' => $processo]);
    }
}
