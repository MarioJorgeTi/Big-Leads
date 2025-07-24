import { useContext, useRef } from 'react';
import '../assets/css/login.css';
import { InputText } from 'primereact/inputtext'
import { GlobalContext } from '../contexts/global/globalContext';
import Logo from '../assets/imgs/logo/logo.svg';
import { AuthContext } from '../contexts/auth/authContext';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';

const Login = () => {
  const {
    isMobile,
    errorCatcher,
    setErrorCatcher
  } = useContext(GlobalContext);
  const { loginAction } = useContext(AuthContext);
  const toastRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: ''
    },
    onSubmit: async (values) => {
      await loginAction(values);
    },
  });

  return (
    <main className='grid h-screen m-0'>
      <section className='login-img sm:col-12 md:col-6 lg:col-6 xl:col-6'>
      </section>
      <aside className={`${(!isMobile) ? 'login-form' : 'login-form-mobile'} sm: p-5 md:col-6 lg:col-6 xl:col-6`}>
        <div>
          <img src={Logo} alt='logo' />
          <div>
            <form onSubmit={formik.handleSubmit} className='md:px-8 lg:px-8 xl:px-8 py-3'>
              <InputText
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={formik.values.email}
                onChange={(e) => formik.handleChange(e)}
              />
              <InputText
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                className="mt-2 mb-5"
                value={formik.values.senha}
                onChange={(e) => formik.handleChange(e)}
              />
              <button type="submit">Entrar</button>
            </form>
          </div>
        </div>
        <Toast ref={toastRef} />
      </aside>
    </main >
  )
};

export default Login;