import { SplitButton } from 'primereact/splitbutton';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import api from '../servicos/api';
import ProcessoDetalhes from './ProcessoDetalhes';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const AcoesVendedor = ({ processoId, recarregarProcessos }) => {

  const [detalhesAberto, setdetalhesAberto] = useState(false);
  const toastRef = useRef(null);
  const menu = useRef(null);

  const puxarProcesso = async () => {
    try {
      const resultado = await api.post(`/vendedor/processo/puxar/${processoId}`);
      const mensagem = resultado.data.success.mensagem;
      toastRef.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: mensagem,
        life: 3000,
      });
      await recarregarProcessos();
    } catch (error) {
      const response = error.response.data;
      if (response.errors) {
        Object.values(response.errors).forEach((msg) => {
          toastRef.current.show({
            severity: 'error',
            summary: 'Erro de Validação',
            detail: msg,
            life: 4000,
          });
        });
      }
    }
  };

  const abrirDetalhes = () => {
    setdetalhesAberto(true);
  };

  const acoes = [
    {
      label: 'Puxar Processo',
      command: puxarProcesso
    },
    {
      label: 'Ver Detalhes',
      command: abrirDetalhes
    }
  ];

  return (
    <div className="card flex justify-content-center">
      <Button
        icon='pi pi-chevron-down'
        style={{color: 'var(--primary-color)'}}
        rounded
        outlined
        onClick={(event) => menu.current.toggle(event)}
      />
      <Menu model={acoes} popup ref={menu} />
      <Toast ref={toastRef} />
      <ProcessoDetalhes
        idProcesso={processoId}
        visible={detalhesAberto}
        onHide={() => setdetalhesAberto(false)}
      />
    </div>
  );
};

export default AcoesVendedor;