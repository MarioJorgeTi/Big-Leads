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

    public function lerProcessoUsuario(Request $request, $id)
    {
        $usuario = $request->user();
        $processo = Processo::with(['polosAtivos', 'polosPassivos.telefones', 'polosPassivos.emails'])->find($id);
        if (!$processo) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Processo não encontrado.'
                ]
            ], 404);
        }
        if ($usuario->id != $processo->id_usuario && $processo->id_usuario != null) {
            return response()->json([
                'errors' => [
                    'processo' => 'Não é possível ler processo de outro usuário'
                ]
            ], 409);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Processo recuperado com sucesso.',
                'processo' => $processo
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
        $processo->status = 'alocado_dia1';
        $processo->save();
        return response()->json([
            'success' => [
                'mensagem' => 'Processo puxado com sucesso.',
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
        $processo->status = 'alocado_dia1';
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

    public function editarStatus(Request $request, $id_processo, $status)
    {
        $usuario = $request->user();

        $statusPorNivel = [
            1 => ['disponivel', 'alocado_dia1', 'alocado_dia2', 'alocado_dia3', 'alocado_dia4', 'alocado_dia5', 'assinado', 'recorrencia', 'conferir_documentos', 'subsidio', 'pendente', 'novo_processo', 'digitacao_execucao', 'digitacao_demais_acoes', 'busca_apreensao_revisional', 'aguardando_citacao', 'aguardando_protocolo', 'elaborar_distrato', 'execucao_inadimplente', 'revogados', 'iniciar_negociacao', 'busca_apreensao', 'consorcio', 'despejo', 'monitoria', 'execucao', 'revisional', 'veiculos_apreendidos', 'finalizado', 'devolvido_tramit', 'devolvido_juridico', 'devolvido_negociacao'],
            2 => ['disponivel', 'assinado', 'recorrencia', 'conferir_documentos'],
            3 => ['disponivel', 'assinado', 'recorrencia', 'conferir_documentos'],
            4 => ['subsidio', 'pendente', 'novo_processo', 'devolvido_tramit'],
            5 => ['digitacao_execucao', 'digitacao_demais_acoes', 'busca_apreensao_revisional', 'aguardando_citacao', 'aguardando_protocolo', 'elaborar_distrato', 'execucao_inadimplente', 'revogados', 'iniciar_negociacao', 'devolvido_juridico'],
            6 => ['busca_apreensao', 'consorcio', 'despejo', 'monitoria', 'execucao', 'revisional', 'veiculos_apreendidos', 'finalizado', 'devolvido_negociacao'],
        ];

        if (!isset($statusPorNivel[$usuario->nivel_acesso])) {
            return response()->json([
                'errors' => [
                    'processos' => 'Nível de acesso não reconhecido.'
                ]
            ], 403);
        }

        if (!in_array($status, $statusPorNivel[$usuario->nivel_acesso])) {
            return response()->json([
                'errors' => [
                    'processos' => 'Você não tem permissão para alterar o status desse processo.'
                ]
            ], 403);
        }

        $processo = Processo::find($id_processo);

        if (!$processo) {
            return response()->json([
                'errors' => [
                    'processos' => 'Processo não encontrado.'
                ]
            ], 404);
        }

        if ($usuario->nivel_acesso !== 1 && $processo->id_usuario !== $usuario->id) {
            return response()->json([
                'errors' => [
                    'processos' => 'Esse processo não pertence a você.'
                ]
            ], 403);
        }

        $processo->status = $status;
        $processo->save();

        return response()->json([
            'success' => [
                'mensagem' => 'Status do processo atualizado com sucesso.',
            ]
        ], 200);
    }

    public function lerProcessosNegociacao(Request $request)
    {
        $usuariosNegociacaoIds = Usuario::where('nivel_acesso', 6)->pluck('id');
        $processos = Processo::whereIn('id_usuario', $usuariosNegociacaoIds)->get();
        if ($processos->isEmpty()) {
            return response()->json([
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

    public function lerVendedores(Request $request)
    {
        $usuario = $request->user();
        $vendedores = Usuario::where('nivel_acesso', 3)->where('id', '!=', $usuario->nivel_acesso === 3 ? $usuario->id : 0)->get();
        if ($vendedores->isEmpty()) {
            return response()->json([
                'errors' => [
                    'vendedores' => 'Nenhum vendedor encontrado.'
                ]
            ], 404);
        }
        return response()->json([
            'success' => [
                'mensagem' => 'Vendedores recuperados com sucesso.',
                'vendedores' => $vendedores
            ]
        ], 200);
    }
}
