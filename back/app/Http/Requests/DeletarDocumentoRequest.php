<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeletarDocumentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_documento' => 'required|exists:documento,id',
            'senha' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id_documento.required' => 'O ID do documento é obrigatório.',
            'id_documento.exists' => 'O documento informado não existe.',
            'senha.required' => 'A senha é obrigatória para remover o documento.',
            'senha.string' => 'A senha deve ser uma string.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }
}
