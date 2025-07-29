import { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { FaEye } from 'react-icons/fa';
import GeneralTable from '../components/generalTable';
import { ProcessesContext } from '../contexts/processes/processesContext'
import { GlobalContext } from '../contexts/global/globalContext';
import { FaCircleCheck } from 'react-icons/fa6';
import GeneralDialog from '../components/generalDialog';

const Home = () => {
  const { isMobile } = useContext(GlobalContext);
  const { processes } = useContext(ProcessesContext);
  const [expandDetailsDialog, setExpandDetailsDialog] = useState(false);

  const columns = [
    {
      id: 2,
      field: 'numero_processo',
      header: 'Processo',
      sortableDisabled: false,
      frozen: false
    },
    {
      id: 3,
      field: 'valor_causa',
      header: 'Valor da Causa (R$)',
      sortableDisabled: false,
      frozen: false,
      body: (rowData) => {
        const valor = parseFloat(rowData.valor_causa?.toString().replace(',', '.'));

        return !isNaN(valor) ? (
          <div className="pl-2">
            {valor.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ) : (
          '-'
        );
      }
    },
    {
      id: 4,
      field: 'classe_judicial',
      header: 'Classe Judicial',
      sortableDisabled: false,
      frozen: false
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
      body: (rowData) => (rowData?.status == 'disponível') ? <FaCircleCheck color='#11ac1eff' size={30} /> : null,
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

  const dialogTemplate = () => {
    return(
      <div>
        teste
      </div>
    )
  }

  return (
    <main className='flex md:flex-column h-screen w-full p-3'>
      <div>
        <h1
          className='px-3'
          style={{
            fontSize: '3rem',
            color: 'var(--primary-color)'
          }}
        >Funil Geral</h1>
      </div>
      <div>
        {(!isMobile) ?
          <GeneralTable
            columns={columns}
            data={processes}
          /> :
          null}
      </div>
      <GeneralDialog
        showDetails={expandDetailsDialog}
        closeDetails={() => setExpandDetailsDialog(!expandDetailsDialog)}
        template={dialogTemplate}
      />
    </main>
  );
};

export default Home;
