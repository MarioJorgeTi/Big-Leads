import { Navigate, Outlet } from 'react-router-dom';

export default function RotaPrivada({ niveisPermitidos }) {
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  if (!usuario) {
    return <Navigate to="/" />;
  }
  if (!niveisPermitidos.includes(usuario.nivel_acesso)) {
    return <Navigate to="/nao-autorizado" />;
  }
  return <Outlet />;
}
