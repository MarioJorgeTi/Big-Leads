import { useEffect, useState } from "react";
import { formatarData, formatarPreco } from "../../utilitarios/funcoes.js";
import LayoutPainelVendedor from "../../layouts/vendedor/LayoutPainelVendedor";
import Tabela from "../../componentes/Tabela.jsx";
import api from "../../servicos/api";
import AcoesVendedor from "../../componentes/AcoesVendedor.jsx";

const PainelVendedor = () => {

  const [processos, setProcessos] = useState([]);
  const [carregando, setcarregando] = useState(false);

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
    data_autuacao: formatarData,
    ultima_distribuicao: formatarData,
  };

  useEffect(() => {
    pegarProcessosFunilGeral();
  }, []);

  return (
    <LayoutPainelVendedor>
      <Tabela
        data={processos}
        carregando={carregando}
        camposVisiveis={campos}
        formatadores={formatadores}
        renderAcoes={(dadoCru) => <AcoesVendedor processoId={dadoCru.id} recarregarProcessos={pegarProcessosFunilGeral}
        />}
      />
    </LayoutPainelVendedor>
  )
};

export default PainelVendedor;