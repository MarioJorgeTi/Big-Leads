import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { IoDocuments, IoFunnel } from 'react-icons/io5';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { BiSolidExit } from 'react-icons/bi';
import { usarLogout } from '../../componentes/Logout';
import Logo from '../../recursos/mj.svg'

const LayoutNavVendedor = () => {
  const navigate = useNavigate()
  const { ToastComponent } = usarLogout();

  return (
    <nav className="h-full grid m-0 justify-content-center" style={{ background: 'var(--primary-color)' }}>
      <div className="flex flex-column gap-4 justify-content-between">
        <div className='mt-5'>
          <div className='flex flex-column justify-content-center mb-3'>
            <img src={Logo} alt='logo' className='max-w-4rem' />
          </div>
          <div className="col-12 flex justify-content-center w-full">
            <Button icon={() => <IoFunnel size={40} color='#ffffff' />} text className="text-white bg-primary" onClick={() => navigate('/painel/vendedor')} />
          </div>
          <div className="col-12 flex justify-content-center w-full">
            <Button icon={() => <IoDocuments size={40} color='#ffffff' />} text className="text-white bg-primary" onClick={() => navigate('/painel/vendedor/leads')} />
          </div>
          <div className="col-12 flex justify-content-center w-full">
            <Button icon={() => <RiFilePaper2Fill size={40} color='#ffffff' />} text className="text-white bg-primary" onClick={() => navigate('/painel/vendedor/contratos')} />
          </div>
        </div>
      </div>
      <ToastComponent />
    </nav>
  )
}

export default LayoutNavVendedor
