import { useContext, useEffect, useState } from "react"
import { ProcessesContext } from "./processesContext"
import { getAll } from "../../services/legalProcesses";
import { AuthContext } from "../auth/authContext";

export const ProcessesProvider = ({ children }) => {
    const [processes, setProcesses] = useState([]);
    const { token, userAccessLevel } = useContext(AuthContext);

    const getAllProcesses = async () => {
        try {
            const results = await getAll();
            if (results?.data?.success?.processos) {
                setProcesses(results?.data?.success?.processos);
            }
            
            console.log(results);
            return results;
        } catch (error) {
            console.log(`Error: ` + error);
        }
    }
    
    useEffect(() => {
        if (token && userAccessLevel) getAllProcesses();
    }, [token]);

    return (
        <ProcessesContext.Provider value={{
            processes,
            setProcesses,
            getAllProcesses
        }}>
            {children}
        </ProcessesContext.Provider>
    )
}