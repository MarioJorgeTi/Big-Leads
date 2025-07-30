<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CriarDocumentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_processo' => 'required|exists:processo,id',
            'nome' => 'required|string|max:255',
            'arquivo' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'id_processo.required' => 'O ID do processo é obrigatório.',
            'id_processo.exists' => 'O processo informado não existe.',
            'nome.required' => 'O nome do documento é obrigatório.',
            'nome.string' => 'O nome do documento deve ser uma string.',
            'nome.max' => 'O nome do documento deve ter no máximo 255 caracteres.',
            'arquivo.required' => 'O arquivo do documento é obrigatório.',
            'arquivo.file' => 'O campo de arquivo deve ser um arquivo válido.',
            'arquivo.mimes' => 'O arquivo deve ser do tipo: pdf, doc, docx, jpg, jpeg ou png.',
            'arquivo.max' => 'O tamanho máximo permitido para o arquivo é 10MB.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }
}
