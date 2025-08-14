import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FaFilter } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { classesJudiciais, estados, statusOpcoes } from "../utilitarios/opcoes";

const Filtros = ({ filtros, setFiltros }) => {
    const [abrirFiltros, setAbrirFiltros] = useState(false);

    const estadosModel = estados.map((estado) => ({ label: estado, value: estado }));
    const classesJudiciaisModel = classesJudiciais.map((classeJudicial) => ({ label: classeJudicial, value: classeJudicial }));
    const status = statusOpcoes.map((statusOpcao) => ({ label: statusOpcao, value: statusOpcao }));

    const limparFiltros = () => {
        setFiltros({ data: null, classe: null, estado: null, status: null, valorMinimo: null, valorMaximo: null, numero_processo: '' });
    };

    return (
        <>
            <Button
                rounded
                outlined
                icon={() => <FaFilter size={20} />}
                onClick={() => setAbrirFiltros(true)}
                className="text-primary"
            />
            <Sidebar
                position="right"
                visible={abrirFiltros}
                onHide={() => setAbrirFiltros(false)}
                className="p-sidebar-md"
                header='Filtros'
            >
                <div className="flex flex-column gap-3">
                    <InputText
                        value={filtros.numero_processo}
                        onChange={(e) => setFiltros({ ...filtros, numero_processo: e.target.value })}
                        placeholder="Número do Processo"
                        className="w-full"
                    />
                    <Calendar
                        value={filtros.data}
                        onChange={(e) => setFiltros({ ...filtros, data: e.value })}
                        placeholder="Data de Autuação"
                        dateFormat="dd/mm/yy"
                        className="w-full"
                    />
                    <Dropdown
                        value={filtros.classe}
                        options={classesJudiciaisModel}
                        onChange={(e) => setFiltros({ ...filtros, classe: e.value })}
                        placeholder="Classe Judicial"
                        className="w-full"
                    />
                    <Dropdown
                        value={filtros.estado}
                        options={estadosModel}
                        onChange={(e) => setFiltros({ ...filtros, estado: e.value })}
                        placeholder="Estado"
                        className="w-full"
                    />
                    <Dropdown
                        value={filtros.status}
                        options={status}
                        onChange={(e) => setFiltros({ ...filtros, status: e.value })}
                        placeholder="Status"
                        className="w-full"
                    />
                    <div className="flex gap-2">
                        <InputNumber
                            value={filtros.valorMinimo}
                            onValueChange={(e) => setFiltros({ ...filtros, valorMinimo: e.value })}
                            placeholder="Valor mínimo"
                            mode="currency"
                            currency="BRL"
                            locale="pt-BR"
                            className="w-full"
                        />
                        <InputNumber
                            value={filtros.valorMaximo}
                            onValueChange={(e) => setFiltros({ ...filtros, valorMaximo: e.value })}
                            placeholder="Valor máximo"
                            mode="currency"
                            currency="BRL"
                            locale="pt-BR"
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex gap-3 justify-content-between mt-4">
                    <Button
                        label="Limpar"
                        severity="secondary"
                        outlined
                        onClick={limparFiltros}
                        className="w-6"
                    />
                    <Button
                        label="Aplicar"
                        icon="pi pi-check"
                        onClick={() => setAbrirFiltros(false)}
                        className="w-6 px-3 border-none"
                        style={{ background: 'var(--primary-color)' }}
                    />
                </div>
            </Sidebar>
        </>
    );
};

export default Filtros;