<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Processo extends Model
{
    protected $table = 'processo';

    protected $fillable = [
        'id_usuario',
        'numero_processo',
        'orgao_julgador',
        'data_autuacao',
        'classe_judicial',
        'ultima_distribuicao',
        'nota_lead',
        'resumo',
        'valor_causa',
        'jurisdicao',
        'assunto',
        'segredo_justica',
        'justica_gratuita',
        'tutela_liminar',
        'prioridade',
        'cargo_judicial',
        'competencia',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'segredo_justica' => 'boolean',
        'justica_gratuita' => 'boolean',
        'tutela_liminar' => 'boolean',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function documentos()
    {
        return $this->hasMany(Documento::class, 'id_processo');
    }

    public function polosAtivos()
    {
        return $this->hasMany(PoloAtivo::class, 'id_processo');
    }

    public function polosPassivos()
    {
        return $this->hasMany(PoloPassivo::class, 'id_processo');
    }
}
