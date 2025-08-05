import "primereact/resources/themes/lara-light-cyan/theme.css";
import Routes from './routes/routes'
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from './contexts/authContext'
import { GlobalProvider } from './contexts/globalContext'
import { ContractsProvider } from "./contexts/contractsContext";

const App = () => {
  return (
    <PrimeReactProvider>
      <GlobalProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </GlobalProvider>
    </PrimeReactProvider>
  )
}

export default App