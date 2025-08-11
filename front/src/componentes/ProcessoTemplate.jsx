import { useState } from 'react';
import { formatarData, formatarPreco } from '../utilitarios/funcoes';
import { SplitButton } from 'primereact/splitbutton';

export const Header = ({ data }) => {
  return (
    <div className='flex justify-content-between align-items-center'>
      <h1 className="font-bold text-2xl my-0" style={{ color: 'var(--primary-color)' }}>
        {data.numero_processo}
      </h1>
    </div>
  );
}

export const Template = ({ data }) => {
  const [show, setShow] = useState(false);

  const acoes = [
    {
      label: 'Ação 1',
      command: () => {
        console.log('Ação 1');
      }
    },
    {
      label: 'Ação 2',
      command: () => {
        console.log('Ação 2');
      }
    },
    {
      label: 'Ação 3',
      command: () => {
        console.log('Ação 2');
      }
    }
  ];



  return (
    <>
      <div className="font-semibold my-2" style={{ color: 'var(--primary-color)' }}>
        <span className="text-md md:text-sm">Classe Judicial:</span>
        <h2 className='text-3xl my-0 md:text-lg'>{data.classe_judicial}</h2>
      </div>

      <div className="font-semibold my-2" style={{ color: 'var(--primary-color)' }}>
        <span className="text-md mb-0 md:text-sm">Valor da Causa:</span>
        <h2 className="text-3xl my-0 md:text-lg">
          {formatarPreco(data.valor_causa)}
        </h2>
      </div>

      <div className="text-md flex justify-content-between my-2" style={{ color: 'var(--primary-color)' }}>
        <div className='font-semibold'>
          <span className='md:text-sm'>Estado:</span>
          <h2 className="my-0 text-3xl md:text-lg">
            {data.estado}
          </h2>
        </div>

        <div className="font-semibold text-md" style={{ color: 'var(--primary-color)' }}>
          <span className="font-semibold md:text-sm">Autuado em:</span>
          <h2 className="my-0 text-3xl md:text-lg">
            {formatarData(data.data_autuacao)}
          </h2>
        </div>
      </div>
      <SplitButton label="Detalhes" model={acoes} className="w-full my-2 p-0" rounded />
    </>
  );
}