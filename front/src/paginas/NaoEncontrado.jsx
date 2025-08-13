import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className='h-screen w-full flex flex-column justify-content-center align-items-center'>
            <h1 className='my-0' style={{ fontSize: '10rem' }}>404</h1>
            <h2 className='text-6xl mb-0'>Página não encontrada!</h2>
            <p className='text-2xl'>Ops! A página que você está procurando não existe.</p>
            <Button onClick={() => navigate('/')} className='px-3 text-primary' rounded outlined>
                Voltar para a página inicial
            </Button>
        </div>
    );
}
