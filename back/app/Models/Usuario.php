<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Laravel\Passport\Contracts\OAuthenticatable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Authenticatable implements OAuthenticatable
{
    use HasApiTokens, HasFactory;
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
        'id_superior',
    ];

    protected $hidden = [
        'senha',
        'token_email',
        'token_senha',
        'email_verificado',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'email_verificado' => 'boolean',
        'nivel_acesso' => 'integer',
    ];

    public function getAuthPassword()
    {
        return $this->senha;
    }

    public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = bcrypt($value);
    }

    public function contratos()
    {
        return $this->hasMany(Contrato::class, 'id_usuario');
    }

    public function processos()
    {
        return $this->hasMany(Processo::class, 'id_usuario');
    }

    public function superior()
    {
        return $this->belongsTo(Usuario::class, 'id_superior');
    }

    public function subordinados()
    {
        return $this->hasMany(Usuario::class, 'id_superior');
    }

    public function historicosAlterados()
    {
        return $this->hasMany(ProcessoHistorico::class, 'alterado_por');
    }
}
