import { FaBookmark } from 'react-icons/fa';
import '../assets/css/header.css'
import LogoIcon from '../assets/imgs/icons/mj-icon.svg';
import Logo from '../assets/imgs/logo/logo.svg'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/authContext';
import { signOut } from '../services/auth'
import { TiThMenu } from 'react-icons/ti';
import { BiSolidExit } from 'react-icons/bi';
import { GlobalContext } from '../contexts/global/globalContext';
import { IoFunnel } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import { FaBookOpenReader, FaPaperPlane } from 'react-icons/fa6';

const Header = () => {
  const { menuIsBigger, updateMenuSize } = useContext(GlobalContext);
  const navigate = useNavigate();

  const {
    token,
    updateToken,
    updateUserAccessLevel,
    updateUserInfos
  } = useContext(AuthContext);

  const logOutBehavior = async () => {
    await signOut(token);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_access_level");
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_cpf_cnpj");

    updateToken("");
    updateUserAccessLevel(null);
    updateUserInfos({});

    navigate('/');
  }

  return (
    <header className={`fixed bottom-0 w-full flex justify-content-center gap-8 py-4 md:relative md:flex md:flex-column md:m-0 md:h-full bg md:justify-content-between`}>
      <div className="flex md:flex-column md:align-items-center md:mt-3">
        <img
          src={menuIsBigger ? Logo : LogoIcon}
          alt="logo"
          className={`hidden md:block ${menuIsBigger ? 'max-w-12rem mb-6' : ' max-w-6rem mb-4'}`}
        />
        <div className='flex md:flex-column md:row-gap-4 gap-8'>
          <div>
            <Button
              icon={() => <IoFunnel size={40} color='#ffffff' />}
              text
              label={!menuIsBigger ? '' : 'Funil Geral'}
              className={`p-0 ${menuIsBigger ? 'gap-2' : ''} text-white`}
              style={{ color: '#ffffff !important' }}
              onClick={() => navigate('/dashboard')}
            />
          </div>
          <div>
            <Button
              icon={() => <FaBookmark size={40} color='#ffffff' />}
              text
              label={!menuIsBigger ? '' : 'Meus Leads'}
              className={`p-0 py-1 ${menuIsBigger ? 'gap-2' : ''}  text-white`}
              style={{ color: '#ffffff !important' }}
              onClick={() => navigate('/dashboard/meus-leads')}
            />
          </div>
          <div>
            <Button
              icon={() => <FaBookOpenReader size={40} color='#ffffff' />}
              text
              label={!menuIsBigger ? '' : 'Contratos'}
              className={`p-0 py-1 ${menuIsBigger ? 'gap-2' : ''}  text-white`}
              style={{ color: '#ffffff !important' }}
              onClick={() => navigate('/dashboard/contratos')}
            />
          </div>
        </div>
      </div >
      <div className='flex md:flex-column md:justify-content-center md:align-items-center md:row-gap-4'>
        <Button
          icon={() => <BiSolidExit size={40} color='#ffffff' />}
          text
          label={!menuIsBigger ? '' : 'Sair'}
          className={`p-0 ${menuIsBigger ? 'gap-2' : ''} text-white`}
          style={{ color: '#ffffff !important' }}
          onClick={logOutBehavior}
        />
        <Button
          icon={() => (!menuIsBigger) ? <TiThMenu size={40} color='#ffffff' /> : <CgClose size={46} color='#ffffff' />}
          text
          className='p-0 hidden md:flex  text-white'
          onClick={updateMenuSize}
        />
      </div>
    </header >
  )
}

export default Header