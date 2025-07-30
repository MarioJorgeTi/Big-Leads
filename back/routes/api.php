<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ContratoController;

Route::post('/login', [UsuarioController::class, 'login']);

Route::get('/usuarios', [UsuarioController::class, 'lerUsuarios']);
Route::get('/usuario/{id}', [UsuarioController::class, 'lerUsuario']);

Route::middleware('auth:api')->group(function () {

    Route::get('/processos/funil-geral', [ProcessoController::class, 'processosFunilGeral']);
    Route::post('/processo/puxar/{id}', [ProcessoController::class, 'puxarProcesso']);

    Route::post('/contrato/honorario', [ContratoController::class, 'gerarContratoHonorario']);

    Route::post('/logout', [UsuarioController::class, 'logout']);
});

Route::middleware(['auth:api', 'nivel:1'])->prefix('diretor')->group(function () {

    Route::get('/usuario/subordinados', [UsuarioController::class, 'lerSubordinados']);
    Route::post('/usuario/subordinar/{id}', [UsuarioController::class, 'atribuirSubordinado']);

    Route::get('/processos', [ProcessoController::class, 'lerProcessos']);
    Route::get('/processos/usuario', [ProcessoController::class, 'lerProcessosUsuario']);
    Route::get('/processos/subordinados', [ProcessoController::class, 'lerProcessosSubordinados']);
    Route::get('/processo/{id}', [ProcessoController::class, 'lerProcesso']);
    Route::patch('/processo/{id}', [ProcessoController::class, 'editarProcesso']);
    Route::delete('/processo/{id}', [ProcessoController::class, 'deletarProcesso']);
    Route::post('/processo/atribuir/{id_processo}/{id_usuario}', [ProcessoController::class, 'atribuirProcesso']);

    Route::post('/documento', [DocumentoController::class, 'criarDocumento']);
    Route::delete('/documento', [DocumentoController::class, 'deletarDocumento']);
});

Route::middleware(['auth:api', 'nivel:2'])->prefix('gerente')->group(function () {

    Route::post('/usuario/subordinar/{id}', [UsuarioController::class, 'atribuirSubordinado']);

    Route::get('/processos/usuario', [ProcessoController::class, 'lerProcessosUsuario']);
    Route::get('/processos/subordinados', [ProcessoController::class, 'lerProcessosSubordinados']);
    Route::patch('/processo/{id}', [ProcessoController::class, 'editarProcessoUsuario']);
    Route::post('/processo/atribuir/{id_processo}/{id_subordinado}', [ProcessoController::class, 'atribuirProcessoSubordinado']);

    Route::post('/documento', [DocumentoController::class, 'criarDocumentoProcesso']);
    Route::delete('/documento', [DocumentoController::class, 'deletarDocumentoProcesso']);
});

Route::middleware(['auth:api', 'nivel:3'])->prefix('vendedor')->group(function () {

    Route::get('/processos/usuario', [ProcessoController::class, 'lerProcessosUsuario']);
    Route::patch('/processo/{id}', [ProcessoController::class, 'editarProcessoUsuario']);
    Route::post('/processo/atribuir/{id_processo}/{id_usuario}', [ProcessoController::class, 'atribuirProcesso']);

    Route::post('/documento', [DocumentoController::class, 'criarDocumentoProcesso']);
    Route::delete('/documento', [DocumentoController::class, 'deletarDocumentoProcesso']);
});

Route::middleware(['auth:api', 'nivel:4'])->prefix('tramite')->group(function () {

    Route::get('/processos', [ProcessoController::class, 'lerProcessos']);
    Route::get('/processos/usuario', [ProcessoController::class, 'lerProcessosUsuario']);
    Route::patch('/processo/{id}', [ProcessoController::class, 'editarProcesso']);

    Route::post('/documento', [DocumentoController::class, 'criarDocumentoProcesso']);
    Route::delete('/documento', [DocumentoController::class, 'deletarDocumentoProcesso']);
});

Route::middleware(['auth:api', 'nivel:5'])->prefix('juridico')->group(function () {

    Route::get('/processos/usuario', [ProcessoController::class, 'lerProcessosUsuario']);
    Route::get('/processos/juridico', [ProcessoController::class, 'lerProcessosJuridico']);
    Route::patch('/processo/{id}', [ProcessoController::class, 'editarProcessoUsuario']);

    Route::post('/documento', [DocumentoController::class, 'criarDocumentoProcesso']);
    Route::delete('/documento', [DocumentoController::class, 'deletarDocumentoProcesso']);
});
