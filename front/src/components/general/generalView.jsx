import { useState, useMemo } from 'react';
import { DataView } from 'primereact/dataview';
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Button } from 'primereact/button';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/generalView.css';
import { useProcesses } from '../../contexts/processes/processesContext';

const GeneralView = () => {
    const { processes } = useProcesses();
    const [expandedProcess, setExpandedProcess] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(1); // 1 asc, -1 desc

    const rowsPerPage = 5;

    const toggleDetails = (processId) => {
        setExpandedProcess(prev => (prev === processId ? null : processId));
    };

    const getFieldValue = (item, field) => {
        switch (field) {
            case 'nome':
                return item.polo_passivo?.[0]?.nome || '';
            default:
                return item[field] ?? '';
        }
    };

    const sortedProcesses = useMemo(() => {
        if (!sortField) return processes;

        return [...processes].sort((a, b) => {
            const aVal = getFieldValue(a, sortField);
            const bVal = getFieldValue(b, sortField);

            if (typeof aVal === 'string') {
                return aVal.localeCompare(bVal) * sortOrder;
            }

            if (typeof aVal === 'number') {
                return (aVal - bVal) * sortOrder;
            }

            return 0;
        });
    }, [processes, sortField, sortOrder]);

    const paginatedProcesses = sortedProcesses.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage
    );

    const handleSort = (field) => {
        if (sortField === field) {
            if (sortOrder === 1) {
                setSortOrder(-1);
            } else if (sortOrder === -1) {
                setSortField(null);
                setSortOrder(1);
            }
        } else {
            setSortField(field);
            setSortOrder(1);
        }
    };

    const renderSortIcon = (field) => {
        if (sortField !== field) return null;
        return sortOrder === 1 ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />;
    };

    const itemTemplate = (item, index, visibleItems) => {
        const isExpanded = expandedProcess === item.numero_processo;

        if (expandedProcess && !isExpanded) {
            const expandedIndex = visibleItems.findIndex(p => p.numero_processo === expandedProcess);
            const indexesToHide = [expandedIndex + 1, expandedIndex + 2];
            if (indexesToHide.includes(index)) return null;
        }

        return (
            <div className='w-full' key={item.numero_processo}>
                <div className='bg-white grid row p-1 my-1 border-round-3xl align-items-center' onClick={() => toggleDetails(item.numero_processo)}>
                    <div className='col-2 flex justify-content-center'>{item.polo_passivo?.[0]?.nome}</div>
                    <div className='col-2 flex justify-content-center'>{item.numero_processo}</div>
                    <div className='col-1 flex justify-content-center pr-4'>R${item.valor_causa}</div>
                    <div className='col-2 flex justify-content-center'>{item.classe_judicial}</div>
                    <div className='col-2 flex justify-content-center'>{item.data_autuacao}</div>
                    <div className='col-2 flex justify-content-center'>{item.orgao_julgador}</div>
                    <div className='col-1 flex justify-content-center'>
                        <Button
                            icon={() => isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                            onClick={() => toggleDetails(item.numero_processo)}
                            rounded
                            outlined
                            className="p-outlined button-menu bg-primary"
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white w-full h-17rem p-2 border-round-3xl flex gap-4 mb-3"
                        >
                            <div className='flex flex-column bg-details p-3 border-round-xl row-gap-2 overflow-auto'>
                                <div><strong>Assunto:</strong> {item.assunto}</div>
                                <div><strong>Última Distribuição:</strong> {item.ultima_distribuicao}</div>
                                <div><strong>Cargo Judicial:</strong> {item.cargo_judicial || "Sem descrição disponível"}</div>
                                <div><strong>Segredo de Justiça?</strong> {(item.segredo_justica === 0) ? 'Não' : 'Sim'}</div>
                                <div><strong>Justiça Gratuita?</strong> {(item.justica_gratuita === 0) ? 'Não' : 'Sim'}</div>
                                <div><strong>Tutela Liminar?</strong> {(item.tutela_liminar === 0) ? 'Não' : 'Sim'}</div>
                                <div><strong>Prioridade:</strong> {item.prioridade}</div>
                            </div>

                            <div className='flex flex-column bg-details p-3 border-round-xl row-gap-2 overflow-auto'>
                                <div><h3>Polo Ativo:</h3></div>
                                {item.polo_ativo.map((poloativo, i) => (
                                    <div key={i}>
                                        <div><strong>Nome:</strong> {poloativo.nome}</div>
                                        <div><strong>CPF/CNPJ:</strong> {poloativo.cpf_cnpj}</div>
                                        <hr />
                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-column bg-details p-3 border-round-xl row-gap-2 overflow-auto'>
                                <div><h3>Polo Passivo:</h3></div>
                                {item.polo_passivo.map((polopassivo, i) => (
                                    <div key={i}>
                                        <div><strong>Nome:</strong> {polopassivo.nome}</div>
                                        <div><strong>CPF/CNPJ:</strong> {polopassivo.cpf_cnpj}</div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const listTemplate = () => {
        if (!paginatedProcesses || paginatedProcesses.length === 0) return null;

        return (
            <div>
                <div className='bg-white grid border-round-3xl p-2 align-items-center'>
                    <div className='col-2 flex justify-content-center cursor-pointer' onClick={() => handleSort('nome')}>
                        <span className="flex align-items-center">Nome {renderSortIcon('nome')}</span>
                    </div>
                    <div className='col-2 flex justify-content-center cursor-pointer' onClick={() => handleSort('numero_processo')}>
                        <span className="flex align-items-center">Número {renderSortIcon('numero_processo')}</span>
                    </div>
                    <div className='col-1 flex justify-content-center cursor-pointer' onClick={() => handleSort('valor_causa')}>
                        <span className="flex align-items-center">Montante {renderSortIcon('valor_causa')}</span>
                    </div>
                    <div className='col-2 flex justify-content-center cursor-pointer' onClick={() => handleSort('classe_judicial')}>
                        <span className="flex align-items-center">Classe {renderSortIcon('classe_judicial')}</span>
                    </div>
                    <div className='col-2 flex justify-content-center cursor-pointer' onClick={() => handleSort('data_autuacao')}>
                        <span className="flex align-items-center">Autuação {renderSortIcon('data_autuacao')}</span>
                    </div>
                    <div className='col-2 flex justify-content-center cursor-pointer' onClick={() => handleSort('orgao_julgador')}>
                        <span className="flex align-items-center">Órgão {renderSortIcon('orgao_julgador')}</span>
                    </div>
                    <div className='col-1 flex justify-content-center'>
                        <p>Detalhes</p>
                    </div>
                </div>

                {paginatedProcesses.map((item, index) =>
                    itemTemplate(item, index, paginatedProcesses)
                )}
            </div>
        );
    };

    return (
        <div className='p-2 view-container'>
            <DataView
                value={processes}
                listTemplate={listTemplate}
                paginator
                rows={rowsPerPage}
                first={currentPage * rowsPerPage}
                onPage={(e) => {
                    setCurrentPage(e.page);
                    setExpandedProcess(null);
                }}
                className='text-primary '
            />
        </div>
    );
};

export default GeneralView;
