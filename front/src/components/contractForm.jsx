import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { templatesMap } from '../models/templates';

const ContractForm = ({ }) => {
    const [selectedModel, setSelectedModel] = useState('');

    return (
        <div className="flex flex-column p-3 w-full">
            <div>
                <Dropdown
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.value)}
                    options={templatesMap}
                    placeholder="Selecione o Modelo de Contrato"
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default ContractForm;
