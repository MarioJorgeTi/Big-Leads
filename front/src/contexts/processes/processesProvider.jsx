import { useContext, useEffect, useMemo, useState } from "react"
import { ProcessesContext } from "./processesContext"
import { getAll } from "../../services/legalProcesses";
import { AuthContext } from "../auth/authContext";

export const ProcessesProvider = ({ children }) => {
    const [processes, setProcesses] = useState([]);
    const { token, userAccessLevel } = useContext(AuthContext);

    const getAllProcesses = async () => {
        try {
            const results = await getAll();
            setProcesses(results?.data);
        } catch (error) {
            console.log(`Error: ` + error);
        }
    }
    useEffect(() => {
        if (token && userAccessLevel) getAllProcesses();
        console.log(processes)
    }, []);

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