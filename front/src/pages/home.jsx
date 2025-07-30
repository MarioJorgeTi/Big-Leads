import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { FaChevronLeft } from 'react-icons/fa6';
import GeneralTable from '../components/general/generalTable';
import GeneralDialog from '../components/general/generalDialog';
import { HeaderTemplate, BodyTemplate } from '../components/templates/dialogTemplates';
import { Toast } from 'primereact/toast';
import { useProcesses } from '../contexts/processesContext';
import { useGlobal } from '../contexts/globalContext';
import SearchAndFilters from '../components/modules/searchAndFilters';

const Home = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [expandDetailsDialog, setExpandDetailsDialog] = useState(false);

  const { isMobile } = useGlobal();
  const toastRef = useRef();

  const {
    RenderStatusIcon,
    finalValue,
    filteredProcesses,
  } = useProcesses();

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
        ) : '-';
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
      sortableDisabled: false,
      isAction: true,
      frozen: false,
    },
    {
      id: 8,
      field: 'status',
      header: 'Status',
      sortableDisabled: false,
      isAction: true,
      frozen: false,
      body: (rowData) => RenderStatusIcon(rowData?.status),
    },
    {
      id: 9,
      sortableDisabled: true,
      isAction: true,
      frozen: true,
      body: (rowData) => {
        return (
          <div className='flex justify-content-center align-items-center gap-2'>
            <Button
              onClick={() => {
                setSelectedRow(rowData);
                setExpandDetailsDialog(!expandDetailsDialog);
              }}
              className='p-3'
              style={{ color: 'var(--primary-color)' }}
              rounded
              outlined
            >
              <FaChevronLeft size={20} style={{ color: 'var(--primary-color)' }} />
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <main className='flex md:flex-column h-screen w-full px-3'>
      <div className='flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center'>
        <div>
          <h1 className='px-3 mb-0' style={{
            fontSize: '3.5rem',
            color: 'var(--primary-color)'
          }}>Funil Geral</h1>
          <h2 className='px-3 mt-3' style={{
            fontSize: '2rem',
            color: 'var(--primary-color)'
          }}>Valor Total: {finalValue}</h2>
        </div>
        <SearchAndFilters />
      </div>
      <div>
        {!isMobile && (
          <GeneralTable columns={columns} data={filteredProcesses} />
        )}
      </div>
      <GeneralDialog
        showDetails={expandDetailsDialog}
        closeDetails={() => setExpandDetailsDialog(!expandDetailsDialog)}
        headerTemplate={() => <HeaderTemplate data={selectedRow} />}
        bodyTemplate={() => <BodyTemplate data={selectedRow} />}
      />
      <Toast ref={toastRef} />
    </main>
  );
};

export default Home;
