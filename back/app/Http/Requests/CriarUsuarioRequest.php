<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CriarUsuarioRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nome' => ['required', 'string', 'max:255'],
            'cpf_cnpj' => ['required', 'string', 'max:255', 'unique:usuario,cpf_cnpj', 'regex:/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:usuario,email'],
            'senha' => ['required', 'string', 'min:6', 'max:255'],
            'nivel_acesso' => ['required', 'integer', 'in:1,2,3,4,5,6'],
        ];
    }

    public function messages()
    {
        return [
            'nome.required' => 'O nome é obrigatório.',
            'nome.string' => 'O nome deve ser uma sequência de caracteres.',
            'nome.max' => 'O nome deve ter no máximo 255 caracteres.',

            'cpf_cnpj.required' => 'O CPF ou CNPJ é obrigatório.',
            'cpf_cnpj.string' => 'O CPF ou CNPJ deve ser uma sequência de caracteres.',
            'cpf_cnpj.max' => 'O CPF ou CNPJ deve ter no máximo 255 caracteres.',
            'cpf_cnpj.unique' => 'Este CPF ou CNPJ já está em uso.',
            'cpf_cnpj.regex' => 'O CPF ou CNPJ deve estar no formato válido.',

            'email.required' => 'O e-mail é obrigatório.',
            'email.string' => 'O e-mail deve ser uma sequência de caracteres.',
            'email.email' => 'O e-mail deve ser válido.',
            'email.max' => 'O e-mail deve ter no máximo 255 caracteres.',
            'email.unique' => 'Este e-mail já está em uso.',

            'senha.required' => 'A senha é obrigatória.',
            'senha.string' => 'A senha deve ser uma sequência de caracteres.',
            'senha.min' => 'A senha deve ter no mínimo 6 caracteres.',
            'senha.max' => 'A senha deve ter no máximo 255 caracteres.',

            'nivel_acesso.required' => 'O nível de acesso é obrigatório.',
            'nivel_acesso.integer' => 'O nível de acesso deve ser um número.',
            'nivel_acesso.in' => 'O nível de acesso deve ser de 1 a 6.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }
}
