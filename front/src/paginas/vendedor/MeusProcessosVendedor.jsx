import { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
import api from "../../servicos/api";
import LayoutPainelVendedor from "../../layouts/vendedor/LayoutPainelVendedor";
import Kanban from '../../componentes/Kanban';
import Funis from "../../componentes/Funis";

const MeusProcessosVendedor = () => {

  const [carregando, setcarregando] = useState(false);
  const [processos, setProcessos] = useState([]);
  const toastRef = useRef(null);

  const pegarProcessosVendedor = async () => {
    setcarregando(true);
    try {
      const resposta = await api.get('/vendedor/processos/usuario');
      const mensagem = resposta.data.success.mensagem;
      setProcessos(resposta.data.success.processos);
      toastRef.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: mensagem,
        life: 3000,
      });
    } catch (error) {
      console.log(error);
      const resposta = error.response.data;
      if (resposta.errors) {
        Object.values(resposta.errors).forEach((msg) => {
          toastRef.current.show({
            severity: 'error',
            summary: 'Erro de Validação',
            detail: msg,
            life: 4000,
          });
        });
      }
    } finally {
      setcarregando(false);
    }
  }

  useEffect(() => {
    pegarProcessosVendedor();
  }, []);

  const funnelOptions = [
    { label: 'Comercial', value: 'comercial' },
    { label: 'Tramit', value: 'tramit' },
    { label: 'Juridico', value: 'juridico' },
    { label: 'Negociação', value: 'negociacao' },
  ];

  const [selectedFunnel, setSelectedFunnel] = useState(funnelOptions[0].value);

  return (
    <LayoutPainelVendedor>
      <div className='px-3'>
        <Funis funilOpcoes={funnelOptions} funilSelecionado={selectedFunnel} onChange={setSelectedFunnel} />
        <Kanban dados={processos} funilAtual={selectedFunnel} />
      </div>
      <Toast ref={toastRef} />
    </LayoutPainelVendedor>
  )
};

export default MeusProcessosVendedor;