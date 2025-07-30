import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'

const FeesForm = () => {
  const formik = useFormik({
    initialValues: {
      numero_processo: '',
      email: '',
    },
    onSubmit: (values) => {
      loginAction(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-column row-gap-2 mb-3'>
        <label htmlFor="numero_processo">Número do Processo</label>
        <InputText id="numero_processo" value={formik.values.email} onChange={formik.handleChange} className='p-2 w-full' />
      </div>
      <div className='flex flex-column row-gap-2 mb-3'>
        <label htmlFor="email">E-mail</label>
        <InputText id="email" value={formik.values.email} onChange={formik.handleChange} className='p-2 w-full' />
      </div>
      <div className='flex flex-column row-gap-2 mb-3'>
        <Button type="submit" label='Enviar' id="buttonSubmit" className='py-2 w-full border-none' style={{ background: 'var(--primary-color)' }} />
      </div>
    </form>
  );
}
export default FeesForm;
