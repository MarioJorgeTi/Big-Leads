import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const redirecionamentoPorNivel = {
    1: '/painel/diretor',
    2: '/painel/gerente',
    3: '/painel/vendedor',
    4: '/painel/tramit',
    5: '/painel/juridico',
    6: '/painel/negociacao',
};

const Roteador = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const usuarioSalvo = sessionStorage.getItem('usuario');
        if (!usuarioSalvo) {
            navigate('/login');
            return;
        }
        try {
            const usuario = JSON.parse(usuarioSalvo);
            const rota = redirecionamentoPorNivel[usuario.nivel_acesso];
            if (!rota) {
                navigate('/login');
                return;
            }
            navigate(rota);
        } catch (err) {
            console.error('Erro ao processar dados do usuário:', err);
            navigate('/login');
        }
    }, [navigate]);
    return null;
};

export default Roteador;
