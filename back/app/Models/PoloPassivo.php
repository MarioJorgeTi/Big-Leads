<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoloPassivo extends Model
{
    protected $table = 'polo_passivo';

    protected $fillable = [
        'id_processo',
        'nome',
        'cpf_cnpj',
    ];

    protected $hidden = [
        'id',
        'id_processo',
        'created_at',
        'updated_at',
    ];

    public function processo()
    {
        return $this->belongsTo(Processo::class, 'id_processo');
    }
}
