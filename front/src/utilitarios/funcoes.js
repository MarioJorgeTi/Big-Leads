export function formatarData(dataISO) {
  if (!dataISO) return "00/00/0000";
  let date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dataISO)) {
    date = new Date(`${dataISO}T00:00:00`);
  } else {
    date = new Date(dataISO);
  }
  if (isNaN(date.getTime())) {
    return "00/00/0000";
  }
  return date.toLocaleDateString("pt-BR");
}

export function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

export const filtrarProcessos = (processos, filtros) => {
  return processos.filter(p => {
    const dataProcesso = p.data_autuacao;
    const classeProcesso = (p.classe_judicial || "").toLowerCase().trim();
    const estadoProcesso = p.estado;
    const statusProcesso = p.status;
    const valorProcesso = Number(p.valor_causa);

    const atendeData =
      !filtros.data ||
      dataProcesso === filtros.data;

    const atendeClasse =
      !filtros.classe ||
      classeProcesso === (filtros.classe || "").toLowerCase().trim();

    const atendeEstado =
      !filtros.estado || estadoProcesso === filtros.estado;

    const atendeStatus =
      !filtros.status || statusProcesso === filtros.status;

    const atendeValor =
      (!filtros.valorMinimo || valorProcesso >= Number(filtros.valorMinimo)) &&
      (!filtros.valorMaximo || valorProcesso <= Number(filtros.valorMaximo));

    return (
      atendeData &&
      atendeClasse &&
      atendeEstado &&
      atendeStatus &&
      atendeValor
    );
  });
};
