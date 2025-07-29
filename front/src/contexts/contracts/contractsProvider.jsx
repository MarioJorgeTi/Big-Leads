import { useState } from 'react';
import { ContractsContext } from './contractsContext';
import { templatesMap } from '../../models/templates';

export const ContractsProvider = ({ children }) => {
  const [selectedModelValue, setSelectedModelValue] = useState('');

  const getFormComponent = (contractModelValue) => {
    if (!contractModelValue) return null;

    const formTemplate = templatesMap.find(e => e.value === contractModelValue);
    return formTemplate?.template || null;
  };

  return (
    <ContractsContext.Provider value={{
      selectedModelValue,
      setSelectedModelValue,
      getFormComponent,
    }}>
      {children}
    </ContractsContext.Provider>
  );
};
