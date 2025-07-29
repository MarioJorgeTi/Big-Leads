<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContratoController;

Route::post('/login', [UsuarioController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    Route::get('/usuario', [UsuarioController::class, 'lerUsuario']);
    Route::get('/usuarios', [UsuarioController::class, 'lerUsuarios']);

    Route::get('/processo/{id}', [ProcessoController::class, 'lerProcesso']);
    Route::get('/processos', [ProcessoController::class, 'lerProcessos']);
    Route::get('/processos/funil-geral', [ProcessoController::class, 'processosFunilGeral']);
    Route::get('/processos/usuario', [ProcessoController::class, 'lerProcessosUsuario']);
    Route::post('/processo/puxar/{id}', [ProcessoController::class, 'puxarProcessoUsuario']);
    Route::post('/processo/atribuir/{id_processo}/{id_usuario}', [ProcessoController::class, 'atribuirProcessoUsuario']);

    Route::get('/documentos/processo/{id}', [DocumentoController::class, 'lerDocumentosProcesso']);

    Route::post('/contrato/honorario', [ContratoController::class, 'gerarContratoHonorario']);

    Route::post('/logout', [UsuarioController::class, 'logout']);
});

/*
Route::middleware(['auth:api', 'nivel:1'])->get('/teste1', function () {
    return response()->json([
        'mensagem' => 'Você está no nível 1',
    ]);
});

Route::middleware(['auth:api', 'nivel:2'])->get('/teste2', function () {
    return response()->json([
        'mensagem' => 'Você está no nível 2',
    ]);
});

Route::middleware(['auth:api', 'nivel:3'])->get('/teste3', function () {
    return response()->json([
        'mensagem' => 'Você está no nível 3',
    ]);
});

Route::middleware(['auth:api', 'nivel:4'])->get('/teste4', function () {
    return response()->json([
        'mensagem' => 'Você está no nível 4',
    ]);
});

Route::middleware(['auth:api', 'nivel:5'])->get('/teste5', function () {
    return response()->json([
        'mensagem' => 'Você está no nível 5',
    ]);
});

Route::middleware(['auth:api', 'nivel:2,4'])->get('/teste24', function () {
    return response()->json([
        'mensagem' => 'Você está no nível 2 ou 4',
    ]);
});
*/