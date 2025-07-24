<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('processo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario')->nullable()->constrained('usuario');
            $table->string('numero_processo')->unique();
            $table->string('orgao_julgador');
            $table->date('data_autuacao');
            $table->string('classe_judicial');
            $table->date('ultima_distribuicao');
            $table->integer('nota_lead')->nullable();
            $table->text('resumo')->nullable();
            $table->decimal('valor_causa', 15, 2);
            $table->string('jurisdicao');
            $table->string('assunto');
            $table->boolean('segredo_justica');
            $table->boolean('justica_gratuita');
            $table->boolean('tutela_liminar');
            $table->string('prioridade');
            $table->string('cargo_judicial');
            $table->string('competencia');
            $table->enum('status', ['disponível', 'alocado', 'assinado', 'recorrido', 'tramitando', 'devolvido'])->default('disponível');
            $table->string('estado')->default('RJ');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('processo');
    }
};
