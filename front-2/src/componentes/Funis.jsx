import { Dropdown } from 'primereact/dropdown';

const Funis = ({ funilOpcoes, funilSelecionado, onChange }) => {
  return (
    <Dropdown
      value={funilSelecionado}
      options={funilOpcoes}
      onChange={(e) => onChange(e.value)}
      optionLabel="label"
      valueTemplate={(item) =>
        item ? (
          <div className="flex align-items-center justify-content-center font-bold" style={{ color: 'var(--primary-color)', fontSize: '1rem' }}>
            <h1>{item.label}</h1>
          </div>
        ) : (
          <span>Selecione...</span>
        )
      }
      itemTemplate={(item) => (
        <div className="text-md">{item.label}</div>
      )}
      className="border-none shadow-none p-0 min-w-min bg-transparent"
      panelClassName="shadow-2"
    />
  );
};

export default Funis;
