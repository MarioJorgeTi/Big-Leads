import { useRef } from 'react';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import Logo from '../assets/imgs/logo/logo.svg';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useAuth } from '../contexts/authContext';
import { useGlobal } from '../contexts/globalContext';

const Login = () => {
  const {
    isMobile
  } = useGlobal();
  const {
    loginAction,
    updateToken,
    updateUserAccessLevel,
    updateUserInfos
  } = useAuth();
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      if (!values?.email || !values?.senha) {
        toastRef.current.show({
          severity: 'error',
          summary: 'Erro',
          detail: "E-mail e Senha são obrigatórios",
          life: 3000
        });
        return;
      }

      const results = await loginAction(values);
      
      if (results?.success?.token && results?.success?.usuario) {
        navigate('/dashboard', { replace: true });
      }

      if (results?.errors) {
        toastRef.current.show({
          severity: 'error',
          summary: 'Erro',
          detail: results?.errors?.autenticacao,
          life: 3000
        });

        return;
      }

      setSubmitting(false);
    }
  });

  return (
    <main className='grid h-screen m-0 p-0 border-box'>
      <section className='login-img bg-no-repeat bg-center bg-cover sm:col-12 md:col-6 lg:col-6 xl:col-6'>
      </section>
      <aside className={`${(!isMobile) ? 'login-form flex flex-column align-itmes-center justify-content-center' : 'login-form-mobile'} p-5 md:col-6 lg:col-6 xl:col-6`}>
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
                {formik.isSubmitting ?
                  ". . . . ." : "Entrar"}
                disabled={formik.isSubmitting}
                className={`text-2xl w-full py-3 border-round-lg border-none  flex justify-content-center`} style={{ background: '#183584ff' }}
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