import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { IoDocuments, IoFunnel } from 'react-icons/io5';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { BiSolidExit } from 'react-icons/bi';
import { GoHomeFill } from "react-icons/go";
import { usarLogout } from '../../componentes/Logout';

const LayoutNavVendedor = () => {
  const navigate = useNavigate()
  const { logout, ToastComponent } = usarLogout();

  return (
    <nav className="h-full grid m-0 pr-0 justify-content-center" style={{ background: 'var(--primary-color)' }}>
      <div className="flex flex-column gap-4 justify-content-between">
        <div>
          <div className="col-12">
            <Button icon={() => <IoFunnel size={40} color='#ffffff' />} text className="text-white bg-primary" onClick={() => navigate('/painel/vendedor')} />
          </div>
          <div className="col-12">
            <Button icon={() => <IoDocuments size={40} color='#ffffff' />} text className="text-white bg-primary" onClick={() => navigate('/painel/vendedor/leads')} />
          </div>
          <div className="col-12">
            <Button icon={() => <RiFilePaper2Fill size={40} color='#ffffff' />} text className="text-white bg-primary" onClick={() => navigate('/painel/vendedor/contratos')} />
          </div>
        </div>
        <div>
          <div className="col-12">
            <Button icon={() => <BiSolidExit size={40} color='#ffffff' />} text className="text-white bg-primary" onClick={logout} />
          </div>
        </div>
      </div>
      <ToastComponent />
    </nav>
  )
}

export default LayoutNavVendedor
