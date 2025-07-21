<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuario';

    protected $fillable = [
        'nome',
        'cpf_cnpj',
        'email',
        'senha',
        'email_verificado',
        'token_email',
        'token_senha',
        'nivel_acesso',
    ];

    protected $hidden = [
        'senha',
        'token_email',
        'token_senha',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'email_verificado' => 'boolean',
        'nivel_acesso' => 'integer',
    ];
}
