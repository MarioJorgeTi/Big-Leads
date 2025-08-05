import { useFormik, getIn } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { createFeesContract } from '../../../services/contracts';
import { Divider } from 'primereact/divider';
import { applyRule } from '../../../utils/rules';
import { estados, estado_civil } from '../../../models/utils'
import '../../../assets/css/feesform.css';

// encapsular os inputs e erros o mais tarde possivel

const tiposServicos = [
  { tipo: 'Ação Revisional', descricao: 'Propositura de ação revisional de contrato bancário com pedido de revisão de juros abusivos.' },
  { tipo: 'Busca e Apreensão', descricao: 'Apresentação de defesa em ação de busca e apreensão.' },
  { tipo: 'Execução de Título Extrajudicial', descricao: 'Embargos à Execução. Exceção de Pré-Executividade.' },
  { tipo: 'Ação Monitória', descricao: 'Apresentar os embargos à ação monitória.' },
  { tipo: 'Ação de Despejo', descricao: 'Apresentar a contestação cabível.' },
];

const estadoCivil = estado_civil.map(e => ({ label: e, value: e }));

const FeesForm = () => {
  const formik = useFormik({

    initialValues: {

      numero_processo: '',

      anexo1: {
        nome_completo: '',
        nacionalidade: '',
        estado_civil: '',
        profissao: '',
        rg: '',
        cpf: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        numero: '',
        complemento: '',
        email: '',
      },

      anexo2: [],

      anexo3: {
        entrada: '',
        parcelas: '',
        data_pagamento: '',
        honorario_exito: '',
        condicao_honorario_exito: '',
        observacao: ''
      },

      anexo4: {
        valor_mensal: '',
        inicio_cobranca: '',
        vencimento: '',
        desconto: '',
        termino_obrigacao: ''
      },

      anexo5: {
        local: '',
        data: null,
        contratante: '',
        contratado: '',
        oab_contratado: '',
        testemunhas: [
          { nome: '', cpf: '' },
          { nome: '', cpf: '' }
        ]
      },

    },
    validate: (values) => {
      const errors = {};
      applyRule('numero_processo', 'numero_processo', values, errors);

      applyRule('anexo1.nome_completo', 'string', values, errors);
      applyRule('anexo1.nacionalidade', 'required', values, errors);
      applyRule('anexo1.estado_civil', 'required', values, errors);
      applyRule('anexo1.profissao', 'string', values, errors);
      applyRule('anexo1.rg', 'required', values, errors);
      applyRule('anexo1.cpf', 'cpf', values, errors);
      applyRule('anexo1.endereco', 'string', values, errors);
      applyRule('anexo1.bairro', 'string', values, errors);
      applyRule('anexo1.cidade', 'string', values, errors);
      applyRule('anexo1.estado', 'uf', values, errors);
      applyRule('anexo1.cep', 'cep', values, errors);
      applyRule('anexo1.numero', 'string', values, errors);
      applyRule('anexo1.complemento', 'string', values, errors);
      applyRule('anexo1.email', 'email', values, errors);

      applyRule('anexo3.entrada', 'required', values, errors);
      applyRule('anexo3.parcelas', 'required', values, errors);
      applyRule('anexo3.data_pagamento', 'required', values, errors);
      applyRule('anexo3.honorario_exito', 'required', values, errors);
      applyRule('anexo3.condicao_honorario_exito', 'required', values, errors);
      applyRule('anexo3.observacao', 'string', values, errors);

      applyRule('anexo4.valor_mensal', 'required', values, errors);
      applyRule('anexo4.inicio_cobranca', 'required', values, errors);
      applyRule('anexo4.vencimento', 'required', values, errors);
      applyRule('anexo4.desconto', 'string', values, errors);
      applyRule('anexo4.termino_obrigacao', 'string', values, errors);

      applyRule('anexo5.local', 'required', values, errors);
      applyRule('anexo5.data', 'required', values, errors);
      applyRule('anexo5.contratante', 'required', values, errors);
      applyRule('anexo5.contratado', 'required', values, errors);
      applyRule('anexo5.oab_contratado', 'required', values, errors);

      applyRule('anexo5.testemunhas[0].nome', 'string', values, errors);
      applyRule('anexo5.testemunhas[0].cpf', 'cpf', values, errors);
      applyRule('anexo5.testemunhas[1].nome', 'string', values, errors);
      applyRule('anexo5.testemunhas[1].cpf', 'cpf', values, errors);
      return errors;
    },
    onSubmit: (values) => {
      const enderecoCompleto = `${values.endereco}, ${values.numero}, ${values.complemento}`;
      const payload = {
        ...values,
        endereco: enderecoCompleto,
      };
      console.log(payload);
      createFeesContract(payload).then(res => {
        console.log('Contrato enviado com sucesso', res);
      });
    },
  });

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) return;
      formik.setFieldValue('endereco', data.logradouro || '');
      formik.setFieldValue('bairro', data.bairro || '');
      formik.setFieldValue('cidade', data.localidade || '');
      formik.setFieldValue('estado', data.uf || '');
      formik.setFieldValue('complemento', data.complemento || '');
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-fluid grid formgrid">
      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Dados do Processo</span>
      </Divider>

      <div className="field col-12">
        <label htmlFor="numero_processo">Número do Processo</label>
        <InputText
          id="numero_processo"
          name="numero_processo"
          value={formik.values.numero_processo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.numero_processo && formik.errors.numero_processo}
        />
        {formik.touched.numero_processo && formik.errors.numero_processo && (
          <small className="p-error">{formik.errors.numero_processo}</small>
        )}
      </div>

      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Dados Pessoais</span>
      </Divider>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo1.nome_completo">Nome Completo</label>
        <InputText
          id="anexo1.nome_completo"
          name="anexo1.nome_completo"
          value={formik.values.anexo1.nome_completo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.anexo1?.nome_completo && formik.errors.anexo1?.nome_completo}
        />
        {formik.touched.anexo1?.nome_completo && formik.errors.anexo1?.nome_completo && (
          <small className="p-error">{formik.errors.anexo1?.nome_completo}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo1.nacionalidade">Nacionalidade</label>
        <InputText
          id="anexo1.nacionalidade"
          name="anexo1.nacionalidade"
          value={formik.values.anexo1.nacionalidade}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.anexo1?.nacionalidade && formik.errors.anexo1?.nacionalidade}
        />
        {formik.touched.anexo1?.nacionalidade && formik.errors.anexo1?.nacionalidade && (
          <small className="p-error">{formik.errors.anexo1.nacionalidade}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo1.estado_civil">Estado Civil</label>
        <Dropdown
          id="anexo1.estado_civil"
          name="anexo1.estado_civil"
          options={estadoCivil}
          value={formik.values.anexo1.estado_civil}
          onChange={(e) => formik.setFieldValue('anexo1.estado_civil', e.value)}
          onBlur={formik.handleBlur}
          placeholder="Selecione"
          invalid={formik.touched.anexo1?.estado_civil && formik.errors.anexo1?.estado_civil}
        />
        {formik.touched.anexo1?.estado_civil && formik.errors.anexo1?.estado_civil && (
          <small className="p-error">{formik.errors.anexo1.estado_civil}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo1.profissao">Profissão</label>
        <InputText
          id="anexo1.profissao"
          name="anexo1.profissao"
          value={formik.values.anexo1.profissao}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={formik.touched.anexo1?.profissao && formik.errors.anexo1?.profissao}
        />
        {formik.touched.anexo1?.profissao && formik.errors.anexo1?.profissao && (
          <small className="p-error">{formik.errors.anexo1.profissao}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo1.email">E-mail</label>
        <InputText
          id="anexo1.email"
          name="anexo1.email"
          value={formik.values.anexo1.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.email && formik.errors.anexo1?.email ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.email && formik.errors.anexo1?.email && (
          <small className="p-error">{formik.errors.anexo1.email}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo1.rg">RG</label>
        <InputText
          id="anexo1.rg"
          name="anexo1.rg"
          value={formik.values.anexo1.rg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.rg && formik.errors.anexo1?.rg ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.rg && formik.errors.anexo1?.rg && (
          <small className="p-error">{formik.errors.anexo1.rg}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo1.cpf">CPF</label>
        <InputText
          id="anexo1.cpf"
          name="anexo1.cpf"
          value={formik.values.anexo1.cpf}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.cpf && formik.errors.anexo1?.cpf ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.cpf && formik.errors.anexo1?.cpf && (
          <small className="p-error">{formik.errors.anexo1.cpf}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo1.cep">CEP</label>
        <InputText
          id="anexo1.cep"
          name="anexo1.cep"
          value={formik.values.anexo1.cep}
          onChange={formik.handleChange}
          onBlur={(e) => {
            formik.handleBlur(e);
            buscarCep(e.target.value);
          }}
          className={formik.touched.anexo1?.cep && formik.errors.anexo1?.cep ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.cep && formik.errors.anexo1?.cep && (
          <small className="p-error">{formik.errors.anexo1.cep}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo1.endereco">Endereço</label>
        <InputText
          id="anexo1.endereco"
          name="anexo1.endereco"
          value={formik.values.anexo1.endereco}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.endereco && formik.errors.anexo1?.endereco ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.endereco && formik.errors.anexo1?.endereco && (
          <small className="p-error">{formik.errors.anexo1.endereco}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo1.numero">Número</label>
        <InputText
          id="anexo1.numero"
          name="anexo1.numero"
          value={formik.values.anexo1.numero}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.numero && formik.errors.anexo1?.numero ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.numero && formik.errors.anexo1?.numero && (
          <small className="p-error">{formik.errors.anexo1.numero}</small>
        )}
      </div>

      <div className="field col-12 md:col-3">
        <label htmlFor="anexo1.complemento">Complemento</label>
        <InputText
          id="anexo1.complemento"
          name="anexo1.complemento"
          value={formik.values.anexo1.complemento}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.complemento && formik.errors.anexo1?.complemento ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.complemento && formik.errors.anexo1?.complemento && (
          <small className="p-error">{formik.errors.anexo1.complemento}</small>
        )}
      </div>

      <div className="field col-12 md:col-3">
        <label htmlFor="anexo1.bairro">Bairro</label>
        <InputText
          id="anexo1.bairro"
          name="anexo1.bairro"
          value={formik.values.anexo1.bairro}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.bairro && formik.errors.anexo1?.bairro ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.bairro && formik.errors.anexo1?.bairro && (
          <small className="p-error">{formik.errors.anexo1.bairro}</small>
        )}
      </div>

      <div className="field col-12 md:col-3">
        <label htmlFor="anexo1.cidade">Cidade</label>
        <InputText
          id="anexo1.cidade"
          name="anexo1.cidade"
          value={formik.values.anexo1.cidade}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo1?.cidade && formik.errors.anexo1?.cidade ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.cidade && formik.errors.anexo1?.cidade && (
          <small className="p-error">{formik.errors.anexo1.cidade}</small>
        )}
      </div>

      <div className="field col-12 md:col-3">
        <label htmlFor="anexo1.estado">Estado</label>
        <Dropdown
          id="anexo1.estado"
          name="anexo1.estado"
          options={estados}
          value={formik.values.anexo1.estado}
          onChange={(e) => formik.setFieldValue('anexo1.estado', e.value)}
          onBlur={formik.handleBlur}
          placeholder="UF"
          className={formik.touched.anexo1?.estado && formik.errors.anexo1?.estado ? 'p-invalid' : ''}
        />
        {formik.touched.anexo1?.estado && formik.errors.anexo1?.estado && (
          <small className="p-error">{formik.errors.anexo1.estado}</small>
        )}
      </div>

      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Serviços Contratados</span>
      </Divider>

      <div className="field col-12">
        <label htmlFor="servicos">Serviços</label>
        <MultiSelect
          id="servicos"
          name="servicos"
          options={tiposServicos}
          optionLabel="tipo"
          value={formik.values.anexo2}
          onChange={(e) => formik.setFieldValue('servicos', e.value)}
          onBlur={formik.handleBlur}
          placeholder="Selecione os serviços"
          display="chip"
          className={formik.touched.anexo2 && formik.errors.anexo2 ? 'p-invalid' : ''}
        />
        {formik.touched.anexo2 && formik.errors.anexo2 && (
          <small className="p-error">{formik.errors.anexo2}</small>
        )}
      </div>

      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Condições de Pagamento</span>
      </Divider>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo3.entrada">Entrada</label>
        <InputText
          id="anexo3.entrada"
          name="anexo3.entrada"
          value={formik.values.anexo3.entrada}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo3?.entrada && formik.errors.anexo3?.entrada ? 'p-invalid' : ''}
        />
        {formik.touched.anexo3?.entrada && formik.errors.anexo3?.entrada && (
          <small className="p-error">{formik.errors.anexo3.entrada}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo3.parcelas">Parcelas</label>
        <InputText
          id="anexo3.parcelas"
          name="anexo3.parcelas"
          value={formik.values.anexo3.parcelas}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo3?.parcelas && formik.errors.anexo3?.parcelas ? 'p-invalid' : ''}
        />
        {formik.touched.anexo3?.parcelas && formik.errors.anexo3?.parcelas && (
          <small className="p-error">{formik.errors.anexo3.parcelas}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo3.data_pagamento">Data Pagamento</label>
        <Calendar
          id="anexo3.data_pagamento"
          name="anexo3.data_pagamento"
          value={formik.values.anexo3.data_pagamento}
          onChange={(e) => formik.setFieldValue('anexo3.data_pagamento', e.value)}
          onBlur={formik.handleBlur}
          dateFormat="dd/mm/yy"
          showIcon
          className={formik.touched.anexo3?.data_pagamento && formik.errors.anexo3?.data_pagamento ? 'p-invalid border-none' : 'border-none'}
        />
        {formik.touched.anexo3?.data_pagamento && formik.errors.anexo3?.data_pagamento && (
          <small className="p-error">{formik.errors.anexo3.data_pagamento}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo3.honorario_exito">Honorário de Êxito</label>
        <InputText
          id="anexo3.honorario_exito"
          name="anexo3.honorario_exito"
          value={formik.values.anexo3.honorario_exito}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo3?.honorario_exito && formik.errors.anexo3?.honorario_exito ? 'p-invalid' : ''}
        />
        {formik.touched.anexo3?.honorario_exito && formik.errors.anexo3?.honorario_exito && (
          <small className="p-error">{formik.errors.anexo3.honorario_exito}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo3.condicao_honorario_exito">Condição Honorário de Êxito</label>
        <InputText
          id="anexo3.condicao_honorario_exito"
          name="anexo3.condicao_honorario_exito"
          value={formik.values.anexo3.condicao_honorario_exito}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo3?.condicao_honorario_exito && formik.errors.anexo3?.condicao_honorario_exito ? 'p-invalid' : ''}
        />
        {formik.touched.anexo3?.condicao_honorario_exito && formik.errors.anexo3?.condicao_honorario_exito && (
          <small className="p-error">{formik.errors.anexo3.condicao_honorario_exito}</small>
        )}
      </div>

      <div className="field col-12">
        <label htmlFor="anexo3.observacao">Observação</label>
        <InputText
          id="anexo3.observacao"
          name="anexo3.observacao"
          value={formik.values.anexo3.observacao}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo3?.observacao && formik.errors.anexo3?.observacao ? 'p-invalid' : ''}
        />
        {formik.touched.anexo3?.observacao && formik.errors.anexo3?.observacao && (
          <small className="p-error">{formik.errors.anexo3.observacao}</small>
        )}
      </div>

      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Mensalidade</span>
      </Divider>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo4.valor_mensal">Valor Mensal</label>
        <InputText
          id="anexo4.valor_mensal"
          name="anexo4.valor_mensal"
          value={formik.values.anexo4.valor_mensal}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo4?.valor_mensal && formik.errors.anexo4?.valor_mensal ? 'p-invalid' : ''}
        />
        {formik.touched.anexo4?.valor_mensal && formik.errors.anexo4?.valor_mensal && (
          <small className="p-error">{formik.errors.anexo4.valor_mensal}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo4.inicio_cobranca">Início da Cobrança</label>
        <Calendar
          id="anexo4.inicio_cobranca"
          name="anexo4.inicio_cobranca"
          value={formik.values.anexo4.inicio_cobranca}
          onChange={(e) => formik.setFieldValue('anexo4.inicio_cobranca', e.value)}
          onBlur={formik.handleBlur}
          dateFormat="dd/mm/yy"
          showIcon
          className={formik.touched.anexo4?.inicio_cobranca && formik.errors.anexo4?.inicio_cobranca ? 'p-invalid border-none' : 'border-none'}
        />
        {formik.touched.anexo4?.inicio_cobranca && formik.errors.anexo4?.inicio_cobranca && (
          <small className="p-error">{formik.errors.anexo4.inicio_cobranca}</small>
        )}
      </div>

      <div className="field col-12 md:col-4">
        <label htmlFor="anexo4.vencimento">Vencimento</label>
        <InputText
          id="anexo4.vencimento"
          name="anexo4.vencimento"
          value={formik.values.anexo4.vencimento}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo4?.vencimento && formik.errors.anexo4?.vencimento ? 'p-invalid' : ''}
        />
        {formik.touched.anexo4?.vencimento && formik.errors.anexo4?.vencimento && (
          <small className="p-error">{formik.errors.anexo4.vencimento}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo4.desconto">Desconto</label>
        <InputText
          id="anexo4.desconto"
          name="anexo4.desconto"
          value={formik.values.anexo4.desconto}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo4?.desconto && formik.errors.anexo4?.desconto ? 'p-invalid' : ''}
        />
        {formik.touched.anexo4?.desconto && formik.errors.anexo4?.desconto && (
          <small className="p-error">{formik.errors.anexo4.desconto}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo4.termino_obrigacao">Término da Obrigação</label>
        <InputText
          id="anexo4.termino_obrigacao"
          name="anexo4.termino_obrigacao"
          value={formik.values.anexo4.termino_obrigacao}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo4?.termino_obrigacao && formik.errors.anexo4?.termino_obrigacao ? 'p-invalid' : ''}
        />
        {formik.touched.anexo4?.termino_obrigacao && formik.errors.anexo4?.termino_obrigacao && (
          <small className="p-error">{formik.errors.anexo4.termino_obrigacao}</small>
        )}
      </div>

      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Dados do Contrato</span>
      </Divider>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.local">Local</label>
        <InputText
          id="anexo5.local"
          name="anexo5.local"
          value={formik.values.anexo5.local}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.local && formik.errors.anexo5?.local ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.local && formik.errors.anexo5?.local && (
          <small className="p-error">{formik.errors.anexo5.local}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.data">Data</label>
        <Calendar
          id="anexo5.data"
          name="anexo5.data"
          value={formik.values.anexo5.data}
          onChange={(e) => formik.setFieldValue('anexo5.data', e.value)}
          onBlur={formik.handleBlur}
          dateFormat="dd/mm/yy"
          showIcon
          className={formik.touched.anexo5?.data && formik.errors.anexo5?.data ? 'p-invalid border-none' : 'border-none'}
        />
        {formik.touched.anexo5?.data && formik.errors.anexo5?.data && (
          <small className="p-error">{formik.errors.anexo5.data}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.contratante">Contratante</label>
        <InputText
          id="anexo5.contratante"
          name="anexo5.contratante"
          value={formik.values.anexo5.contratante}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.contratante && formik.errors.anexo5?.contratante ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.contratante && formik.errors.anexo5?.contratante && (
          <small className="p-error">{formik.errors.anexo5.contratante}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.contratado">Contratado</label>
        <InputText
          id="anexo5.contratado"
          name="anexo5.contratado"
          value={formik.values.anexo5.contratado}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.contratado && formik.errors.anexo5?.contratado ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.contratado && formik.errors.anexo5?.contratado && (
          <small className="p-error">{formik.errors.anexo5.contratado}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.oab_contratado">OAB do Contratado</label>
        <InputText
          id="anexo5.oab_contratado"
          name="anexo5.oab_contratado"
          value={formik.values.anexo5.oab_contratado}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.oab_contratado && formik.errors.anexo5?.oab_contratado ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.oab_contratado && formik.errors.anexo5?.oab_contratado && (
          <small className="p-error">{formik.errors.anexo5.oab_contratado}</small>
        )}
      </div>

      <Divider align="left" type="solid">
        <span className="text-xl text-primary font-bold">Testemunhas</span>
      </Divider>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.testemunhas.0.nome">Testemunha 1 - Nome</label>
        <InputText
          id="anexo5.testemunhas.0.nome"
          name="anexo5.testemunhas.0.nome"
          value={formik.values.anexo5.testemunhas[0].nome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.testemunhas?.[0]?.nome && formik.errors.anexo5?.testemunhas?.[0]?.nome ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.testemunhas?.[0]?.nome && formik.errors.anexo5?.testemunhas?.[0]?.nome && (
          <small className="p-error">{formik.errors.anexo5.testemunhas[0].nome}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.testemunhas.0.cpf">Testemunha 1 - CPF</label>
        <InputText
          id="anexo5.testemunhas.0.cpf"
          name="anexo5.testemunhas.0.cpf"
          value={formik.values.anexo5.testemunhas[0].cpf}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.testemunhas?.[0]?.cpf && formik.errors.anexo5?.testemunhas?.[0]?.cpf ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.testemunhas?.[0]?.cpf && formik.errors.anexo5?.testemunhas?.[0]?.cpf && (
          <small className="p-error">{formik.errors.anexo5.testemunhas[0].cpf}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.testemunhas.1.nome">Testemunha 2 - Nome</label>
        <InputText
          id="anexo5.testemunhas.1.nome"
          name="anexo5.testemunhas.1.nome"
          value={formik.values.anexo5.testemunhas[1].nome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.testemunhas?.[1]?.nome && formik.errors.anexo5?.testemunhas?.[1]?.nome ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.testemunhas?.[1]?.nome && formik.errors.anexo5?.testemunhas?.[1]?.nome && (
          <small className="p-error">{formik.errors.anexo5.testemunhas[1].nome}</small>
        )}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="anexo5.testemunhas.1.cpf">Testemunha 2 - CPF</label>
        <InputText
          id="anexo5.testemunhas.1.cpf"
          name="anexo5.testemunhas.1.cpf"
          value={formik.values.anexo5.testemunhas[1].cpf}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.anexo5?.testemunhas?.[1]?.cpf && formik.errors.anexo5?.testemunhas?.[1]?.cpf ? 'p-invalid' : ''}
        />
        {formik.touched.anexo5?.testemunhas?.[1]?.cpf && formik.errors.anexo5?.testemunhas?.[1]?.cpf && (
          <small className="p-error">{formik.errors.anexo5.testemunhas[1].cpf}</small>
        )}
      </div>

      <div className="col-12 mt-2">
        <Button
          type="submit"
          label="Gerar Contrato"
          className="w-full border-none"
          style={{ background: 'var(--primary-color)' }}
        />
      </div>
    </form>
  );
};

export default FeesForm;
