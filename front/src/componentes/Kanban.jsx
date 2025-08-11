import { ScrollPanel } from 'primereact/scrollpanel';
import { Header, Template } from '../componentes/ProcessoTemplate';
import Cartao from '../componentes/Cartao';

const colunasPorFunil = {
  comercial: [
    {
      id: 1,
      column: 'Dia 1',
      columnColor: 'var(--blue-200)',
      status: 'alocado_dia1'
    },
    {
      id: 2,
      column: 'Dia 2',
      columnColor: 'var(--yellow-400)',
      status: 'alocado_dia2'
    },
    {
      id: 3,
      column: 'Dia 3',
      columnColor: 'var(--orange-300)',
      status: 'alocado_dia3'
    },
    {
      id: 4,
      column: 'Dia 4',
      columnColor: 'var(--orange-400)',
      status: 'alocado_dia4'
    },
    {
      id: 5,
      column: 'Dia 5',
      columnColor: 'var(--red-500)',
      status: 'alocado_dia5'
    },
    {
      id: 7,
      column: 'Assinados',
      columnColor: 'var(--blue-500)',
      status: 'assinado'
    },
    {
      id: 8,
      column: 'Gerar Recorrência',
      columnColor: 'var(--yellow-500)',
      status: 'recorrencia'
    },
    {
      id: 9,
      column: 'Devolvido Pelo Tramit',
      columnColor: 'var(--red-500)',
      status: 'devolvido_tramit'
    }
  ],
  tramit: [
    {
      id: 1,
      column: 'Conferência de Documentos',
      columnColor: 'var(--blue-500)',
      status: 'conferir_documentos'
    },
    {
      id: 2,
      column: 'Subsídio',
      columnColor: 'var(--blue-800)',
      status: 'subsidio'
    },
    {
      id: 4,
      column: 'Devolvido Pelo Jurídico',
      columnColor: 'var(--red-500)',
      status: 'devolvido_juridico'
    },
  ],
  juridico: [
    {
      id: 1,
      column: 'Novo Processo',
      columnColor: 'var(--blue-200)',
      status: 'novo_processo'
    },
    {
      id: 2,
      column: 'Digitação (Execução)',
      columnColor: 'var(--blue-500)',
      status: 'digitacao_execucao'
    },
    {
      id: 3,
      column: 'Digitação (Demais Ações)',
      columnColor: 'var(--blue-500)',
      status: 'digitacao_demais_acoes'
    },
    {
      id: 4,
      column: 'Digitação (BA/REV.)',
      columnColor: 'var(--blue-500)',
      status: 'busca_apreensao_revisional'
    },
    {
      id: 5,
      column: 'Aguardando Citação',
      columnColor: 'var(--blue-500)',
      status: 'aguardando_citacao'
    },
    {
      id: 6,
      column: 'Aguardando Protocolo',
      columnColor: 'var(--blue-500)',
      status: 'aguardando_protocolo'
    },
    {
      id: 7,
      column: 'Elaborar Distrato',
      columnColor: 'var(--purple-300)',
      status: 'elaborar_distrato'
    },
    {
      id: 8,
      column: 'Execução De Inadimplente',
      columnColor: 'var(--yellow-500)',
      status: 'execucao_inadimplente'
    },
    {
      id: 9,
      column: 'Revogados',
      columnColor: 'var(--red-500)',
      status: 'revogados'
    },
    {
      id: 9,
      column: 'Devolvido Pela Negociação',
      columnColor: 'var(--red-500)',
      status: 'devolvido_negociacao'
    },
  ],
  negociacao: [
    {
      id: 1,
      column: 'Iniciar Negociação',
      columnColor: 'var(--blue-300)',
      status: 'iniciar_negociacao'
    },
    {
      id: 2,
      column: 'Busca e Apreensão',
      columnColor: 'var(--yellow-400)',
      status: 'busca_apreensao'
    },
    {
      id: 3,
      column: 'Consórcio',
      columnColor: 'var(--yellow-400)',
      status: 'consorcio'
    },
    {
      id: 4,
      column: 'Despejo',
      columnColor: 'var(--yellow-400)',
      status: 'despejo'
    },
    {
      id: 5,
      column: 'Monitória',
      columnColor: 'var(--yellow-400)',
      status: 'monitoria'
    },
    {
      id: 6,
      column: 'Execução',
      columnColor: 'var(--yellow-400)',
      status: 'execucao'
    },
    {
      id: 7,
      column: 'Revisional',
      columnColor: 'var(--yellow-400)',
      status: 'revisional'
    },
    {
      id: 9,
      column: 'Veículo Apreendidos',
      columnColor: 'var(--yellow-400)',
      status: 'veiculos_apreendidos'
    }
  ],
};

const Kanban = ({ dados, funilAtual }) => {
  const colunas = colunasPorFunil[funilAtual] || [];

  return (
    <section className="overflow-auto">
      <ScrollPanel style={{ width: `${colunas.length * 365}px` }}>
        <div className="flex gap-3">
          {colunas.map((coluna) => {
            const dadosFiltrados = dados.filter((item) => item.status === coluna.status);
            return (
              <div key={coluna.id} style={{ minWidth: '350px' }}>
                <div className="text-white border-round-3xl" style={{ background: coluna.columnColor }}>
                  <h3 className="p-3">{coluna.column}</h3>
                </div>
                <ScrollPanel style={{ height: '60vh', minHeight: '60vh' }}>
                  <div className="flex flex-column row-gap-3 p-0 border-round-xl h-full" style={{ background: 'var(--gray-200)' }}>
                    {dadosFiltrados.map((item, index) => {
                      const isLast = index === dadosFiltrados.length - 1;
                      return (
                        <div key={item.id}>
                          <Cartao
                            data={item}
                            title={() => <Header data={item} />}
                            template={() => <Template data={item} />}
                          />
                          {isLast && (
                            <div className="py-6 mt-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollPanel>
              </div>
            )
          })}
        </div>
      </ScrollPanel>
    </section>
  );
};

export default Kanban;
