<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProcessoHistorico extends Model
{
    use HasFactory;

    protected $table = 'processo_historico';

    protected $fillable = [
        'id_processo',
        'status_anterior',
        'status_novo',
        'data_mudanca',
        'alterado_por',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'data_mudanca' => 'date:d/m/Y',
    ];

    public function processo()
    {
        return $this->belongsTo(Processo::class, 'id_processo');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'alterado_por');
    }
}
