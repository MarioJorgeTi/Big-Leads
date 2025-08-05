import { Dialog } from 'primereact/dialog'
import '../../assets/css/generalDialog.css'
import { useGlobal } from '../../contexts/globalContext'

const GeneralDialog = ({ showDetails, closeDetails, isFullScreen = false, headerTemplate, bodyTemplate }) => {
    const { isMobile } = useGlobal();

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
            maximizable={isMobile || isFullScreen}
        >
            <div>{bodyTemplate()}</div>
        </Dialog>
    )
}

export default GeneralDialog