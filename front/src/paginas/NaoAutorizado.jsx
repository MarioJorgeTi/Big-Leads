import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function UnAutorized() {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-full flex flex-column justify-content-center align-items-center'>
      <h1 className='my-0' style={{ fontSize: '10rem', color: 'var(--red-600)' }}>401</h1>
      <h2 className='text-6xl mb-0'>Você não tem acesso a essa rota!</h2>
      <p className='text-2xl'>Ops! A página que você está procurando não está disponível para o seu nível de usuário.</p>
      <Button onClick={() => navigate('/roteador')} className='px-3 text-primary' rounded outlined>
        Voltar para o painel
      </Button>
    </div>
  );
}
