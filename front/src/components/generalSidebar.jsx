import { Sidebar } from "primereact/sidebar"

const GeneralSidebar = ({ showDetails, closeDetails, template }) => {
    return (
        <Sidebar
            visible={showDetails}
            onHide={closeDetails}
            position='right'
        >
            <div>{template()}</div>
        </Sidebar>
    )
}

export default GeneralSidebar