import { useState, useEffect } from 'react';

const funnelOptions = [
  { label: 'Funil Geral', value: 'geral' },
  { label: 'Pré-qualificados', value: 'pre' },
  { label: 'Negociação', value: 'negociacao' },
  { label: 'Fechados', value: 'fechados' },
];

const FunnelSelect = ({ selectedFunnel, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2
        style={{ cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        {funnelOptions.find(opt => opt.value === selectedFunnel)?.label} ▼
      </h2>
      {open && (
        <ul
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
            zIndex: 10,
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '200px',
          }}
        >
          {funnelOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FunnelSelect;
