import { Outlet } from "react-router-dom";
import { ProcessesProvider } from "../../contexts/processesContext";

const FunnelLayout = () => {
    return (
        <ProcessesProvider>
            <Outlet />
        </ProcessesProvider>
    );
}

export default FunnelLayout;
