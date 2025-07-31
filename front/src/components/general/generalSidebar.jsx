import { Sidebar } from "primereact/sidebar"
import { useGlobal } from '../../contexts/globalContext';

const GeneralSidebar = ({ showDetails, closeDetails, template }) => {
    const { isMobile } = useGlobal();
    return (
        <Sidebar
            visible={showDetails}
            onHide={closeDetails}
            position='right'
            fullScreen={isMobile}
        >
            <div>{template()}</div>
        </Sidebar>
    )
}

export default GeneralSidebar