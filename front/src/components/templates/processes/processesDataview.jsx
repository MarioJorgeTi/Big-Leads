import { useState } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useProcesses } from '../../../contexts/processesContext';
import { FiMoreVertical } from 'react-icons/fi';
import '../../../assets/css/processesCards.css'
import { BodyTemplate, HeaderTemplate } from './dialogDetailsTemplates';
import GeneralSidebar from '../../general/generalSidebar';
import ProcessesCardTemplate from './processesCardTemplate';

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

  const gridItem = (process) => {
    return (
      <ProcessesCardTemplate process={process} />
    );
  }
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