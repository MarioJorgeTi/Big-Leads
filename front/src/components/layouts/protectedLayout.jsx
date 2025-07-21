import { Outlet } from 'react-router-dom'
import Header from '../header'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/global/globalContext';

const ProtectedLayout = () => {
    const { isMobile } = useContext(GlobalContext);

    return (
        <main>
            <Splitter className="h-screen" layout={isMobile ? "vertical" : "horizontal"}>
                <SplitterPanel className="flex align-items-center justify-content-center" size={5} minSize={5}>
                    {(isMobile) ? <Outlet /> : <Header />}
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center" size={95}>
                    {(isMobile) ? <Header /> : <Outlet />}
                </SplitterPanel>
            </Splitter>
        </main>
    )
}

export default ProtectedLayout
