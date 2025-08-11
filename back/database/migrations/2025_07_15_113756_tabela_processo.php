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
            $table->enum('status', ['disponivel', 'alocado_dia1', 'alocado_dia2', 'alocado_dia3', 'alocado_dia4', 'alocado_dia5', 'assinado', 'recorrencia', 'conferir_documentos', 'subsidio', 'pendente', 'novo_processo', 'digitacao_execucao', 'digitacao_demais_acoes', 'busca_apreensao_revisional', 'aguardando_citacao', 'aguardando_protocolo', 'elaborar_distrato', 'execucao_inadimplente', 'revogados', 'iniciar_negociacao', 'busca_apreensao', 'consorcio', 'despejo', 'monitoria', 'execucao', 'revisional', 'veiculos_apreendidos', 'finalizado', 'devolvido_tramit', 'devolvido_juridico', 'devolvido_negociacao'])->default('disponível');
            $table->string('estado')->default('RJ');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('processo');
    }
};
