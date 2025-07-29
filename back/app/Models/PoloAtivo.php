<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PoloAtivo extends Model
{
    use HasFactory;

    protected $table = 'polo_ativo';

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
