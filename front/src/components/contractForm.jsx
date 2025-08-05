import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';
import { templatesMap } from '../models/contracts';
import { useContracts } from '../contexts/contractsContext';
import { Divider } from 'primereact/divider';

const ContractForm = () => {
  const {
    selectedModelValue,
    setSelectedModelValue,
    getFormComponent,
  } = useContracts();

  const FormComponent = getFormComponent(selectedModelValue);

  useEffect(() => {
  }, [selectedModelValue]);

  return (
    <div className="flex flex-column p-2 w-full">
      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Tipos de Processo</span>
      </Divider>
      <Dropdown
        value={selectedModelValue}
        onChange={(e) => setSelectedModelValue(e.value)}
        options={templatesMap}
        optionLabel="label"
        placeholder="Selecione o Modelo de Contrato"
        className="w-full"
      />
      <div className="mt-2">
        {FormComponent && <FormComponent />}
      </div>
    </div>
  );
};

export default ContractForm;
