import { createContext, useContext, useEffect, useState } from "react";
import { getAllAvailable, getUserProcesses } from "../services/processes";
import { useAuth } from "../contexts/authContext";
import { AuthAccessLevels } from "../models/auth";

export const ProcessContext = createContext({});

export const ProcessesProvider = ({ children }) => {
    const {
        token,
        userAccessLevel
    } = useAuth();

    const [processes, setProcesses] = useState([]);
    const [idProcess, setIdProcess] = useState('');
    const [pulledProcess, setPulledProcess] = useState([]);
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

    const getAllNotAssignedProcesses = async () => {
        try {
            const results = await getAllAvailable();

            if(!results) throw new Error("Houve um erro ao capturar os processos não atribuidos");

            if (results?.data?.success) {
                setProcesses(results?.data?.success?.processos);
            }

            return results;
        } catch (error) {
            console.log(`Error: ` + error);
        }
    };

    const getAllMyProcesses = async () => {
        try {
            const entry = Object.values(AuthAccessLevels).find(
                level => level.id === Number(userAccessLevel)
            );

            if (entry) {
                const results = await getUserProcesses(entry?.name);

                if (results?.data?.success) {
                    setPulledProcess(results?.data?.success?.processos)
                    console.log(results?.data?.success)
                }

                return results;
            }
        } catch (error) {
            console.log(`Error: ` + error);
        }
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
        getAllNotAssignedProcesses();
    }, [token]);

    useEffect(() => {
        if (processes.length > 0) {
            sumAllValues();
        }
    }, [processes]);

    useEffect(() => {
        if (token && userAccessLevel) {
            getAllMyProcesses();
        }
    }, [token, userAccessLevel]);


    return (
        <ProcessContext.Provider
            value={{
                processes,
                pulledProcess,
                finalValue,
                searchTerm,
                expandFilters,
                filteredProcesses,
                filters,
                idProcess,
                setPulledProcess,
                setIdProcess,
                setFilters,
                setSearchTerm,
                setExpandFilters,
                setProcesses,
                setFinalValue,
                getAllNotAssignedProcesses,
                getAllMyProcesses
            }}
        >
            {children}
        </ProcessContext.Provider>
    );
};

export const useProcesses = () => {
    return useContext(ProcessContext);
};
