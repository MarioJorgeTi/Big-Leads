import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog'; 
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from "../servicos/api";

export default function ProcessoDetalhes({ idProcesso, visible, onHide }) {
  const [processo, setProcesso] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const lerProcesso = async () => {
    try {
      setCarregando(true);
      const res = await api.get(`/vendedor/processo/${idProcesso}`);
      setProcesso(res.data.success.processo);
    } catch (err) {
      console.log(err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(()=>{
    if(visible){
      lerProcesso()
    }
  },[visible])

  return (
    <Dialog header="Detalhes do Processo" visible={visible} onHide={onHide} style={{ width: '80vw' }} breakpoints={{ '960px': '95vw', '640px': '100vw' }}>
      {carregando ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <ProgressSpinner />
        </div>
      ) : processo ? (
        <Card title={`Processo nº: ${processo.numero_processo}`} subTitle={processo.classe_judicial} className="shadow-none">
          <div className="formgrid grid ml-2">
            <div className="col-12 md:col-6">
              <p><b>Órgão julgador:</b> {processo.orgao_julgador}</p>
            </div>
            <div className="col-12 md:col-3">
              <p><b>Data autuação:</b> {processo.data_autuacao}</p>
            </div>
            <div className="col-12 md:col-3">
              <p><b>Última distribuição:</b> {processo.ultima_distribuicao}</p>
            </div>
            <div className="col-12 md:col-4">
              <p><b>Valor da causa:</b> R$ {Number(processo.valor_causa).toLocaleString('pt-BR')}</p>
            </div>
            <div className="col-12 md:col-4">
              <p><b>Estado:</b> {processo.estado}</p>
            </div>
            <div className="col-12 md:col-4">
              <p><b>Prioridade:</b> <Tag value={processo.prioridade} severity={processo.prioridade === "alta" ? "danger" : "info"} /></p>
            </div>
            <div className="col-12">
              <p><b>Assunto:</b> {processo.assunto}</p>
            </div>
            <div className="col-12">
              <p><b>Resumo:</b> {processo.resumo}</p>
            </div>
          </div>
          <Divider />
          <h3>Polo Ativo</h3>
          {processo.polos_ativos?.map((polo, idx) => (
            <p className="ml-3" key={idx}>
              <b>{polo.nome}</b> – {polo.cpf_cnpj}
            </p>
          ))}
          <Divider />
          <h3>Polo Passivo</h3>
          {processo.polos_passivos?.map((polo, idx) => (
            <div key={idx} className="mb-3 ml-3">
              <p><b>{polo.nome}</b> – {polo.cpf_cnpj}</p>
              <h5>Telefones</h5>
              <DataTable value={polo.telefones || []} size="small" stripedRows>
                <Column field="tipo" header="Tipo" />
                <Column field="numero" header="Número" />
              </DataTable>
              <h5>Emails</h5>
              <ul>
                {polo.emails?.map((email, eidx) => <li key={eidx}>{email.endereco}</li>)}
              </ul>
            </div>
          ))}
        </Card>
      ) : (
        <p style={{ textAlign: 'center' }}>Nenhum processo encontrado.</p>
      )}
    </Dialog>
  );
}
