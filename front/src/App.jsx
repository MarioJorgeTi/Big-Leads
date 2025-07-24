import "primereact/resources/themes/lara-light-cyan/theme.css";
import Routes from './routes/routes'
import { GlobalProvider } from './contexts/global/globalProvider'
import { AuthProvider } from './contexts/auth/authProvider'
import { PrimeReactProvider } from 'primereact/api';
import { ProcessesProvider } from "./contexts/processes/processesProvider";
import { ContractsProvider } from "./contexts/contracts/contractsProvider";

const App = () => {
  return (
    <PrimeReactProvider>
      <GlobalProvider>
        <AuthProvider>
          <ProcessesProvider>
            <ContractsProvider>
              <Routes />
            </ContractsProvider>
          </ProcessesProvider>
        </AuthProvider>
      </GlobalProvider>
    </PrimeReactProvider>
  )
}

export default App