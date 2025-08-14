import { useNavigate } from 'react-router-dom';
import { IoDocuments, IoFunnel } from 'react-icons/io5';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { Ripple } from 'primereact/ripple';
import { usarLogout } from '../../componentes/Logout';
import Logo from '../../recursos/mj.svg';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';

const LayoutNavVendedor = () => {
    const navigate = useNavigate();
    const { ToastComponent } = usarLogout();

    const handleKey = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            action();
        }
    };

    return (
        <nav
            className="h-full grid m-0"
            style={{ background: 'var(--primary-color)' }}
        >
            <div className="flex flex-column justify-content-between h-full w-full">
                <div>
                    <div className="flex flex-column align-items-center mt-5 mb-5">
                        <img src={Logo} alt="logo" className="max-w-4rem" />
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        aria-label="Painel do Vendedor"
                        className="p-component p-ripple flex justify-content-center align-items-center gap-3 cursor-pointer select-none w-full p-2 my-3 text-white"
                        onClick={() => navigate('/painel/vendedor')}
                        onKeyDown={(e) => handleKey(e, () => navigate('/painel/vendedor'))}
                    >
                        <IoFunnel size={40} color="#ffffff" />
                        <Ripple />
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        aria-label="Leads"
                        className="p-component p-ripple flex justify-content-center align-items-center gap-3 cursor-pointer select-none w-full p-2 my-3 text-white"
                        onClick={() => navigate('/painel/vendedor/leads')}
                        onKeyDown={(e) => handleKey(e, () => navigate('/painel/vendedor/leads'))}
                    >
                        <IoDocuments size={40} color="#ffffff" />
                        <Ripple />
                    </div>
                    <div
                        role="button"
                        tabIndex={0}
                        aria-label="Contratos"
                        className="p-component p-ripple flex justify-content-center align-items-center gap-3 cursor-pointer select-none w-full p-2 my-3 text-white"
                        onClick={() => navigate('/painel/vendedor/contratos')}
                        onKeyDown={(e) => handleKey(e, () => navigate('/painel/vendedor/contratos'))}
                    >
                        <RiFilePaper2Fill size={40} color="#ffffff" />
                        <Ripple />
                    </div>
                </div>
                <ToastComponent />
                <Tooltip target=".custom-target-icon" />
            </div>
        </nav>
    );
};

export default LayoutNavVendedor;
