import { useEffect, useState } from "react"
import { ProcessesContext } from "./processesContext"
import { getAll } from "../../services/legalProcesses";

export const ProcessesProvider = ({ children }) => {
    const [processes, setProcesses] = useState([]);

    const getAllProcesses = async () => {
        try {
            const results = await getAll();
            setProcesses(results.data);
        } catch (error) {
            console.log(`Error: ` + error);
        }
    }

    useEffect(() => {
        getAllProcesses();
    });

    return (
        <ProcessesContext.Provider value={{
            processes
        }}>
            {children}
        </ProcessesContext.Provider>
    )
}