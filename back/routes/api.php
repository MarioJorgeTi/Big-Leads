<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContratoController;

Route::get('/teste', function () {
    return response()->json(['teste' => 'ok!']);
});

Route::get('/processos', [ProcessoController::class, 'lerProcessos']);
Route::get('/processo/{id}', [ProcessoController::class, 'lerProcesso']);
Route::get('/documentos/processo/{id}', [DocumentoController::class, 'lerDocumentosProcesso']);

Route::post('/login', [UsuarioController::class, 'login']);

Route::get('/usuario/processos', [UsuarioController::class, 'lerProcessosUsuario']);

Route::post('/processo/{id}/atribuir', [UsuarioController::class, 'atribuirProcessoUsuario']);

Route::post('/contrato/honorario', [ContratoController::class, 'gerarContratoHonorario']);

Route::middleware('auth:api')->group(function () {
    Route::post('/usuario', [UsuarioController::class, 'lerUsuario']);
});
