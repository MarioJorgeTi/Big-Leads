<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AtualizarUsuarioRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nome' => 'sometimes|required|string|max:255',
            'cpf_cnpj' => "sometimes|required|string|max:20|unique:usuario,cpf_cnpj",
            'email' => "sometimes|required|email|unique:usuario,email",
            'senha' => 'sometimes|string|min:6|confirmed',
            'nivel_acesso' => 'sometimes|integer|min:1|max:6',
            'id_superior' => 'sometimes|exists:usuario,id',
        ];
    }

    public function messages()
    {
        return [
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.string' => 'O campo nome deve ser um texto.',
            'nome.max' => 'O campo nome não pode ter mais que 255 caracteres.',

            'cpf_cnpj.required' => 'O campo CPF/CNPJ é obrigatório.',
            'cpf_cnpj.string' => 'O campo CPF/CNPJ deve ser um texto.',
            'cpf_cnpj.max' => 'O campo CPF/CNPJ não pode ter mais que 20 caracteres.',
            'cpf_cnpj.unique' => 'Este CPF/CNPJ já está em uso por outro usuário.',

            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'O campo e-mail deve ser um endereço de e-mail válido.',
            'email.unique' => 'Este e-mail já está em uso por outro usuário.',

            'senha.string' => 'A senha deve ser um texto.',
            'senha.min' => 'A senha deve ter no mínimo 6 caracteres.',
            'senha.confirmed' => 'A confirmação da senha não confere.',

            'nivel_acesso.integer' => 'O nível de acesso deve ser um número inteiro.',
            'nivel_acesso.min' => 'O nível de acesso mínimo é 1.',
            'nivel_acesso.max' => 'O nível de acesso máximo é 6.',

            'id_superior.exists' => 'O usuário superior informado não existe.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }
}
