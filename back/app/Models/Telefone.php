<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Telefone extends Model
{
    use HasFactory;
    
    protected $table = 'telefone';

    protected $fillable = [
        'id_polo_passivo',
        'tipo',
        'numero',
    ];

    protected $hidden = [
        'id',
        'id_polo_passivo',
        'created_at',
        'updated_at',
    ];

    public function poloPassivo()
    {
        return $this->belongsTo(PoloPassivo::class, 'id_polo_passivo');
    }
}
