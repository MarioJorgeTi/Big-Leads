import { Outlet } from 'react-router-dom';
import { ContractsProvider } from '../../contexts/contractsContext';

const ContractsLayout = () => {
    return (
        <ContractsProvider>
            <Outlet />
        </ContractsProvider>
    );
}

export default ContractsLayout;
