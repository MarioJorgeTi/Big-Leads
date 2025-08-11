<?php

namespace Database\Factories;

use App\Models\Processo;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProcessoFactory extends Factory
{
    protected $model = Processo::class;

    public function definition(): array
    {
        $estados = [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO'
        ];

        $assuntosDireito = [
            'Direito Civil - Contratos',
            'Direito Penal - Crimes contra o Patrimônio',
            'Direito Trabalhista - Verbas Rescisórias',
            'Direito do Consumidor - Relações de Consumo',
            'Direito de Família - Pensão Alimentícia',
            'Direito Tributário - Imposto de Renda',
            'Direito Administrativo - Licitações',
            'Direito Ambiental - Danos Ambientais',
        ];

        $cidadeAleatoria = $this->faker->city();

        return [
            'id_usuario' => null,
            'numero_processo' => $this->faker->unique()->regexify('[0-9]{7}-[0-9]{2}\.2025\.8\.19\.[0-9]{4}'),
            'orgao_julgador' => $this->faker->numberBetween(1, 20) . 'ª Vara Cível da Comarca de ' . $cidadeAleatoria,
            'data_autuacao' => $this->faker->date(),
            'classe_judicial' => $this->faker->randomElement(['Busca e Apreensão', 'Execução de Título', 'Monitória', 'Despejo']),
            'ultima_distribuicao' => $this->faker->date(),
            'nota_lead' => $this->faker->numberBetween(0, 100),
            'resumo' => $this->faker->paragraph(),
            'valor_causa' => $this->faker->randomFloat(2, 1000, 100000),
            'jurisdicao' => 'Comarca de ' . $cidadeAleatoria,
            'assunto' => $this->faker->randomElement($assuntosDireito),
            'segredo_justica' => $this->faker->boolean(),
            'justica_gratuita' => $this->faker->boolean(),
            'tutela_liminar' => $this->faker->boolean(),
            'prioridade' => $this->faker->randomElement(['normal', 'alta', 'idoso']),
            'cargo_judicial' => 'Juiz de Direito',
            'competencia' => 'Cível',
            'status' => $this->faker->randomElement(['disponivel', 'alocado_dia1', 'alocado_dia2', 'alocado_dia3', 'alocado_dia4', 'alocado_dia5', 'assinado', 'recorrencia', 'conferir_documentos', 'subsidio', 'pendente', 'novo_processo', 'digitacao_execucao', 'digitacao_demais_acoes', 'busca_apreensao_revisional', 'aguardando_citacao', 'aguardando_protocolo', 'elaborar_distrato', 'execucao_inadimplente', 'revogados', 'iniciar_negociacao', 'busca_apreensao', 'consorcio', 'despejo', 'monitoria', 'execucao', 'revisional', 'veiculos_apreendidos', 'finalizado', 'devolvido_tramit', 'devolvido_juridico', 'devolvido_negociacao']),
            'estado' => $this->faker->randomElement($estados),
        ];
    }
}
