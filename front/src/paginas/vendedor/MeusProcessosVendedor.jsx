import { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
import api from "../../servicos/api";
import LayoutPainelVendedor from "../../layouts/vendedor/LayoutPainelVendedor";
import Kanban from '../../componentes/Kanban';
import Funis from "../../componentes/Funis";
import Filtros from "../../componentes/Filtros.jsx";
import { filtrarProcessos } from "../../utilitarios/funcoes.js";

const MeusProcessosVendedor = () => {
    const [carregando, setcarregando] = useState(false);
    const [processos, setProcessos] = useState([]);
    const [filtros, setFiltros] = useState({ data: null, classe: null, estado: null, status: null, valor: null });
    const toastRef = useRef(null);

    const pegarProcessosVendedor = async () => {
        setcarregando(true);
        try {
            const resposta = await api.get('/vendedor/processos/usuario');
            const mensagem = resposta.data.success.mensagem;
            setProcessos(resposta.data.success.processos);
            toastRef.current.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: mensagem,
                life: 3000,
            });
        } catch (error) {
            console.log(error);
            const resposta = error.response.data;
            if (resposta.errors) {
                Object.values(resposta.errors).forEach((msg) => {
                    toastRef.current.show({
                        severity: 'error',
                        summary: 'Erro de Validação',
                        detail: msg,
                        life: 4000,
                    });
                });
            }
        } finally {
            setcarregando(false);
        }
    }

    useEffect(() => {
        pegarProcessosVendedor();
    }, []);

    const funnelOptions = [
        { label: 'Comercial', value: 'comercial' },
        { label: 'Tramit', value: 'tramit' },
        { label: 'Juridico', value: 'juridico' },
        { label: 'Negociação', value: 'negociacao' },
    ];

    const [selectedFunnel, setSelectedFunnel] = useState(funnelOptions[0].value);

    const processosFiltrados = filtrarProcessos(processos, filtros);

    return (
        <LayoutPainelVendedor>
            <div className=" flex justify-content-between align-items-center">
                <div className='px-3'>
                    <h1 className="text-6xl my-0">Meus Leads</h1>
                    <Funis funilOpcoes={funnelOptions} funilSelecionado={selectedFunnel} onChange={setSelectedFunnel} />
                </div>
                <div>
                    <Filtros filtros={filtros} setFiltros={setFiltros} />
                </div>
            </div>
            <div className='px-3'>
                <Kanban dados={processosFiltrados} funilAtual={selectedFunnel} isLoading={carregando} />
            </div>
            <Toast ref={toastRef} />
        </LayoutPainelVendedor>
    )
};

export default MeusProcessosVendedor;
