import { Sidebar } from "primereact/sidebar"
import { useGlobal } from '../../contexts/globalContext';

const GeneralSidebar = ({ showDetails, closeDetails, template, isFullScreen = false }) => {
    const { isMobile } = useGlobal();
    return (
        <Sidebar
            visible={showDetails}
            onHide={closeDetails}
            position='right'
            fullScreen={isMobile || isFullScreen}
        >
            <div>{template()}</div>
        </Sidebar>
    )
}

export default GeneralSidebar