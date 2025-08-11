import { SplitButton } from 'primereact/splitbutton';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import api from '../servicos/api';

const AcoesVendedor = ({ processoId, recarregarProcessos }) => {

  const toastRef = useRef(null);

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

  const acoes = [
    {
      label: 'Puxar Processo',
      command: puxarProcesso
    },
    {
      label: 'Ação 2',
      command: () => {
        console.log(`Opção 2 para ID: ${processoId}`);
      }
    },
    {
      label: 'Ação 3',
      command: () => {
        console.log(`Opção 3 para ID: ${processoId}`);
      }
    }
  ];

  return (
    <div className="card flex justify-content-center">
      <SplitButton
        label=""
        model={acoes}
        className="p-button-sm"
        rounded
      />
      <Toast ref={toastRef} />
    </div>
  );
};

export default AcoesVendedor;