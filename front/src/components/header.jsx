import { FaBookmark } from 'react-icons/fa';
import { IoExit } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import '../assets/css/header.css'
import LogoIcon from '../assets/imgs/logo/logo-icon.png';
import { Button } from 'primereact/button';

const Header = () => {

  return (
    <header className='fixed bottom-0 w-full flex justify-content-center gap-8 py-4 md:relative md:flex md:flex-column md:m-0 md:h-screen bg md:justify-content-between'>
      <div className="flex md:flex-column md:align-items-center md:mt-3">
        <img src={LogoIcon} alt="logo" className='hidden md:block  w-9 mb-4' />
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
          icon={() => <IoExit  size={46} color='#ffffff' />}
          text
        />
      </div>
    </header>
  )
}

export default Header