import { Button } from 'primereact/button'
import { RiFileDownloadFill } from 'react-icons/ri'
import { getProcessAvailable } from '../../services/processes'

const ButtonPullProcess = ({ idProcess }) => {    

    return (
        <Button
            rounded
            outlined
            icon={() => <RiFileDownloadFill size={25} />}
            style={{ color: 'var(--primary-color)' }}
            onClick={() => getProcessAvailable(idProcess)}
        />
    );
}

export default ButtonPullProcess