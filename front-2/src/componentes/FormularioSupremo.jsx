import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useEffect } from 'react';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';

const opcional = (validacao) => (value) => {
  if (value === null || value === undefined || value === '') return true;
  return validacao(value);
};

const rules = {
  palavra: value => {
    if (!value) return 'Campo obrigatório';
    if (value.length >= 250) return 'Máximo de 250 caracteres';
    return true;
  },
  texto: value => {
    if (!value) return 'Campo obrigatório';
    if (value.length >= 5000) return 'Máximo de 5000 caracteres';
    return true;
  },
  entrada: value => {
    if (value === null || value === undefined) return 'Campo obrigatório';
    if (typeof value !== 'number') return 'O valor deve ser um número';
    if (value < 500) return 'O valor mínimo é R$ 500,00';
    return true;
  },
  requerido: value => (value !== null && value !== undefined && value !== '') || 'Campo obrigatório',
  telefone: value => /^(\(\d{2}\))\s(\d{4,5})-(\d{4})$/.test(value) || 'Telefone deve estar no formato (XX) XXXXX-XXXX',
  email: value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'E-mail inválido',
  cpf: value => /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/.test(value) || 'CPF deve estar no formato XXX.XXX.XXX-XX',
  rg: value => /^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(value) || 'RG deve estar no formato XX.XXX.XXX-X',
  cnpj: value => /^(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/.test(value) || 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX',
  senha: value => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,250}$/.test(value) || 'A senha deve ter no mínimo 8 e no máximo 250 caracteres, incluindo uma letra, um número e um caractere especial',
  url: v => /^(https?|ftp):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?].*)?$/.test(v) || 'URL inválida',
  data: v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Data deve estar no formato YYYY-MM-DD',
  cep: v => /^\d{5}-\d{3}$/.test(v) || 'CEP deve estar no formato XXXXX-XXX',
  uf: v => /^[A-Z]{2}$/.test(v) || 'UF deve conter exatamente 2 letras maiúsculas',
  cartao: value => /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value) || 'Número de cartão inválido',
  numero: value => /^[1-9]\d*$/.test(value) || 'O valor deve ser um número',
  numero_processo: value => /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/.test(value) || 'Número do processo deve estar no formato XXXXXXX-XX.XXXX.X.XX.XXXX',
  oab: value => /^[A-Z]{2}\d{4,6}$/.test(value) || 'OAB deve estar no formato XXxxxx (2 letras maiúsculas + 4 a 6 números)',
  numero_opcional: opcional(value => /^[1-9]\d*$/.test(value) || 'O valor deve ser um número'),
  complemento_opcional: opcional(value => {
    if (value.length >= 250) return 'Máximo de 250 caracteres';
    return true;
  }),
};

const formatDateToISO = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseISOToDate = (isoDate) => {
  if (!isoDate) return null;
  const [year, month, day] = isoDate.split('-');
  return new Date(year, month - 1, day);
};

