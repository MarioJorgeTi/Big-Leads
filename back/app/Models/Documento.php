<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Documento extends Model
{
    use HasFactory;

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

    protected $appends = [
        'arquivo_base64',
    ];

    public function processo()
    {
        return $this->belongsTo(Processo::class, 'id_processo');
    }

    protected function arquivoBase64(): Attribute
    {
        return Attribute::get(function () {
            if (!$this->arquivo) {
                return null;
            }
            $filePath = storage_path('app/' . $this->arquivo);
            if (!file_exists($filePath)) {
                return null;
            }
            $bytes = file_get_contents($filePath);
            return base64_encode($bytes);
        });
    }
}
