import { Outlet } from 'react-router-dom'
import Header from '../header'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/global/globalContext';
import RouterProtect from '../../routes/routerProtect';

const ProtectedLayout = () => {
    const { isMobile } = useContext(GlobalContext);

    return (
        <main>
            <Splitter className="h-full" layout={isMobile ? "vertical" : "horizontal"}>
                <SplitterPanel className="flex align-items-center justify-content-center" size={5} minSize={5}>
                    {(isMobile) ? <RouterProtect /> : <Header />}
                </SplitterPanel>
                <SplitterPanel size={95}>
                    {(isMobile) ? <Header /> : <RouterProtect />}
                </SplitterPanel>
            </Splitter>
        </main>
    )
}

export default ProtectedLayout
