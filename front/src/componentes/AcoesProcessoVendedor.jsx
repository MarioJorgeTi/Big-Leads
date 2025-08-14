import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { BiUserPlus, BiEdit, BiFile, BiSend } from "react-icons/bi";
import LerVendedores from "./LerVendedores";
import api from "../servicos/api";

export function useAcoesProcessoVendedor(processo) {
  const toastRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);

  const atribuirProcessoUsuario = async (idUsuario) => {
    try {
      const response = await api.post(`/vendedor/processo/atribuir/${processo.id}/${idUsuario}`, {});
      toastRef.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: response.data.success.mensagem,
        life: 4000,
      });
      setShowDialog(false);
    } catch (error) {
      const response = error.response?.data;
      if (response?.errors) {
        Object.values(response.errors).forEach((msg) => {
          toastRef.current.show({
            severity: "error",
            summary: "Erro",
            detail: msg,
            life: 4000,
          });
        });
      }
    }
  };

  const atribuir = () => {
    setShowDialog(true);
  };

  const editar = () => {
    console.log("Ação 2 - Editar");
  };

  const documentos = () => {
    console.log("Ação 3 - Adicionar/Remover Documento");
  };

  const enviarParaTramit = () => {
    console.log("Ação 4 - Enviar para");
  };

  const acoes = [
    {
      label: "Atribuir",
      command: atribuir,
      icon: <BiUserPlus size={20} color="#025288" style={{ marginRight: "10px" }} />
    },
    {
      label: "Editar",
      command: editar,
      icon: <BiEdit size={20} color="#025288" style={{ marginRight: "10px" }} />
    },
    {
      label: "Documentos",
      command: documentos,
      icon: <BiFile size={20} color="#025288" style={{ marginRight: "10px" }} />
    },
    {
      label: "Enviar para Tramit",
      command: enviarParaTramit,
      icon: <BiSend size={20} color="#025288" style={{ marginRight: "10px" }} />
    },
  ];

  const uiExtras = (
    <>
      <Toast ref={toastRef} />
      <Dialog
        header="Atribuir processo"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: "30vw" }}
      >
        <LerVendedores onSelecionar={atribuirProcessoUsuario} />
      </Dialog>
    </>
  );

  return [acoes, uiExtras];
}
