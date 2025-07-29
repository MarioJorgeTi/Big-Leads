import { Dialog } from 'primereact/dialog'
import React from 'react'

const GeneralDialog = ({ showDetails, closeDetails, chosedOne, template }) => {
    return (
        <Dialog
            visible={showDetails}
            onHide={closeDetails}
            position='right'
            className='h-screen w-6'
            draggable
            resizable
        >
            <div>{template()}</div>
        </Dialog>
    )
}

export default GeneralDialog