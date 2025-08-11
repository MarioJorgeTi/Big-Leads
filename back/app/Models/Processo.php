<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ProcessoHistorico;

class Processo extends Model
{
    use HasFactory;

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
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'segredo_justica' => 'boolean',
        'justica_gratuita' => 'boolean',
        'tutela_liminar' => 'boolean',
        'data_autuacao' => 'date:d/m/Y',
        'ultima_distribuicao' => 'date:d/m/Y',
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

    public function historico()
    {
        return $this->hasMany(ProcessoHistorico::class, 'id_processo');
    }

    protected static function booted()
    {
        static::updating(function ($processo) {
            if ($processo->isDirty('status')) {
                ProcessoHistorico::create([
                    'id_processo' => $processo->id,
                    'status_anterior' => $processo->getOriginal('status'),
                    'status_novo' => $processo->status,
                    'alterado_por' => auth('api')->id(),
                    'data_mudanca' => now()->toDateString(),
                ]);
            }
        });
    }
}
