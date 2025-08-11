import { Routes, Route } from 'react-router-dom';
import Login from '../paginas/Login'
import NaoAutorizado from '../paginas/NaoAutorizado'
import NaoEncontrado from '../paginas/NaoEncontrado'
import Roteador from './Roteador';
import PainelDiretor from '../paginas/diretor/PainelDiretor'
import PainelGerente from '../paginas/gerente/PainelGerente'
import PainelVendedor from '../paginas/vendedor/PainelVendedor'
import PainelTramit from '../paginas/tramit/PainelTramit'
import PainelJuridico from '../paginas/juridico/PainelJuridico'
import PainelNegociacao from '../paginas/negociacao/PainelNegociacao'
import ContratosVendedor from '../paginas/vendedor/ContratosVendedor';
import MeusProcessosVendedor from '../paginas/vendedor/MeusProcessosVendedor';
import RotaPrivada from './RotaPrivada';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/roteador" element={<Roteador />} />

      <Route path="*" element={<NaoEncontrado />} />

      <Route path="/nao-autorizado" element={<NaoAutorizado />} />

      <Route element={<RotaPrivada niveisPermitidos={[1]} />}>
        <Route path="/painel/diretor" element={<PainelDiretor />} />
      </Route>

      <Route element={<RotaPrivada niveisPermitidos={[2]} />}>
        <Route path="/painel/gerente" element={<PainelGerente />} />
      </Route>

      <Route element={<RotaPrivada niveisPermitidos={[3]} />}>
        <Route path="/painel/vendedor" element={<PainelVendedor />} />
        <Route path="/painel/vendedor/leads" element={<MeusProcessosVendedor />} />
        <Route path="/painel/vendedor/contratos" element={<ContratosVendedor />} />
      </Route>

      <Route element={<RotaPrivada niveisPermitidos={[4]} />}>
        <Route path="/painel/tramit" element={<PainelTramit />} />
      </Route>

      <Route element={<RotaPrivada niveisPermitidos={[5]} />}>
        <Route path="/painel/juridico" element={<PainelJuridico />} />
      </Route>

      <Route element={<RotaPrivada niveisPermitidos={[6]} />}>
        <Route path="/painel/negociacao" element={<PainelNegociacao />} />
      </Route>

    </Routes>
  );
}
