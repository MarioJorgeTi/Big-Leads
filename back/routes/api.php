<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContratoController;
use App\Http\Controllers\AssertivaController;

Route::post('/login', [UsuarioController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    Route::get('/usuario', [UsuarioController::class, 'lerUsuario']);
    Route::get('/usuario/processos', [UsuarioController::class, 'lerProcessosUsuario']);

    Route::get('/processos', [ProcessoController::class, 'lerProcessos']);
    Route::get('/processo/{id}', [ProcessoController::class, 'lerProcesso']);
    Route::post('/processo/{id}/atribuir', [UsuarioController::class, 'atribuirProcessoUsuario']);

    Route::get('/documentos/processo/{id}', [DocumentoController::class, 'lerDocumentosProcesso']);

    Route::post('/contrato/honorario', [ContratoController::class, 'gerarContratoHonorario']);

    Route::post('/logout', [UsuarioController::class, 'logout']);
});
