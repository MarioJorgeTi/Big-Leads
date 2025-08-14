import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const RenderizarPdf = ({ base64Pdf, nomeArquivo = 'documento.pdf' }) => {

  const [pdfUrl, setPdfUrl] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!base64Pdf) return;
    const blob = base64ToBlob(base64Pdf, 'application/pdf');
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [base64Pdf]);

  const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length).fill().map((_, i) => slice.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!base64Pdf) {
    return <p>Nenhum PDF disponível.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginLeft: '16px' }}>
      <h4>{nomeArquivo}</h4>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button label="Visualizar PDF" onClick={() => setVisible(true)} className="border-none p-2" />
        <Button label="Baixar" onClick={handleDownload} className="border-none p-2" />
      </div>
      <Dialog header={nomeArquivo} visible={visible} onHide={() => setVisible(false)} style={{ width: '85vw', maxWidth: 1200, height: '90vh' }} draggable={false} blockScroll >
        {pdfUrl ? (
          <iframe src={pdfUrl} title="Visualizador de PDF" width="100%" height="100%" style={{ border: '1px solid var(--surface-border)' }} />
        ) : (
          <p>Carregando PDF…</p>
        )}
      </Dialog>
    </div>
  );
};

export default RenderizarPdf;
