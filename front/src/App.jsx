import "primereact/resources/themes/lara-light-cyan/theme.css";
import Routes from './routes/routes'
import { GlobalProvider } from './contexts/global/globalProvider'
import { AuthProvider } from './contexts/auth/authProvider'
import { PrimeReactProvider } from 'primereact/api';
import { ProcessesProvider } from "./contexts/processes/processesProvider";

const App = () => {
  return (
    <PrimeReactProvider>
      <GlobalProvider>
        <AuthProvider>
          <ProcessesProvider>
            <Routes />
          </ProcessesProvider>
        </AuthProvider>
      </GlobalProvider>
    </PrimeReactProvider>
  )
}

export default App