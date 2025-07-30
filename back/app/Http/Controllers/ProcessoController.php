<?php

namespace App\Http\Controllers;

use App\Models\Processo;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Requests\EditarProcessoRequest;
use App\Http\Requests\DeletarProcessoRequest;
use Illuminate\Support\Facades\Hash;

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

    public function puxarProcesso(Request $request, $id)
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

    public function atribuirProcesso(Request $request, $id_processo, $id_usuario)
    {
        $usuarioAutenticado = $request->user();
        $processo = Processo::find($id_processo);
        $usuarioDestino = Usuario::find($id_usuario);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'processo' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        if (!$usuarioDestino) {
            return response()->json([
                'errors' => [
                    'usuario' => 'Usuário não encontrado.'
                ]
            ], 404);
        }
        if ($processo->id_usuario && $processo->id_usuario !== $usuarioAutenticado->id) {
            return response()->json([
                'errors' => [
                    'processo' => 'Você só pode atribuir processos que ainda não foram atribuídos ou que são seus.'
                ]
            ], 403);
        }
        if ($usuarioDestino->nivel_acesso < $usuarioAutenticado->nivel_acesso) {
            return response()->json([
                'errors' => [
                    'autorizacao' => 'Você só pode atribuir processos a usuários com nível igual ou inferior ao seu.'
                ]
            ], 403);
        }
        $processo->id_usuario = $usuarioDestino->id;
        $processo->status = 'alocado';
        $processo->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Processo atribuído ao usuário com sucesso.'
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

    public function editarProcesso(EditarProcessoRequest $request, $id)
    {
        $processo = Processo::find($id);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        $processo->fill($request->validated());
        $processo->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Processo atualizado com sucesso.',
                'processo' => $processo
            ]
        ], 200);
    }

    public function editarProcessoUsuario(EditarProcessoRequest $request, $id)
    {
        $usuario = $request->user();
        $processo = Processo::find($id);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        if ($processo->id_usuario !== $usuario->id) {
            return response()->json([
                'errors' => [
                    'autorizacao' => 'Você não tem permissão para editar este processo.'
                ]
            ], 403);
        }
        $processo->fill($request->validated());
        $processo->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Processo atualizado com sucesso.',
                'processo' => $processo
            ]
        ], 200);
    }

    public function deletarProcesso(DeletarProcessoRequest $request, $id)
    {
        $usuario = $request->user();
        if (!Hash::check($request->senha, $usuario->senha)) {
            return response()->json([
                'errors' => [
                    'senha' => 'Senha incorreta.'
                ]
            ], 401);
        }
        $processo = Processo::find($id);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        $processo->delete();
        return response()->json([
            'success' => [
                'mensagem' => 'Processo excluído com sucesso.'
            ]
        ], 200);
    }

    public function lerProcessosSubordinados(Request $request)
    {
        $usuario = $request->user();
        $subordinadosIds = $usuario->subordinados()->pluck('id')->toArray();
        $processos = Processo::whereIn('id_usuario', $subordinadosIds)->get();
        if ($processos->isEmpty()) {
            return response()->json([
                'errors' => [
                    'processos' => 'Nenhum processo encontrado para os subordinados.'
                ]
            ], 404);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Processos dos subordinados recuperados com sucesso.',
                'processos' => $processos
            ]
        ], 200);
    }

    public function atribuirProcessoSubordinado(Request $request, $id_processo, $id_subordinado)
    {
        $gerente = $request->user();
        $processo = Processo::find($id_processo);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'processo' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        if ($processo->id_usuario !== $gerente->id) {
            return response()->json([
                'errors' => [
                    'autorizacao' => 'Você não tem permissão para atribuir esse processo.'
                ]
            ], 403);
        }
        $subordinado = Usuario::find($id_subordinado);
        if (!$subordinado) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'usuario' => 'Usuário não encontrado.'
                ]
            ], 404);
        }
        if ($subordinado->id_superior !== $gerente->id) {
            return response()->json([
                'errors' => [
                    'relacao' => 'O usuário informado não é seu subordinado direto.'
                ]
            ], 400);
        }
        $processo->id_usuario = $subordinado->id;
        $processo->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Processos atribuido ao subordinado.',
            ]
        ]);
    }

    public function lerProcessosJuridico(Request $request)
    {
        $usuariosJuridicoIds = Usuario::where('nivel_acesso', 5)->pluck('id');
        $processos = Processo::whereIn('id_usuario', $usuariosJuridicoIds)->get();
        if ($processos->isEmpty()) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'processos' => 'Nenhum processo encontrado para usuários do setor jurídico.'
                ]
            ], 404);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Processos jurídicos recuperados com sucesso.',
                'processos' => $processos
            ]
        ], 200);
    }
}