const FormularioSupremo = ({ secoes, onSubmit, carregando = false, valoresIniciais = {}, onChangeCampo = null, onResult = null, textoButao = 'texto' }) => {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});

  const handleChange = (campo, valor) => {
    setValores(prev => ({ ...prev, [campo]: valor }));
    setErros(prev => ({ ...prev, [campo]: null }));
    if (onChangeCampo) onChangeCampo(campo, valor);
  };

  const handleBlur = (campo) => {
    const regra = secoes.flatMap(secao => secao.campos).find(c => c[1] === campo)?.[3];
    const validacao = rules[regra];
    if (validacao) {
      const resultado = validacao(valores[campo]);
      setErros(prev => ({ ...prev, [campo]: resultado === true ? null : resultado }));
    }
  };

  const validar = () => {
    const novosErros = {};
    secoes.forEach(secao => {
      secao.campos.forEach(([_, campo, __, regra]) => {
        const validacao = rules[regra];
        if (validacao) {
          const resultado = validacao(valores[campo]);
          if (resultado !== true) {
            novosErros[campo] = resultado;
          }
        }
      });
    });
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validar()) {
      const dadosFinal = {};
      secoes.forEach(secao => {
        const camposDaSecao = {};
        secao.campos.forEach(([_, nomeCampo]) => {
          camposDaSecao[nomeCampo] = valores[nomeCampo];
        });
        if (Array.isArray(secao.titulo) && secao.titulo.length > 1) {
          const chave = secao.titulo[1];
          dadosFinal[chave] = { ...dadosFinal[chave], ...camposDaSecao };
        } else {
          Object.assign(dadosFinal, camposDaSecao);
        }
      });
      try {
        const resultado = await onSubmit(dadosFinal);
        if (onResult) onResult(resultado);
      } catch (error) {
        if (onResult) onResult(error);
      }
    }
  };

  useEffect(() => { setValores(valoresIniciais); }, [JSON.stringify(valoresIniciais)]);

  return (
    <form className="p-fluid" onSubmit={handleSubmit}>
      {secoes.map((secao, idx) => (
        <div key={idx} className="grid p-3">
          <Divider align="left">
            <span className="text-xl font-bold">
              {Array.isArray(secao.titulo) ? secao.titulo[0] : secao.titulo}
            </span>
          </Divider>
          {secao.campos.map(([label, name, tipo, _, tamanhos, opcoes], i) => {
            const colClass = `col-${tamanhos[0]} md:col-${tamanhos[1]} lg:col-${tamanhos[2]} xl:col-${tamanhos[3]}`;
            return (
              <div className={`field ${colClass}`} key={i}>
                <label htmlFor={name}>{label}</label>
                {tipo === 'text' && (() => {
                  const mask = secao.campos[i][6];
                  const InputComponent = mask ? InputMask : InputText;
                  const propsMask = mask ? { mask } : {};
                  return (
                    <InputComponent
                      id={name}
                      name={name}
                      value={valores[name] || ''}
                      onChange={e => handleChange(name, e.target.value)}
                      onBlur={() => handleBlur(name)}
                      className={erros[name] ? 'p-invalid' : ''}
                      {...propsMask}
                    />
                  );
                })()}
                {tipo === 'select' && (
                  <Dropdown
                    id={name}
                    options={opcoes.map(o => ({ label: o, value: o }))}
                    value={valores[name] || ''}
                    onChange={e => handleChange(name, e.value)}
                    onBlur={() => handleBlur(name)}
                    className={erros[name] ? 'p-invalid' : ''}
                  />
                )}
                {tipo === 'multi-select' && (
                  <MultiSelect
                    id={name}
                    options={opcoes.map(o => ({ label: o, value: o }))}
                    value={valores[name] || []}
                    onChange={e => handleChange(name, e.value)}
                    onBlur={() => handleBlur(name)}
                    className={erros[name] ? 'p-invalid' : ''}
                  />
                )}
                {tipo === 'date' && (
                  <Calendar
                    id={name}
                    value={parseISOToDate(valores[name])}
                    onChange={e => handleChange(name, formatDateToISO(e.value))}
                    onBlur={() => handleBlur(name)}
                    dateFormat="dd/mm/yy"
                    className={erros[name] ? 'p-invalid' : ''}
                    showIcon
                  />
                )}
                {tipo === 'currency' && (
                  <InputNumber
                    id={name}
                    value={valores[name] || null}
                    onChange={e => handleChange(name, e.value)}
                    onBlur={() => handleBlur(name)}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    className={erros[name] ? 'p-invalid' : ''}
                  />
                )}
                {tipo === 'password' && (
                  <InputText
                    id={name}
                    name={name}
                    type="password"
                    value={valores[name] || ''}
                    onChange={e => handleChange(name, e.target.value)}
                    onBlur={() => handleBlur(name)}
                    className={erros[name] ? 'p-invalid' : ''}
                  />
                )}
                {erros[name] && <small className="p-error">{erros[name]}</small>}
              </div>
            );
          })}
        </div>
      ))}
      <div className="col-12">
        <Button style={{ background: 'var(--primary-color)' }} label={carregando ? '' : textoButao} icon={carregando ? 'pi pi-spinner pi-spin' : undefined} type="submit" className="w-full border-none" disabled={carregando} />
      </div>
    </form>
  );
};

export default FormularioSupremo;
