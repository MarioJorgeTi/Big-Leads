import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import ImgLogin from '../recursos/login.jpg';
import Logo from '../recursos/logo.svg';
import api from '../servicos/api';
import FormularioSupremo from '../componentes/FormularioSupremo';
import '../recursos/css/login.css'

const Login = () => {
  const [carregando, setcarregando] = useState(false);
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const logar = async (dados) => {
    setcarregando(true);
    try {
      const response = await api.post('/login', dados);
      const { token, usuario } = response.data.success;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/roteador');
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
    } finally {
      setcarregando(false);
    }
  };

  const secoes = [
    {
      titulo: 'Login',
      campos: [
        ['E-mail', 'email', 'text', 'email', ['12', '12', '12', '12'], null],
        ['Senha', 'senha', 'password', 'palavra', ['12', '12', '12', '12'], null,],
      ]
    }
  ];

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const usuario = sessionStorage.getItem('usuario');
    if (token && usuario) {
      navigate('/roteador');
    }
  }, []);

  return (
    <main>
      <div className="grid h-screen">
        <div className="col-12 md:col-6 order-1 md:order-2 flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--primary-color)' }}>
          <div className="p-4 md:p-8 text-white">
            <div className="flex justify-content-center mb-4">
              <img src={Logo} alt="logo" className="max-w-15rem md:max-w-15rem xl:max-w-30rem" />
            </div>
            <div className="login">
              <FormularioSupremo secoes={secoes} onSubmit={(dados) => logar(dados)} carregando={carregando} textoButao='Entrar' />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 order-2 md:order-1 p-0">
          <img src={ImgLogin} alt="Justiça" className="w-full h-full" />
        </div>
      </div>
      <Toast ref={toastRef} />
    </main>
  );
};

export default Login;
