import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import imgLogin from '../assets/imgs/general/login-img.jpg'
import Logo from '../assets/imgs/logo/logo.svg';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useAuth } from '../contexts/authContext';
import { SyncLoader } from 'react-spinners';
import { FaEye } from 'react-icons/fa';

const Login = () => {
  const [passwordType, setPasswordType] = useState(true);
  const { loginAction } = useAuth();
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
    <main className="flex flex-col md:flex-row h-screen w-full bg-cover bg-center md:bg-none" style={{ backgroundImage: `url(${imgLogin})` }}>
      <section className="hidden md:flex md:w-full">
        <img
          src={imgLogin}
          alt="Justiça"
          className="object-cover w-full h-full"
        />
      </section>

      <aside className={`w-full h-23rem md:h-screen flex align-items-center justify-center border-round-bottom-xl md:border-noround-bottom`} style={{ backgroundColor: 'var(--primary-color)' }}>
        <div className="w-full p-4 md:px-8">
          <div className="flex justify-content-center mb-6">
            <img src={Logo} alt="logo" className="max-w-15rem md:max-w-15rem xl:max-w-30rem" />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <InputText
              type="email"
              id="email"
              placeholder="E-mail"
              className="w-full mb-3 py-3 px-3 border-none "
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            <IconField>
              <InputIcon onClick={() => setPasswordType(!passwordType)} className='hover:cursor-pointer text-primary'>
                <FaEye />
              </InputIcon>
              <InputText
                type={passwordType ? 'password' : 'text'}
                id="senha"
                name="senha"
                placeholder="Senha"
                value={formik.values.senha}
                onChange={formik.handleChange}
                feedback={false}
                toggleMask
                disabled={formik.isSubmitting}
                className="w-full"
                inputClassName="w-full p-3"
              />
            </IconField>

            <Button
              type="submit"
              label={formik.isSubmitting ?
                <SyncLoader color='#ffffff' /> : "Entrar"}
              disabled={formik.isSubmitting}
              className="w-full mt-5 py-3 text-lg border-none border-round-lg flex justify-content-center align-items-center"
              style={{ background: '#183584ff' }}
            />
          </form>
          <Toast ref={toastRef} />
        </div>
      </aside>
    </main>
  )
};

export default Login;