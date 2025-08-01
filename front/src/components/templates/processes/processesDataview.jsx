import { useState } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useProcesses } from '../../../contexts/processesContext';
import { FiMoreVertical } from 'react-icons/fi';
import '../../../assets/css/processesCards.css'
import { BodyTemplate, HeaderTemplate } from './dialogDetailsTemplates';
import GeneralSidebar from '../../general/generalSidebar';

const ProcessesCards = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [expandDetailsDialog, setExpandDetailsDialog] = useState(false);

  const { filteredProcesses } = useProcesses();
  const [layout] = useState('grid');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  const gridItem = (process) => (
    <div className="col-12 sm:col-6 md:col-6 xl:col-4 p-2 border-round-3xl mb-2 bg-white md:max-w-19rem" key={process?.numero_processo}>
      <div className="p-4">

        <div className='flex'>
          <h1 className="font-bold text-4xl mt-0 md:text-xl" style={{ color: 'var(--primary-color)' }}>{process?.numero_processo}</h1>
          <Button
            rounded
            text
            icon={() => <FiMoreVertical size={25} />}
            style={{ color: 'var(--primary-color)' }}
            onClick={() => {
              setSelectedRow(process);
              setExpandDetailsDialog(!expandDetailsDialog);
            }}
          />
        </div>

        <div className="font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>
          <span className="text-md md:text-sm">CPF/CNPJ (Polo Passivo):</span>
          {(process?.polos_passivos).map((polopassivo) => (
            <h2 key={polopassivo?.cpf_cnpj} className='text-3xl my-2 md:text-xl'>{polopassivo?.cpf_cnpj}</h2>
          ))}
        </div>

        <div className="font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>
          <span className="text-md mb-0 md:text-sm">Valor da Causa:</span>
          <h2 className="text-3xl my-2 md:text-xl">
            R${parseFloat(process?.valor_causa).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="text-md flex justify-content-between" style={{ color: 'var(--primary-color)' }}>
          <div className='font-semibold'>
            <span className='md:text-sm'>Estado:</span>
            <h2 className="my-2 text-3xl md:text-xl">
              {process?.estado}
            </h2>
          </div>

          <div className="font-semibold text-md" style={{ color: 'var(--primary-color)' }}>
            <span className="font-semibold md:text-sm">Autuado em:</span>
            <h2 className="my-2 text-3xl md:text-xl" >
              {formatDate(process?.data_autuacao)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );

  const itemTemplate = (process) => {
    if (!process) return null;

    return (gridItem(process));
  };

  const listTemplate = (processes, layout) => {
    return <div className="grid gap-3">{processes.map((process, index) => itemTemplate(process, layout, index))}</div>;
  };

  return (
    <>
      <DataView
        value={filteredProcesses}
        listTemplate={listTemplate}
        layout={layout}
        className='bg-transparent row-gap-3 mt-4 '
      />
      <GeneralSidebar
        isFullScreen
        showDetails={expandDetailsDialog}
        closeDetails={() => setExpandDetailsDialog(!expandDetailsDialog)}
        template={() => {
          return (
            <div>
              <HeaderTemplate data={selectedRow} />
              <BodyTemplate data={selectedRow} />
            </div>
          )
        }}
      />
    </>
  );
}


export default ProcessesCards