import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

const GeradorContratos = ({ contratosDisponiveis, componentesContrato }) => {
    const [visible, setVisible] = useState(false);
    const [contratoSelecionado, setContratoSelecionado] = useState(null);
    const ComponenteSelecionado = componentesContrato[contratoSelecionado];

    return (
        <div className='mt-0'>
            <h2>Selecionar Contrato</h2>
            <Dropdown
                value={contratoSelecionado}
                options={contratosDisponiveis}
                onChange={(e) => {
                    setContratoSelecionado(e.value);
                    setVisible(!visible)
                }}
                placeholder="Selecione um contrato"
                className="w-full md:w-30rem mb-4"
            />
            <Dialog
                visible={visible}
                style={{ width: '80vw' }}
                onHide={() => {
                    setVisible(false);
                    setContratoSelecionado(null);
                }}>
                {ComponenteSelecionado && (
                    <div className="contrato">
                        <ComponenteSelecionado />
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default GeradorContratos;
