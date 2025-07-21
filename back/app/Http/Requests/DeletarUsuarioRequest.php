<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeletarUsuarioRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'senha' => 'required|string|min:6|max:255',
        ];
    }

    public function messages()
    {
        return [
            'senha.required' => 'A senha é obrigatória.',
            'senha.string' => 'A senha deve ser uma string.',
            'senha.min' => 'A senha deve ter no mínimo 6 caracteres.',
            'senha.max' => 'A senha deve ter no máximo 255 caracteres.',
        ];
    }
}
