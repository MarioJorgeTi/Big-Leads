import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { FaEllipsisV } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';

const ProcessesCards = ({ data }) => {
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="grid">
      {data?.map((process) => (
        <Card
          key={process?.numero_processo}
          className="col-12 md:col-4 p-3 shadow-2 border-round-xl"
          style={{ border: 'none' }}
        >
          <div className="flex justify-content-between align-items-start">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {process?.numero_processo}
              </div>
              <div className="text-lg font-semibold text-primary">
                CPF: {process?.polos_passivos?.cpf_cnpj}
              </div>
            </div>
            <FaEllipsisV size={20} className="text-primary mt-1" />
          </div>

          <div className="mt-3">
            <div className="text-sm text-500 mb-1">Fase</div>
            <div className="text-lg font-bold text-primary flex align-items-center">
              {process.fase}
              <span className="ml-2 text-500">▼</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-sm text-500 mb-1">Montante</div>
            <div className="text-xl font-bold text-primary">
              R${parseFloat(process.valor_causa).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-sm text-500 mb-1">Responsável</div>
            <div className="flex align-items-center text-primary font-bold text-lg">
              <BsCircleFill className="mr-2 text-primary" />
              {process.responsavel}
            </div>
          </div>

          <div className="mt-4 flex justify-content-between">
            <div>
              <div className="text-sm text-500">Jurisdição</div>
              <div className="text-primary font-bold">{process.jurisdicao}</div>
            </div>
            <div>
              <div className="text-sm text-500">Autuado em:</div>
              <div className="text-primary font-bold">
                {formatDate(process.data_autuacao)}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProcessesCards;
