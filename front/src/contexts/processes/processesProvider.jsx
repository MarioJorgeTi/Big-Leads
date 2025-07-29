import { useContext, useEffect, useState } from "react"
import { ProcessesContext } from "./processesContext"
import { getAll, getAllAvailable } from "../../services/legalProcesses";
import { AuthContext } from "../auth/authContext";
import { StatusMap } from "../../models/statusIcons";

export const ProcessesProvider = ({ children }) => {
    const [processes, setProcesses] = useState([]);
    const [finalValue, setFinalValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandFilters, setExpandFilters] = useState(false);

    const { token, userAccessLevel } = useContext(AuthContext);

    const getAllProcesses = async () => {
        try {
            const results = await getAllAvailable();
            if (results?.data?.success?.processos) {
                setProcesses(results?.data?.success?.processos);
            }

            console.log(results);
            return results;
        } catch (error) {
            console.log(`Error: ` + error);
        }
    }

    const RenderStatusIcon = (status) => {
        return StatusMap[status] || null;
    }

    const sumAllValues = () => {
        const total = processes.reduce((acc, processo) => {
            const rawValue = processo?.valor_causa;

            const numericValue = parseFloat(
                typeof rawValue === 'string' ? rawValue.replace(',', '.') : rawValue
            );

            return !isNaN(numericValue) ? acc + numericValue : acc;
        }, 0);

        setFinalValue(total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }));
    };


    useEffect(() => {
        if (processes.length > 0) {
            sumAllValues();
        }
    }, [processes])

    useEffect(() => {
        if (token && userAccessLevel) getAllProcesses();
    }, [token]);

    return (
        <ProcessesContext.Provider value={{
            processes,
            finalValue,
            searchTerm,
            expandFilters,
            setExpandFilters,
            setSearchTerm,
            RenderStatusIcon,
            setProcesses,
            getAllProcesses
        }}>
            {children}
        </ProcessesContext.Provider>
    )
}