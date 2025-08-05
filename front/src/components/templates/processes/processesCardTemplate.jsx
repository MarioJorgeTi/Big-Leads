import { Button } from 'primereact/button';
import { FiMoreVertical } from 'react-icons/fi';
import { useState } from 'react';

const ProcessesCardTemplate = ({ process }) => {
    const [expandDetailsDialog, setExpandDetailsDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <>
            <div className='flex justify-content-between align-items-center'>
                <h1 className="font-bold text-4xl mt-0 md:text-xl" style={{ color: 'var(--primary-color)' }}>
                    {process?.numero_processo}
                </h1>
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
                <span className="text-md md:text-sm">Classe Judicial:</span>
                <h2 className='text-3xl my-2 md:text-xl'>{process?.classe_judicial}</h2>
            </div>

            <div className="font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>
                <span className="text-md mb-0 md:text-sm">Valor da Causa:</span>
                <h2 className="text-3xl my-2 md:text-xl">
                    R${parseFloat(process?.valor_causa || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
                        {process?.data_autuacao}
                    </h2>
                </div>
            </div>
        </>
    );
};

export default ProcessesCardTemplate;
