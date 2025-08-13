import { useState, useRef } from 'react';
import { estados, estados_civis } from '../../utilitarios/opcoes';
import { Toast } from 'primereact/toast';
import api from '../../servicos/api';
import RenderizarPdf from '../../componentes/RenderizarPdf';
import FormularioSupremo from '../../componentes/FormularioSupremo';
import '../../recursos/css/contrato.css';

const ContratoHonorario = () => {

  const [carregando, setcarregando] = useState(false);
  const [valores, setValores] = useState({});
  const [pdfBase64, setPdfBase64] = useState(null);
  const [nomePdf, setNomePdf] = useState('');
  const toastRef = useRef(null);

  const atualizarCampo = (campo, valor) => {
    setValores(prev => ({ ...prev, [campo]: valor }));
  };

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) return;
      atualizarCampo('endereco', data.logradouro || '');
      atualizarCampo('bairro', data.bairro || '');
      atualizarCampo('cidade', data.localidade || '');
      atualizarCampo('estado', data.uf || '');
      atualizarCampo('complemento', data.complemento || '');
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const gerarContratoHonorario = async (data) => {
    setcarregando(true);
    try {
      const response = await api.post('/contrato/honorario', data);
      const mensagem = response.data.success.mensagem;
      toastRef.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: mensagem,
        life: 3000,
      });
      return response;
    } catch (error) {
      const response = error.response.data;
      if (response.errors) {
        Object.values(response.errors).forEach((msg) => {
          toastRef.current.show({
            severity: 'error',
            summary: 'Erro de Validação',
            detail: msg,
            life: 4000,
          });
        });
      }
    } finally {
      setcarregando(false);
    }
  }

  const secoes = [
    {
      titulo: 'Dados do Processo',
      campos: [
        ['Número do Processo', 'numero_processo', 'text', 'numero_processo', ['12', '12', '12', '12'], null, '9999999-99.9999.9.99.9999'],
      ]
    },
    {
      titulo: ['Dados do Processo', 'anexo1'],
      campos: [
        ['Nome Completo', 'nome_completo', 'text', 'palavra', ['12', '6', '6', '6'], null],
        ['Nacionalidade', 'nacionalidade', 'text', 'requerido', ['12', '6', '6', '6'], null],
        ['Estado Civil', 'estado_civil', 'select', 'requerido', ['12', '6', '6', '6'], estados_civis],
        ['Profissão', 'profissao', 'text', 'palavra', ['12', '6', '6', '6'], null],
        ['Email', 'email', 'text', 'email', ['12', '4', '4', '4'], null],
        ['RG', 'rg', 'text', 'rg', ['12', '4', '4', '4'], null, '99.999.999-9'],
        ['CPF', 'cpf', 'text', 'cpf', ['12', '4', '4', '4'], null, '999.999.999-99'],
        ['CEP', 'cep', 'text', 'cep', ['12', '4', '4', '4'], null, '99999-999'],
        ['Endereço', 'endereco', 'text', 'palavra', ['12', '6', '6', '6'], null],
        ['Numero', 'numero', 'text', 'numero_opcional', ['12', '2', '2', '2'], null],
        ['Complemento', 'complemento', 'text', 'complemento_opcional', ['12', '3', '3', '3'], null],
        ['Bairro', 'bairro', 'text', 'palavra', ['12', '3', '3', '3'], null],
        ['Cidade', 'cidade', 'text', 'palavra', ['12', '3', '3', '3'], null],
        ['Estado', 'estado', 'select', 'requerido', ['12', '3', '3', '3'], estados],
      ]
    },
    {
      titulo: ['Serviços Contratados', 'anexo2'],
      campos: [
        ['Serviços', 'servicos', 'multi-select', 'requerido', ['12', '12', '12', '12'], ['Ação Revisional', 'Busca e Apreensão', 'Execução de Título Extrajudicial', 'Ação Monitória']],
      ]
    },
    {
      titulo: ['Condições de Pagamento', 'anexo3'],
      campos: [
        ['Entrada', 'entrada', 'currency', 'entrada', ['12', '4', '4', '4'], null],
        ['Número de parcelas', 'parcelas', 'select', 'numero', ['12', '4', '4', '4'], ['1', '2', '3', '4', '5', '6']],
        ['Honorário de Êxito ', 'honorario_exito', 'currency', 'requerido', ['12', '4', '4', '4'], null],
        ['Observação ', 'observacao', 'text', 'palavra', ['12', '6', '6', '6'], null],
      ]
    },
    {
      titulo: ['Mensalidade', 'anexo4'],
      campos: [
        ['Valor Mensal', 'valor_mensal', 'currency', 'requerido', ['12', '4', '4', '4'], null],
        ['Início da Cobrança', 'inicio_cobranca', 'date', 'requerido', ['12', '4', '4', '4'], null],
        ['Vencimento', 'vencimento', 'date', 'data', ['12', '4', '4', '4'], null],
        ['Término da Obrigação', 'termino_obrigacao', 'date', 'data', ['12', '4', '4', '4'], null],
      ]
    },
    {
      titulo: ['Dados do Contrato', 'anexo5'],
      campos: [
        ['Local', 'local', 'text', 'requerido', ['12', '4', '4', '4'], null],
        ['Data', 'contrato_data', 'date', 'data', ['12', '4', '4', '4'], null],
        ['Contratante', 'contratante', 'text', 'palavra', ['12', '4', '4', '4'], null],
        ['Contratado', 'contratado', 'text', 'palavra', ['12', '4', '4', '4'], null],
        ['OAB do Contratado', 'oab_contratado', 'text', 'oab', ['12', '4', '4', '4'], null],
      ]
    },
    {
      titulo: ['Testemunhas', 'anexo6'],
      campos: [
        ['Testemunha 1 - Nome', 'testemunha1_nome', 'text', 'palavra', ['12', '6', '6', '6'], null],
        ['Testemunha 1 - CPF', 'testemunha1_cpf', 'text', 'cpf', ['12', '6', '6', '6'], null, '999.999.999-99'],
        ['Testemunha 2 - Nome', 'testemunha2_nome', 'text', 'palavra', ['12', '6', '6', '6'], null],
        ['Testemunha 2 - CPF', 'testemunha2_cpf', 'text', 'cpf', ['12', '6', '6', '6'], null, '999.999.999-99'],
      ]
    }
  ];

  return (
    <>
      {!pdfBase64 && (
        <FormularioSupremo
          secoes={secoes}
          valoresIniciais={valores}
          onChangeCampo={(campo, valor) => {
            setValores(prev => ({ ...prev, [campo]: valor }));
            if (campo === 'cep') {
              buscarCep(valor);
            }
          }}
          onSubmit={(data) => gerarContratoHonorario(data)}
          onResult={(resposta) => {
            const pdf = resposta.data.success.pdf;
            const nomeArquivo = resposta.data.success.nome_arquivo;
            setPdfBase64(pdf);
            setNomePdf(nomeArquivo);
          }}
          textoButao='Gerar Contrato'
          carregando={carregando}
        />
      )}
      {pdfBase64 && (
        <div className="mt-5">
          <h3>Visualização do Documento Gerado</h3>
          <RenderizarPdf base64Pdf={pdfBase64} nomeArquivo={nomePdf} />
        </div>
      )}
      <Toast ref={toastRef} />
    </>
  );
}

export default ContratoHonorario;