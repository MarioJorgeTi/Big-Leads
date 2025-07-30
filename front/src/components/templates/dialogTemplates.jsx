import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { HiPencil } from "react-icons/hi";
import ButtonPullProcess from "../modules/buttonPullProcess";

export const HeaderTemplate = ({ data }) => {

  return (
    <div className="pl-3 flex gap-3">
      <ButtonPullProcess
        idProcess={data?.id}
      />
    </div>
  );
};

export const BodyTemplate = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-3 w-full flex flex-column row-gap-3">
      <div className="flex flex-column md:flex-row gap-3 row-gap-3 w-full md:flex-nowrap flex-wrap">
        <div className="px-4 border-round-xl flex-1" style={{ backgroundColor: '#f0f0f0ff', alignSelf: 'flex-start' }}>
          <h1>Detalhes do Processo:</h1>
          <p><strong>Processo:</strong> {data?.numero_processo}</p>
          <p><strong>Valor da Causa:</strong> {data?.valor_causa}</p>
          <p><strong>Classe Judicial:</strong> {data?.classe_judicial}</p>
          <p><strong>Data de Autuação:</strong> {data?.data_autuacao}</p>
          <p><strong>Última Distribuição:</strong> {data?.ultima_distribuicao}</p>
          <p><strong>Estado:</strong> {data?.estado}</p>
          <p><strong>Status:</strong> {data?.status}</p>
        </div>
      </div>

      <div className="flex flex-column md:flex-row gap-3 w-full md:flex-nowrap flex-wrap align-start">

        <div
          className="px-4 border-round-xl flex-1"
          style={{ backgroundColor: '#f0f0f0ff', alignSelf: 'flex-start' }}
        >
          <h1>Detalhes do(s) Polo(s) Ativo(s):</h1>
          <Accordion className="mb-3">
            {(data?.polos_ativos)?.map((poloativo) => (
              <AccordionTab className="bg-none border-round-xl p-0" key={poloativo?.cpf_cnpj} header={poloativo?.nome}>
                <h3>Dados:</h3>
                <span className="m-0"><b>CPF/CNPJ:</b> {poloativo?.cpf_cnpj}</span>
              </AccordionTab>
            ))}
          </Accordion>
        </div>

        <div
          className="px-4 border-round-xl flex-1"
          style={{ backgroundColor: '#f0f0f0ff', alignSelf: 'flex-start' }}
        >
          <h1>Detalhes do(s) Polo(s) Passivo(s):</h1>
          <Accordion className="mb-3" activeIndex={0}>
            {(data?.polos_passivos)?.map((polopassivo) => (
              <AccordionTab className="bg-none border-round-xl p-0" key={polopassivo?.cpf_cnpj} header={polopassivo?.nome}>
                <h3>Dados:</h3>
                <span className=" mb-2"><b>CPF/CNPJ:</b> {polopassivo?.cpf_cnpj}</span><br /><br />
                <span className="m-0"><b>E-MAILS:</b>
                  <ul>
                    {(polopassivo?.emails)?.map((email) => (
                      <li key={email?.endereco}>{email?.endereco}</li>
                    ))}
                  </ul>
                </span>
                <span className="m-0"><b>TELEFONES:</b>
                  <ul>
                    {(polopassivo?.telefones)?.map((telefone) => (
                      <li key={telefone?.numero}>{telefone?.numero}</li>
                    ))}
                  </ul>
                </span>
              </AccordionTab>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
