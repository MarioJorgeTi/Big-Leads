import { createContext, useContext, useEffect, useState } from "react";
import { getAllAvailable } from "../services/processes";
import { StatusMap } from "../models/processes";
import { useAuth } from "../contexts/authContext";

export const ProcessContext = createContext({});

export const ProcessesProvider = ({ children }) => {
    const {
        token,
        userAccessLevel
    } = useAuth();

    const [processes, setProcesses] = useState([]);
    const [idProcess, setIdProcess] = useState('');
    const [finalValue, setFinalValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandFilters, setExpandFilters] = useState(false);
    const [filters, setFilters] = useState({
        numero_processo: '',
        data_autuacao: '',
        ultima_distribuicao: '',
        estado: '',
        status: ''
    });

    const filteredProcesses = processes.filter((process) => {
        const matchSearchTerm = searchTerm.trim() === '' ||
            process.numero_processo?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchFilters =
            (!filters.numero_processo || process.numero_processo?.includes(filters.numero_processo)) &&
            (!filters.data_autuacao || process.data_autuacao === filters.data_autuacao) &&
            (!filters.ultima_distribuicao || process.ultima_distribuicao === filters.ultima_distribuicao) &&
            (!filters.estado || process.estado === filters.estado) &&
            (!filters.status || process.status === filters.status);

        return matchSearchTerm && matchFilters;
    });

    const getAllProcesses = async () => {
        try {
            const results = await getAllAvailable();
            if (results?.data?.success?.processos) {
                setProcesses(results?.data?.success?.processos);
            }
            return results;
        } catch (error) {
            console.log(`Error: ` + error);
        }
    };

    const RenderStatusIcon = (status) => {
        return StatusMap[status] || null;
    };

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
    }, [processes]);

    useEffect(() => {
        if (token && userAccessLevel) {
            getAllProcesses();
        }
    }, [token]);

    return (
        <ProcessContext.Provider
            value={{
                processes,
                finalValue,
                searchTerm,
                expandFilters,
                filteredProcesses,
                filters,
                idProcess,
                setIdProcess,
                setFilters,
                setSearchTerm,
                setExpandFilters,
                RenderStatusIcon,
                setProcesses,
                getAllProcesses
            }}
        >
            {children}
        </ProcessContext.Provider>
    );
};

export const useProcesses = () => {
    return useContext(ProcessContext);
};
