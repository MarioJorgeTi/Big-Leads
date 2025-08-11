import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../../recursos/css/contrato.css';

const GeradorContratos = ({ contratosDisponiveis, componentesContrato }) => {
  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const ComponenteSelecionado = componentesContrato[contratoSelecionado];

  return (
    <div>
      <h2>Selecionar Contrato</h2>
      <Dropdown
        value={contratoSelecionado}
        options={contratosDisponiveis}
        onChange={(e) => setContratoSelecionado(e.value)}
        placeholder="Selecione um contrato"
        className="w-full md:w-30rem mb-4"
      />
      {ComponenteSelecionado && (
        <div className="contrato">
          <ComponenteSelecionado />
        </div>
      )}
    </div>
  );
};

export default GeradorContratos;
