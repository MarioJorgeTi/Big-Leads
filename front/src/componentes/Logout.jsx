import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import api from '../servicos/api';

export function usarLogout() {
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await api.post('/logout');
      const mensagem = response.data.success.mensagem;
      toastRef.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: mensagem,
        life: 3000,
      });
      setTimeout(() => {
        sessionStorage.clear();
        navigate('/');
      }, 2000);
    } catch (error) {
      toastRef.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao fazer logout. Tente novamente.',
        life: 3000,
      });
    }
  };
  const ToastComponent = () => <Toast ref={toastRef} />;
  return { logout, ToastComponent };
}
