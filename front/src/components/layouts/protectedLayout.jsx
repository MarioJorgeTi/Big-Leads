import Header from '../header'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import RouterProtect from '../../routes/routerProtect';
import { useGlobal } from '../../contexts/globalContext';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
    const { isMobile, menuIsBigger } = useGlobal();

    return (
        <Splitter
            key={menuIsBigger ? 'menu-big' : 'menu-small'}
            className={`flex-column-reverse md:flex-row h-screen overflow-hidden border-noround`}
            layout={isMobile ? "vertical" : "horizontal"}
        >
            <SplitterPanel
                className="flex flex-column align-items-center justify-content-center"
                size={menuIsBigger ? 15 : 5}
                minSize={5}
            >
                <Header />
            </SplitterPanel>
            <SplitterPanel size={menuIsBigger ? 85 : 95}>
                <Outlet />
            </SplitterPanel>
        </Splitter>
    )
}

export default ProtectedLayout
