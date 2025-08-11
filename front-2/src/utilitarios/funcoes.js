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