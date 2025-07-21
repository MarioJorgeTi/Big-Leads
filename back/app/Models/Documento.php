<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table = 'documento';

    protected $fillable = [
        'id_processo',
        'nome',
        'arquivo',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function processo()
    {
        return $this->belongsTo(Processo::class, 'id_processo');
    }
}
