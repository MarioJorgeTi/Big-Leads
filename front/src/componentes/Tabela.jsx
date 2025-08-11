import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import '../recursos/css/tabelaGeral.css';

const Tabela = ({ data, camposVisiveis = [], renderAcoes, carregando = false, formatadores = {} }) => {
  const [colunas, setColunas] = useState([]);

  const criadorDeColunas = (dbData) => {
    if (!Array.isArray(dbData) || dbData.length === 0) return;
    let campos = Object.keys(dbData[0]);
    if (camposVisiveis.length > 0) {
      campos = campos.filter((campo) => camposVisiveis.includes(campo));
    }
    const formatarLabel = (texto) => {
      return texto.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const colunasGeradas = campos.map((campo) => {
      const formatadorCampo = formatadores[campo];
      return {
        id: campo,
        field: campo,
        label: formatarLabel(campo),
        sortable: true,
        isAction: false,
        body: formatadorCampo ? (rowData) => formatadorCampo(rowData[campo], rowData) : undefined,
      };
    });

    colunasGeradas.push({
      id: 'acoes',
      field: '',
      label: 'Ações',
      sortable: false,
      isAction: true,
      body: (dadoCru) => renderAcoes(dadoCru),
    });

    setColunas(colunasGeradas);
  };

  useEffect(() => {
    criadorDeColunas(data);
  }, [data, camposVisiveis]);

  return (
    <div className="card">
      <DataTable
        loading={carregando}
        value={data}
        rows={10}
        paginator
        removableSort
        scrollable
        scrollHeight="900px"
        sortMode="multiple"
        className="border-none text-center"
      >
        {colunas.map((column) => (
          <Column
            key={column.id}
            field={column.field}
            header={column.label}
            body={column.body}
            sortable={column.sortable || !column.isAction}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default Tabela;
