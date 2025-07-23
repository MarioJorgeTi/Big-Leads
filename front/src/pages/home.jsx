import { useContext, useState } from 'react';
import GeneralTable from '../components/generalTable';
import { ProcessesContext } from '../contexts/processes/processesContext';
import { Button } from 'primereact/button';
import '../assets/css/home.css'
import { FaEye } from 'react-icons/fa';
import GeneralSidebar from '../components/generalSidebar';
import FunnelSelect from '../components/funnelSelect';

const Home = () => {
  const { processes } = useContext(ProcessesContext);
  const [expandDetailsDialog, setExpandDetailsDialog] = useState(false);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => {
      const match = part.match(/(\w+)\[(\d+)\]/);
      if (match) {
        const [, prop, index] = match;
        return acc?.[prop]?.[index];
      }
      return acc?.[part];
    }, obj);
  };

  const columns = [
    {
      id: 2,
      field: 'numero_processo',
      header: 'Processo',
      sortableDisabled: false,
      frozen: false,
      body: (rowData) => (
        <div className="overflow-hidden space-nowrap max-w-12rem text-overflow-ellipsis">
          {getNestedValue(rowData, 'numero_processo')}
        </div>
      )
    },
    {
      id: 3,
      field: 'valor_causa',
      header: 'Valor da Causa (R$)',
      sortableDisabled: false,
      frozen: false,
      body: (rowData) => {
        const value = rowData.valor_causa;

        return typeof value === 'number'
          ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          : '-';
      }
    },
    {
      id: 4,
      field: 'classe_judicial',
      header: 'Classe Judicial',
      sortableDisabled: false,
      frozen: false,
      body: (rowData) => (
        <div className="overflow-hidden space-nowrap max-w-15rem text-overflow-ellipsis">
          {getNestedValue(rowData, 'classe_judicial')}
        </div>
      )
    },
    {
      id: 5,
      field: 'data_autuacao',
      header: 'Data de Autuação',
      sortableDisabled: false,
      frozen: false,
      body: (rowData) => {
        const rawValue = rowData.data_autuacao;
        const date = rawValue ? new Date(rawValue) : null;
        return date instanceof Date && !isNaN(date)
          ? date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
          : '-';
      }
    },
    {
      id: 6,
      field: 'ultima_distribuicao',
      header: 'Última Distribuição',
      sortableDisabled: false,
      frozen: false,
      body: (rowData) => {
        const rawValue = rowData.ultima_distribuicao;
        const date = rawValue ? new Date(rawValue) : null;
        return date instanceof Date && !isNaN(date)
          ? date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
          : '-';
      }
    },
    {
      id: 7,
      field: 'estado',
      header: 'Estado',
      sortableDisabled: true,
      isAction: true,
      frozen: false,
    },
    {
      id: 8,
      field: 'status',
      header: 'Status',
      sortableDisabled: true,
      isAction: true,
      frozen: false,
    },
    {
      id: 9,
      field: '',
      header: 'Detalhes',
      sortableDisabled: true,
      isAction: true,
      frozen: true,
      body: () => <Button
        onClick={() => setExpandDetailsDialog(!expandDetailsDialog)}
        className="p-2"
        rounded
        text
      >
        <FaEye size={25} style={{ color: 'var(--primary-color)' }} />
      </Button>
    }
  ];

  const sidebarTemplate = (item) => {
    return (
      <div>

      </div>
    )
  }

  return (
    <main className='flex justify-content-center align-items-center h-screen w-full'>
      <div>
        <FunnelSelect />
        <GeneralTable
          data={processes}
          columns={columns}
          showDetails={expandDetailsDialog}
          closeDetails={() => setExpandDetailsDialog(!expandDetailsDialog)}
        />
        <GeneralSidebar
          showDetails={expandDetailsDialog}
          closeDetails={() => setExpandDetailsDialog(!expandDetailsDialog)}
          template={sidebarTemplate}
        />
      </div>
    </main>
  );
};

export default Home;
