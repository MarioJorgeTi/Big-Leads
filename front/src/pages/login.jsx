import { useContext, useRef } from 'react';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { GlobalContext } from '../contexts/global/globalContext';
import Logo from '../assets/imgs/logo/logo.svg';
import { AuthContext } from '../contexts/auth/authContext';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const Login = () => {
  const {
    isMobile,
    errorCatcher,
    setErrorCatcher
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const {
    loginAction,
    updateToken,
    updateUserAccessLevel,
    updateUserInfos
  } = useContext(AuthContext);
  const toastRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const results = await loginAction(values);

        if (results?.token && results?.usuario) {
          updateToken(results?.token);
          updateUserAccessLevel(results?.usuario?.nivel_acesso);
          updateUserInfos({ ...results?.usuario });

          localStorage.setItem("token", results?.token);
          localStorage.setItem("user_access_level", results?.usuario?.nivel_acesso);
          localStorage.setItem("user_name", results?.usuario?.nome);
          localStorage.setItem("user_email", results?.usuario?.email);
          localStorage.setItem("user_cpf_cnpj", results?.usuario?.cpf_cnpj);

          navigate('/dashboard', { replace: true });
        } else {
          const errorMessage = results?.errors?.autenticacao?.[0] || 'Erro ao autenticar.';
          setErrorCatcher(errorMessage);
          toastRef.current.show({
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
            life: 3000
          });

        }
      } catch (error) {
        setErrorCatcher("Não foi possível realizar o login! Tente novamente.");
        console.error("Erro no login:", error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <main className='grid h-screen m-0 p-0 border-box'>
      <section className='login-img bg-no-repeat bg-center bg-cover sm:col-12 md:col-6 lg:col-6 xl:col-6'>
      </section>
      <aside className={`${(!isMobile) ? 'login-form' : 'login-form-mobile'} sm: p-5 md:col-6 lg:col-6 xl:col-6`}>
        <div>
          <div className='flex justify-content-center mb-3 md:mb-4'>
            <img src={Logo} alt='logo' className='w-8 xl:w-5' />
          </div>
          <div className='xl:px-8'>
            <form onSubmit={formik.handleSubmit} className='xl:px-8'>
              <InputText
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                className=' py-3'
                value={formik.values.email}
                onChange={(e) => formik.handleChange(e)}
                disabled={formik.isSubmitting}
              />
              <InputText
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                className="mt-2 mb-5 py-3"
                value={formik.values.senha}
                onChange={(e) => formik.handleChange(e)}
                disabled={formik.isSubmitting}
              />
              <Button
                type="submit"
                label=
                {formik.isSubmitting ? "Entrando..." : "Entrar"}
                disabled={formik.isSubmitting}
                className='w-full py-3 border-round-lg border-none text-2xl' style={{ background: '#183584ff' }}
              />
            </form>
          </div>
        </div>
        <Toast ref={toastRef} />
      </aside>
    </main >
  )
};

export default Login;