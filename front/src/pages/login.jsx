import { useContext } from 'react';
import '../assets/css/login.css';
import { GlobalContext } from '../contexts/global/globalContext';
import Logo from '../assets/imgs/logo/logo.svg';

const Login = () => {
  const { isMobile } = useContext(GlobalContext);

  return (
    <main className='grid h-screen m-0'>
      <section className='login-img sm:col-12 md:col-6 lg:col-6 xl:col-6'>
      </section>
      <aside className={`${(!isMobile) ? 'login-form' : 'login-form-mobile'} sm: p-5 md:col-6 lg:col-6 xl:col-6`}>
        <div>
          <img src={Logo} alt='logo' />
          <div>
            <form className='md:px-8 lg:px-8 xl:px-8 py-3'>
              <input type="email" id="email" placeholder="Digite seu e-mail" />

              <input type="password" id="password" placeholder="Digite sua senha" className="mt-2 mb-5" />

              <button type="submit">Entrar</button>
            </form>
          </div>
        </div>
      </aside>
    </main >
  )
};

export default Login;