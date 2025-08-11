<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditarProcessoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'numero_processo' => 'sometimes|string|regex:/^\d{7}-\d{2}\.2025\.8\.19\.\d{4}$/|unique:processo,numero_processo',
            'orgao_julgador' => 'sometimes|string|max:255',
            'data_autuacao' => 'sometimes|date',
            'classe_judicial' => 'sometimes|string|max:255',
            'ultima_distribuicao' => 'sometimes|date',
            'nota_lead' => 'sometimes|integer|min:0|max:100',
            'resumo' => 'sometimes|string',
            'valor_causa' => 'sometimes|numeric|min:0',
            'jurisdicao' => 'sometimes|string|max:255',
            'assunto' => 'sometimes|string|max:255',
            'segredo_justica' => 'sometimes|boolean',
            'justica_gratuita' => 'sometimes|boolean',
            'tutela_liminar' => 'sometimes|boolean',
            'prioridade' => 'sometimes|string|in:normal,alta,idoso',
            'cargo_judicial' => 'sometimes|string|max:255',
            'competencia' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:disponivel,alocado_dia1,alocado_dia2,alocado_dia3,alocado_dia4,alocado_dia5,assinado,recorrencia,conferir_documentos,subsidio,pendente,novo_processo,digitacao_execucao,digitacao_demais_acoes,busca_apreensao_revisional,aguardando_citacao,aguardando_protocolo,elaborar_distrato,execucao_inadimplente,revogados,iniciar_negociacao,busca_apreensao,consorcio,despejo,monitoria,execucao,revisional,veiculos_apreendidos,finalizado,devolvido_tramit,devolvido_juridico,devolvido_negociacao',
            'estado' => 'sometimes|string|size:2',
        ];
    }

    public function messages(): array
    {
        return [
            'numero_processo.string' => 'O número do processo deve ser uma string.',
            'numero_processo.regex' => 'O número do processo deve seguir o padrão 0000000-00.2025.8.19.0000.',
            'numero_processo.unique' => 'Este número de processo já está em uso.',

            'orgao_julgador.string' => 'O órgão julgador deve ser uma string.',
            'orgao_julgador.max' => 'O órgão julgador não pode ter mais que 255 caracteres.',

            'data_autuacao.date' => 'A data de autuação deve ser uma data válida.',

            'classe_judicial.string' => 'A classe judicial deve ser uma string.',
            'classe_judicial.max' => 'A classe judicial não pode ter mais que 255 caracteres.',

            'ultima_distribuicao.date' => 'A última distribuição deve ser uma data válida.',

            'nota_lead.integer' => 'A nota lead deve ser um número inteiro.',
            'nota_lead.min' => 'A nota lead não pode ser menor que 0.',
            'nota_lead.max' => 'A nota lead não pode ser maior que 100.',

            'resumo.string' => 'O resumo deve ser um texto.',

            'valor_causa.numeric' => 'O valor da causa deve ser um número.',
            'valor_causa.min' => 'O valor da causa não pode ser negativo.',

            'jurisdicao.string' => 'A jurisdição deve ser uma string.',
            'jurisdicao.max' => 'A jurisdição não pode ter mais que 255 caracteres.',

            'assunto.string' => 'O assunto deve ser uma string.',
            'assunto.max' => 'O assunto não pode ter mais que 255 caracteres.',

            'segredo_justica.boolean' => 'O campo "segredo de justiça" deve ser verdadeiro ou falso.',
            'justica_gratuita.boolean' => 'O campo "justiça gratuita" deve ser verdadeiro ou falso.',
            'tutela_liminar.boolean' => 'O campo "tutela liminar" deve ser verdadeiro ou falso.',

            'prioridade.string' => 'A prioridade deve ser uma string.',
            'prioridade.in' => 'A prioridade deve ser uma das seguintes: normal, alta ou idoso.',

            'cargo_judicial.string' => 'O cargo judicial deve ser uma string.',
            'cargo_judicial.max' => 'O cargo judicial não pode ter mais que 255 caracteres.',

            'competencia.string' => 'A competência deve ser uma string.',
            'competencia.max' => 'A competência não pode ter mais que 255 caracteres.',

            'status.in' => 'O status deve ser um dos seguintes: disponível, alocado, assinado, recorrido, tramitando ou devolvido.',

            'estado.string' => 'O estado deve ser uma string.',
            'estado.size' => 'O estado deve conter exatamente 2 letras (sigla).',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }
}
