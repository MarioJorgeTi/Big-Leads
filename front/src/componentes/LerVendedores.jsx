import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import api from "../servicos/api";

const LerVendedores = ({ onSelecionar }) => {
  const [vendedores, setVendedores] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const ler = async () => {
      try {
        const { data } = await api.get("/vendedor/vendedores");
        setVendedores(data.success.vendedores);
      } catch (error) {
        console.error("Erro ao carregar vendedores:", error);
      } finally {
        setCarregando(false);
      }
    };
    ler();
  }, []);

  if (carregando) {
    return (
      <div className="flex justify-content-center align-items-center p-4">
        <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="4" />
      </div>
    );
  }

  return (
    <div className="flex flex-column gap-3">
      <Dropdown
        value={selecionado}
        onChange={(e) => setSelecionado(e.value)}
        options={vendedores.map((v) => ({
          label: v.nome,
          value: v.id
        }))}
        placeholder="Selecione um vendedor"
        className="w-full"
      />
      <Button
        label="Atribuir"
        onClick={() => onSelecionar(selecionado)}
        disabled={!selecionado}
        className="w-full"
      />
    </div>
  );
};

export default LerVendedores;
