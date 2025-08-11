<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('processo_historico', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_processo')->constrained('processo')->onDelete('cascade');
            $table->enum('status_anterior', ['disponivel', 'alocado_dia1', 'alocado_dia2', 'alocado_dia3', 'alocado_dia4', 'alocado_dia5',  'assinado', 'recorrencia', 'conferir_documentos', 'subsidio', 'pendente', 'novo_processo',  'digitacao_execucao', 'digitacao_demais_acoes', 'busca_apreensao_revisional',  'aguardando_citacao', 'aguardando_protocolo', 'elaborar_distrato', 'execucao_inadimplente', 'revogados', 'iniciar_negociacao', 'busca_apreensao', 'consorcio', 'despejo', 'monitoria',  'execucao', 'revisional', 'veiculos_apreendidos', 'finalizado', 'devolvido_tramit', 'devolvido_juridico', 'devolvido_negociacao'])->nullable();
            $table->enum('status_novo', ['disponivel', 'alocado_dia1', 'alocado_dia2', 'alocado_dia3', 'alocado_dia4', 'alocado_dia5', 'assinado', 'recorrencia', 'conferir_documentos', 'subsidio', 'pendente', 'novo_processo', 'digitacao_execucao', 'digitacao_demais_acoes', 'busca_apreensao_revisional',  'aguardando_citacao', 'aguardando_protocolo', 'elaborar_distrato', 'execucao_inadimplente',  'revogados', 'iniciar_negociacao', 'busca_apreensao', 'consorcio', 'despejo', 'monitoria', 'execucao', 'revisional', 'veiculos_apreendidos', 'finalizado', 'devolvido_tramit',  'devolvido_juridico', 'devolvido_negociacao']);
            $table->date('data_mudanca');
            $table->foreignId('alterado_por')->nullable()->constrained('usuario');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('processo_historico');
    }
};
