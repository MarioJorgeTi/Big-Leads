import { Dropdown } from 'primereact/dropdown';
import { useContext, useEffect } from 'react';
import { templatesMap } from '../models/formsTemplates';
import { ContractsContext } from '../contexts/contracts/contractsContext';

const ContractForm = () => {
  const {
    selectedModelValue,
    setSelectedModelValue,
    getFormComponent,
  } = useContext(ContractsContext);

  const FormComponent = getFormComponent(selectedModelValue);

  useEffect(() => {
    console.log('Modelo selecionado:', selectedModelValue);
    console.log('Componente retornado:', FormComponent);
  }, [selectedModelValue]);

  return (
    <div className="flex flex-column p-3 w-full gap-4">
      <div>
        <Dropdown
          value={selectedModelValue}
          onChange={(e) => setSelectedModelValue(e.value)}
          options={templatesMap}
          optionLabel="label"
          placeholder="Selecione o Modelo de Contrato"
          className="w-full"
        />
      </div>
      <div className="mt-3">
        {FormComponent && <FormComponent />}
      </div>
    </div>
  );
};

export default ContractForm;
