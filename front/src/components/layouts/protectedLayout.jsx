import { Outlet } from 'react-router-dom'
import Header from '../header'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/global/globalContext';
import RouterProtect from '../../routes/routerProtect';

const ProtectedLayout = () => {
    const { isMobile, menuIsBigger } = useContext(GlobalContext);

    return (
        <main>
            <Splitter
                key={menuIsBigger ? 'menu-big' : 'menu-small'}
                className="h-screen"
                layout={isMobile ? "vertical" : "horizontal"}
            >
                <SplitterPanel
                    className="flex flex-column align-items-center justify-content-center"
                    size={menuIsBigger ? 15 : 5}
                    minSize={5}
                >
                    {(isMobile) ? <RouterProtect /> : <Header />}
                </SplitterPanel>
                <SplitterPanel size={menuIsBigger ? 85 : 95}>
                    {(isMobile) ? <Header /> : <RouterProtect />}
                </SplitterPanel>
            </Splitter>
        </main>

    )
}

export default ProtectedLayout
