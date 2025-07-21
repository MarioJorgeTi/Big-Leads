<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CriarUsuarioRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nome' => 'required|string|max:255',
            'cpf_cnpj' => 'required|string|max:255|unique:usuario,cpf_cnpj|regex:/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/',
            'email' => 'required|email|max:255|unique:usuario,email',
            'senha' => 'required|string|min:6|max:255',
            'nivel_acesso' => 'required|integer|in:1,2,3',
        ];
    }

    public function messages()
    {
        return [
            'nome.required' => 'O nome é obrigatório.',
            'nome.max' => 'O nome deve ter no máximo 255 caracteres.',
            'cpf_cnpj.required' => 'O CPF ou CNPJ é obrigatório.',
            'cpf_cnpj.unique' => 'Este CPF ou CNPJ já está em uso.',
            'cpf_cnpj.regex' => 'O CPF ou CNPJ deve estar em no formato válido.',
            'cpf_cnpj.max' => 'O CPF ou CNPJ deve ter no máximo 255 caracteres.',
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'O e-mail deve ser válido.',
            'email.unique' => 'Este e-mail já está em uso.',
            'email.max' => 'O e-mail deve ter no máximo 255 caracteres.',
            'senha.required' => 'A senha é obrigatória.',
            'senha.min' => 'A senha deve ter no mínimo 6 caracteres.',
            'senha.max' => 'A senha deve ter no máximo 255 caracteres.',
            'nivel_acesso.required' => 'O nível de acesso é obrigatório.',
            'nivel_acesso.integer' => 'O nível de acesso deve ser um número.',
            'nivel_acesso.in' => 'O nível de acesso deve ser 1, 2 ou 3.',
        ];
    }
}
