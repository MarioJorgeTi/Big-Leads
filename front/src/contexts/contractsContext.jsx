import { createContext, useContext, useState } from 'react';
import { templatesMap } from '../models/contracts';

export const ContractsContext = createContext({});

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

export const useContracts = () => {
  return useContext(ContractsContext);
};