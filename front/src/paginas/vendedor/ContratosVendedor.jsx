import LayoutPainelVendedor from "../../layouts/vendedor/LayoutPainelVendedor";
import GeradorContratos from "../../componentes/contratos/GeradorContratos";
import ContratoHonorario from "../../componentes/contratos/ContratoHonorario"
import ContratoAdmissao from "../../componentes/contratos/ContratoAdmissao";

const ContratosVendedor = () => {

  const contratosDisponiveis = [
    { label: 'Contrato de Honorário', value: 'ContratoHonorario' },
    { label: 'Contrato de Admissão', value: 'ContratoAdmissao' },
  ];

  const componentesContrato = {
    ContratoHonorario: ContratoHonorario,
    ContratoAdmissao: ContratoAdmissao,
  };

  return (
    <LayoutPainelVendedor>
      <div className="px-1 flex flex-column">
        <div className="mb-0">
          <h1 className=" text-6xl">Contratos</h1>
        </div>
        <div >
          <GeradorContratos contratosDisponiveis={contratosDisponiveis} componentesContrato={componentesContrato} />
        </div>
      </div>
    </LayoutPainelVendedor>
  )
};

export default ContratosVendedor;