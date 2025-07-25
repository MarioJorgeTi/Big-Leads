import { FaBookmark } from 'react-icons/fa';
import { IoExit } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import '../assets/css/header.css'
import LogoIcon from '../assets/imgs/logo/logo-icon.png';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/authContext';

const Header = () => {
  const {
    updateToken,
    updateUserAccessLevel,
    updateUserInfos
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutBehavior = async () => {
    // await signOut(data);
    localStorage.removeItem("token");
    localStorage.removeItem("user_access_level");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_cpf_cnpj");

    updateToken("");
    updateUserAccessLevel(null);
    updateUserInfos({})

    navigate('/');
  }

  return (
    <header className='fixed bottom-0 w-full flex justify-content-center gap-8 py-4 md:relative md:flex md:flex-column md:m-0 md:h-full bg md:justify-content-between'>
      <div className="flex md:flex-column md:align-items-center md:mt-3">
        <img src={LogoIcon} alt="logo" className='hidden md:block max-w-7rem mb-4 p-3' />
        <div className='flex md:flex-column md:row-gap-4 gap-8'>
          <div>
            <Button
              icon={() => <GoHomeFill size={45} color='#ffffff' />}
              text
            />
          </div>
          <div>
            <Button
              icon={() => <FaBookmark size={40} color='#ffffff' />}
              text
            />
          </div>
        </div>
      </div>
      <div className='flex md:justify-content-center md:mb-4'>
        <Button
          icon={() => <IoExit size={46} color='#ffffff' />}
          text
          onClick={logOutBehavior}
        />
      </div>
    </header>
  )
}

export default Header