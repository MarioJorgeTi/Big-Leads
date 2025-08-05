import { ScrollPanel } from 'primereact/scrollpanel';
import { useProcesses } from '../../contexts/processesContext';
import GeneralCard from '../../components/general/generalCard';
import ProcessesCardTemplate from '../../components/templates/processes/processesCardTemplate';

const GeneralKanban = () => {
    const { pulledProcess } = useProcesses();

    const columns = [
        {
            id: 1,
            column: 'Alocados',
            columnColor: 'var(--light-blue-color)',
            status: 'alocado',
        }
    ];

    return (
        <div className="overflow-auto">
            <ScrollPanel style={{ width: '150%' }}>
                <div className="flex gap-3 py-4">
                    {columns.map((column) => {
                        const filteredProcesses = pulledProcess.filter(p => p.status === column.status);

                        return (
                            <div key={column.id} style={{ minWidth: '350px' }}>
                                <div className='my-3 text-white border-round-3xl' style={{ background: column.columnColor }}>
                                    <h3 className='p-3'>{column.column}</h3>
                                </div>

                                <ScrollPanel style={{ height: '50vh' }}>
                                    <div className='p-3 border-round-xl' style={{ background: 'var(--gray-200)' }}>
                                        {filteredProcesses.map((process) => (
                                            <GeneralCard
                                                key={process.id}
                                                data={process}
                                                template={() => <ProcessesCardTemplate process={process} />}
                                            />
                                        ))}
                                    </div>
                                </ScrollPanel>
                            </div>
                        );
                    })}
                </div>
            </ScrollPanel>
        </div>
    );
};

export default GeneralKanban;
