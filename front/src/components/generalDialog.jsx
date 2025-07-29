import { Dialog } from 'primereact/dialog'
import { useContext } from 'react'
import { GlobalContext } from '../contexts/global/globalContext'
import '../assets/css/generalDialog.css'

const GeneralDialog = ({ showDetails, closeDetails, headerTemplate, bodyTemplate }) => {
    const { isMobile } = useContext(GlobalContext);

    return (
        <Dialog
            visible={showDetails}
            onHide={closeDetails}
            header={headerTemplate}
            position='right'
            className='h-full w-8'
            draggable
            resizable
            modal
            maximizable={isMobile}
        >
            <div>{bodyTemplate()}</div>
        </Dialog>
    )
}

export default GeneralDialog