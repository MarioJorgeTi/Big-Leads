<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ContratoHonorarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'numero_processo' => ['required', 'string', 'max:50'],

            'anexo1.nome_completo' => ['required', 'string', 'max:255'],
            'anexo1.nacionalidade' => ['required', 'string', 'max:100'],
            'anexo1.estado_civil' => ['required', 'string'],
            'anexo1.profissao' => ['required', 'string', 'max:100'],
            'anexo1.email' => ['required', 'email'],
            'anexo1.rg' => ['required', 'string', 'max:20'],
            'anexo1.cpf' => ['required', 'string', 'max:20'],
            'anexo1.cep' => ['required', 'string', 'max:10'],
            'anexo1.endereco' => ['required', 'string', 'max:255'],
            'anexo1.numero' => ['sometimes', 'nullable', 'string', 'max:10'],
            'anexo1.complemento' => ['sometimes', 'nullable', 'string', 'max:100'],
            'anexo1.bairro' => ['required', 'string', 'max:100'],
            'anexo1.cidade' => ['required', 'string', 'max:100'],
            'anexo1.estado' => ['required', 'string', 'size:2'],

            'anexo2.servicos' => ['required', 'array', 'min:1'],
            'anexo2.servicos.*' => ['required', 'string'],

            'anexo3.entrada' => ['required', 'numeric', 'min:0'],
            'anexo3.parcelas' => ['required', 'integer', 'min:1'],
            'anexo3.honorario_exito' => ['required', 'numeric', 'min:0'],
            'anexo3.observacao' => ['nullable', 'string'],

            'anexo4.valor_mensal' => ['required', 'numeric', 'min:0'],
            'anexo4.inicio_cobranca' => ['required', 'date'],
            'anexo4.vencimento' => ['required', 'date'],
            'anexo4.termino_obrigacao' => ['required', 'date'],

            'anexo5.local' => ['required', 'string', 'max:100'],
            'anexo5.contrato_data' => ['required', 'date'],
            'anexo5.contratante' => ['required', 'string', 'max:255'],
            'anexo5.contratado' => ['required', 'string', 'max:255'],
            'anexo5.oab_contratado' => ['required', 'string', 'max:50'],

            'anexo6.testemunha1_nome' => ['required', 'string', 'max:255'],
            'anexo6.testemunha1_cpf' => ['required', 'string', 'max:20'],
            'anexo6.testemunha2_nome' => ['required', 'string', 'max:255'],
            'anexo6.testemunha2_cpf' => ['required', 'string', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'email' => 'O campo :attribute deve conter um e-mail válido.',
            'date' => 'O campo :attribute deve ser uma data válida.',
            'numeric' => 'O campo :attribute deve ser numérico.',
            'integer' => 'O campo :attribute deve ser um número inteiro.',
            'min' => 'O campo :attribute deve ser no mínimo :min.',
            'max' => 'O campo :attribute deve ter no máximo :max caracteres.',
        ];
    }

    public function attributes(): array
    {
        return [
            'numero_processo' => 'número do processo',
            'anexo1.nome_completo' => 'nome completo',
            'anexo1.nacionalidade' => 'nacionalidade',
            'anexo1.estado_civil' => 'estado civil',
            'anexo1.profissao' => 'profissão',
            'anexo1.email' => 'e-mail',
            'anexo1.rg' => 'RG',
            'anexo1.cpf' => 'CPF',
            'anexo1.cep' => 'CEP',
            'anexo1.endereco' => 'endereço',
            'anexo1.numero' => 'número',
            'anexo1.complemento' => 'complemento',
            'anexo1.bairro' => 'bairro',
            'anexo1.cidade' => 'cidade',
            'anexo1.estado' => 'estado',
            'anexo2.servicos' => 'serviços',
            'anexo3.entrada' => 'valor de entrada',
            'anexo3.parcelas' => 'número de parcelas',
            'anexo3.honorario_exito' => 'honorário de êxito',
            'anexo3.observacao' => 'observação',
            'anexo4.valor_mensal' => 'valor mensal',
            'anexo4.inicio_cobranca' => 'início da cobrança',
            'anexo4.vencimento' => 'vencimento',
            'anexo4.termino_obrigacao' => 'término da obrigação',
            'anexo5.local' => 'local',
            'anexo5.contrato_data' => 'data do contrato',
            'anexo5.contratante' => 'contratante',
            'anexo5.contratado' => 'contratado',
            'anexo5.oab_contratado' => 'OAB do contratado',
            'anexo6.testemunha1_nome' => 'nome da testemunha 1',
            'anexo6.testemunha1_cpf' => 'CPF da testemunha 1',
            'anexo6.testemunha2_nome' => 'nome da testemunha 2',
            'anexo6.testemunha2_cpf' => 'CPF da testemunha 2',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }
}
