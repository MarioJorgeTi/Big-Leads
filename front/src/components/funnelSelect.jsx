import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import { Dropdown } from 'primereact/dropdown';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/global/globalContext';

const FunnelSelect = ({ selectedFunnel, onChange }) => {
  const { isMobile } = useContext(GlobalContext);
  const funnelOptions = [
    { label: 'Funil Geral', value: 'geral' },
    { label: 'Pré-qualificados', value: 'pre' },
    { label: 'Negociação', value: 'negociacao' },
    { label: 'Fechados', value: 'fechados' },
  ];

  const getLabelByValue = (val) =>
    funnelOptions.find((opt) => opt.value === val)?.label || '';

  return (
    <Dropdown
      value={selectedFunnel}
      options={funnelOptions}
      onChange={(e) => onChange(e.value)}
      optionLabel="label"
      valueTemplate={() => (
        <div className="flex align-items-center font-bold" style={{
          color: 'var(--primary-color)',
          fontSize: (isMobile)?'2.5rem':'3rem'
        }}>
          {getLabelByValue(selectedFunnel)}
        </div>
      )}
      itemTemplate={(option) => (
        <div className="text-md">{option.label}</div>
      )}
      className="border-none shadow-none p-0 min-w-min bg-transparent"
      panelClassName="shadow-2"
    />
  );
};

export default FunnelSelect;
