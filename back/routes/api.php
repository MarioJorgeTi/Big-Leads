<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\DocumentoController;

Route::get('/ping', function () {
    return response()->json(['pingou ok' => true]);
});

Route::get('/processos', [ProcessoController::class, 'pegarProcessos']);
Route::get('/processo/{id}', [ProcessoController::class, 'pegarProcesso']);
Route::get('/documentos/processo/{id}', [DocumentoController::class, 'pegarDocumentosProcesso']);
