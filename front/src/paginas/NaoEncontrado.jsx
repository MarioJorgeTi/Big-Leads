import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{
            textAlign: 'center',
            padding: '4rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <h2>Página não encontrada</h2>
            <p>Ops! A página que você está procurando não existe.</p>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff'
                }}
            >
                Voltar para a página inicial
            </button>
        </div>
    );
}
