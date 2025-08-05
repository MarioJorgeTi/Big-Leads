import Header from '../header'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import RouterProtect from '../../routes/routerProtect';
import { useGlobal } from '../../contexts/globalContext';

const ProtectedLayout = () => {
    const { isMobile, menuIsBigger } = useGlobal();

    return (
        <main>
            <Splitter
                key={menuIsBigger ? 'menu-big' : 'menu-small'}
                className="h-screen overflow-hidden border-noround"
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
