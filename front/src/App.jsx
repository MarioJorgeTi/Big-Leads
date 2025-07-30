import "primereact/resources/themes/lara-light-cyan/theme.css";
import Routes from './routes/routes'
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from './contexts/authContext'
import { GlobalProvider } from './contexts/globalContext'
import { ProcessesProvider } from "./contexts/processesContext";
import { ContractsProvider } from "./contexts/contractsContext";

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