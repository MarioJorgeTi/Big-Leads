import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import { Divider } from 'primereact/divider';
import { BiSolidExit } from "react-icons/bi";
import { usarLogout } from "../../componentes/Logout";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";

const LayoutHeaderVendedor = () => {
  const op = useRef(null);
  const [usuarioInfo, setUsuarioInfo] = useState({ nome: "", email: "", cpf_cnpj: "" });
  const [carregando, setCarregando] = useState(false);
  const { logout, ToastComponent } = usarLogout();

  const pegarUsuarioInfo = () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario")) || {};
    setUsuarioInfo(usuario);
  };

  const comportamentoLogout = async () => {
    setCarregando(true);
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setCarregando(false);
      }, 2000)
    }
  }

  useEffect(() => {
    pegarUsuarioInfo();
  }, []);

  return (
    <header
      className="w-full flex align-items-center p-2 justify-content-end"
      style={{ background: "var(--surface-200)" }}
    >
      <Button
        className="px-3 py-1 flex gap-3 text-primary"
        text
        rounded
        onClick={(e) => op.current.toggle(e)}
      >
        <p className="font-bold my-0">Bem vindo, {usuarioInfo.nome}!</p>
        <Avatar shape="circle">
          {usuarioInfo.nome ? usuarioInfo.nome.charAt(0).toUpperCase() : "?"}
        </Avatar>
      </Button>

      <OverlayPanel
        ref={op}
        closeOnEscape
        dismissable
        className="flex flex-column align-items-center justify-content-center text-center w-19rem"
      >
        <div className="flex justify-content-center align-items-center mb-3">
          <Avatar shape="circle" size="xlarge">
            {usuarioInfo.nome ? usuarioInfo.nome.charAt(0).toUpperCase() : "?"}
          </Avatar>
        </div>
        <div className="flex flex-column row-gap-3">
          <p className="py-0 my-0">{usuarioInfo.nome}</p>
          <p className="py-0 my-0">E-mail: {usuarioInfo.email}</p>
          <p className="py-0 my-0">CPF/CNPJ: {usuarioInfo.cpf_cnpj}</p>
        </div>
        <Divider />
        <div className="w-full p-2 flex gap-2 align-items-center justify-content-center" onClick={comportamentoLogout}>
          <BiSolidExit size={25} />
          <p>Sair</p>
        </div>
      </OverlayPanel>
      <BlockUI blocked={carregando} fullScreen template={<ProgressSpinner style={{ width: '80px', height: '80px' }} strokeWidth="4" />} />
      <ToastComponent />
    </header>
  );
};

export default LayoutHeaderVendedor;