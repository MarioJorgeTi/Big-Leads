import { useEffect, useState } from "react";
import { formatarPreco } from "../../utilitarios/funcoes.js";
import { filtrarProcessos } from "../../utilitarios/funcoes.js";
import LayoutPainelVendedor from "../../layouts/vendedor/LayoutPainelVendedor";
import Tabela from "../../componentes/Tabela.jsx";
import api from "../../servicos/api";
import AcoesVendedor from "../../componentes/AcoesVendedor.jsx";
import Filtros from "../../componentes/Filtros";

const PainelVendedor = () => {
  const [processos, setProcessos] = useState([]);
  const [carregando, setcarregando] = useState(false);
  const [filtros, setFiltros] = useState({ data: null, classe: null, estado: null, status: null, valor: null });
  const pegarProcessosFunilGeral = async () => {
    setcarregando(true);
    try {
      const resultado = await api.get('/vendedor/processos/funil-geral');
      setProcessos(resultado.data.success.processos);
    } catch (erro) {
      console.error("Erro ao buscar processos:", erro);
    } finally {
      setcarregando(false);
    }
  };
  const campos = ['numero_processo', 'valor_causa', 'classe_judicial', 'data_autuacao', 'ultima_distribuicao', 'estado'];
  const formatadores = {
    valor_causa: formatarPreco,
  };
  useEffect(() => {
    pegarProcessosFunilGeral();
  }, []);
  const processosFiltrados = filtrarProcessos(processos, filtros);

  return (
    <LayoutPainelVendedor>
      <div className="flex align-items-center justify-content-between px-1">
        <h1 className="text-6xl my-3" >Funil Geral</h1>
        <Filtros filtros={filtros} setFiltros={setFiltros} />
      </div>
      <Tabela
        data={processosFiltrados}
        carregando={carregando}
        camposVisiveis={campos}
        formatadores={formatadores}
        renderAcoes={(dadoCru) => <AcoesVendedor processoId={dadoCru.id} recarregarProcessos={pegarProcessosFunilGeral} />}
      />
    </LayoutPainelVendedor>
  );
};

export default PainelVendedor;
