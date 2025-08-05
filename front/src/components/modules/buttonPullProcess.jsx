import { Button } from 'primereact/button';
import { RiFileDownloadFill } from 'react-icons/ri';
import { getProcessAvailable } from '../../services/processes';
import { useProcesses } from '../../contexts/processesContext';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';

const ButtonPullProcess = ({ idProcess }) => {
    const [loading, setLoading] = useState('');
    const { setPulledProcess } = useProcesses();
    const toastRef = useRef();

    const pullProcess = async (id) => {
        setLoading(true);
        try {
            const results = await getProcessAvailable(id);

            if (results?.data?.success) {
                setPulledProcess(results?.data?.success?.processo);
                toastRef.current.show({
                    severity: 'success',
                    summary: 'Lead Resgatado',
                    detail: results?.data?.success?.mensagem
                });
            }

            return results;
        } catch (error) {
            toastRef.current.show({
                severity: 'error',
                summary: 'Lead Não Resgatado',
                detail: error?.response?.data?.errors?.processo
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                rounded
                outlined
                icon={() => <RiFileDownloadFill size={25} />}
                style={{ color: 'var(--primary-color)' }}
                onClick={() => pullProcess(idProcess)}
                disabled={loading}
            />
            <Toast ref={toastRef} />
        </>
    );
};

export default ButtonPullProcess;