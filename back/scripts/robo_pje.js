import puppeteer from 'puppeteer';
import fs from 'fs';
import os from 'os';
import path from 'path';

const cpf = '08740641716';
const senha = '1020304050Mj#';

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function iniciarBrowser() {
  console.log('Função iniciarBrowser');
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--window-size=1920,1080'] });
  const [page] = await browser.pages();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36');
  return { browser, page };
}

async function fazerLogin(page, cpf, senha) {
  console.log('Função fazerLogin');
  await page.goto('https://tjrj.pje.jus.br/1g/login.seam', { waitUntil: 'networkidle2' });
  let ssoFrame = null;
  for (let tentativas = 0; tentativas < 20; tentativas++) {
    await esperar(500);
    const frames = page.frames();
    ssoFrame = frames.find(f => f.url().includes('sso.cloud.pje.jus.br'));
    if (ssoFrame) break;
  }
  if (!ssoFrame) throw new Error('Frame do SSO não foi encontrado.');
  await esperar(2000);
  await ssoFrame.type('#username', cpf, { delay: 100 });
  await ssoFrame.type('#password', senha, { delay: 100 });
  await ssoFrame.click('#kc-login');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
}

async function acessarPainelAdvogado(page) {
  console.log('Função acessarPainelAdvogado');
  await page.goto('https://tjrj.pje.jus.br/1g/Painel/painel_usuario/advogado.seam', { waitUntil: 'networkidle2' });
}

async function acessarConsultaProcesso(page) {
  console.log('Função acessarConsultaProcesso');
  await page.click('#tabConsultaProcesso_lbl');
  await page.click('body', { timeout: 10000 });
  await page.waitForFunction(() => {
    return window.frames && Array.from(window.frames).some(f => f.location.href.includes('ConsultaProcesso'));
  }, { timeout: 10000 });
  const consultaFrame = page.frames().find(f => f.url().includes('ConsultaProcesso'));
  if (!consultaFrame) {
    throw new Error('Frame da consulta de processo não foi encontrado.');
  }
  return consultaFrame;
}

async function processarPaginaAtual(consultaFrame, browser, page, pastaDestino, processos) {
  const linhas = await consultaFrame.$$('#fPP\\:processosTable tbody tr');
  // linhas.length
  for (let i = 1; i < 3; i++) {
    const processo = await extrairProcessoPorLinha(consultaFrame, browser, page, i, pastaDestino);
    if (processo && !processos.some(p => p.numero_processo === processo.numero_processo)) {
      processos.push(processo);
    }
  }
}

async function coletarProcessos(consultaFrame, browser, page, pastaDestino, tiposDeAcao, quantidadePaginas) {
  console.log('Função coletarProcessos');
  const processos = [];
  for (const acao of tiposDeAcao) {
    await preencherBuscaPorAcao(consultaFrame, acao);
    for (let k = 0; k < quantidadePaginas; k++) {
      await processarPaginaAtual(consultaFrame, browser, page, pastaDestino, processos);
      if (k < quantidadePaginas - 1 && k != 0) await avancarPagina(consultaFrame);
    }
    await voltarParaPrimeiraPagina(consultaFrame);
  }
  return processos;
}

async function extrairProcessoPorLinha(frame, browser, page, linhaIndex, pastaDestino) {
  console.log('Função extrairProcessoPorLinha');
  const novaAbaPromise = new Promise((resolve) => {
    const handler = async (target) => {
      const newPage = await target.page();
      if (newPage) {
        browser.off('targetcreated', handler);
        await newPage.bringToFront();
        resolve(newPage);
      }
    };
    browser.on('targetcreated', handler);
  });
  const dialogHandler = new Promise(resolve => {
    page.once('dialog', async dialog => {
      await dialog.accept();
      resolve();
    });
  });
  await frame.waitForSelector(`#fPP\\:processosTable tbody tr td a`, { visible: true, timeout: 60000 });
  await frame.evaluate((i) => {
    const tr = document.querySelectorAll('#fPP\\:processosTable tbody tr')[i];
    const link = tr?.querySelectorAll('td')[1]?.querySelector('a');
    if (link) link.click();
  }, linhaIndex);
  await Promise.race([dialogHandler, new Promise(resolve => setTimeout(resolve, 5000))]);
  const abaDetalhes = await novaAbaPromise;
  await abaDetalhes.waitForSelector('#panelDetalhesProcesso');
  await abaDetalhes.click('a[title="Mais detalhes"]');
  await abaDetalhes.waitForSelector('#maisDetalhes');
  const numero_processo = await abaDetalhes.evaluate(() => {
    const link = document.querySelector('a[title="Mais detalhes"]');
    if (!link) return null;
    const texto = link.innerText || '';
    const match = texto.match(/\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}/);
    return match ? match[0] : null;
  });
  const detalhes = await abaDetalhes.evaluate(() => {
    const container = document.querySelector('#maisDetalhes');
    const dts = Array.from(container.querySelectorAll('dt'));
    const dds = Array.from(container.querySelectorAll('dd'));
    const resultado = {};
    for (let i = 0; i < dts.length; i++) {
      const chave = dts[i].innerText.trim();
      const dd = dds[i];
      if (!dd) continue;
      const li = dd.querySelectorAll('li');
      resultado[chave] = li.length > 0 ? Array.from(li).map(li => li.textContent.trim()).join(', ') : dd.textContent.trim();
    }
    return resultado;
  });
  const { temAdvogado, representantesPassivo, representantesAtivo } = await abaDetalhes.evaluate(() => {
    function extrairRepresentantes(idDiv) {
      const div = document.querySelector(idDiv);
      const representantes = [];
      if (div) {
        const linhas = div.querySelectorAll('tr');
        linhas.forEach(tr => {
          const span = tr.querySelector('td span span')?.innerText || '';
          const match = span.match(/(.+?)\s+-\s+(CPF|CNPJ):\s+([\d./-]+)/i);
          let nome = span.split(/\s+-\s+(CPF|CNPJ):/)[0].trim();
          let cpf_cnpj = match ? match[3].trim() : null;
          if (nome) representantes.push(cpf_cnpj ? { nome, cpf_cnpj } : { nome });
        });
      }
      return representantes;
    }
    const poloPassivoDiv = document.querySelector('#poloPassivo');
    const temAdvogado = poloPassivoDiv?.querySelector('i[alt*="ícone de grupo"]') ? 1 : 0;
    return { temAdvogado, representantesPassivo: extrairRepresentantes('#poloPassivo'), representantesAtivo: extrairRepresentantes('#poloAtivo'), };
  });
  const objeto = { numero_processo, polo_ativo: representantesAtivo, polo_passivo: representantesPassivo };
  for (const [chave, valor] of Object.entries(detalhes)) {
    let normalizada = chave.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\?/g, "").replace(/[^a-zA-Z0-9 ]/g, "").trim().toLowerCase().replace(/\s+/g, "_");
    const mapa = { valor_da_causa: "valor_causa", segredo_de_justica: "segredo_justica", tutelaliminar: "tutela_liminar", autuacao: "data_autuacao" };
    objeto[mapa[normalizada] || normalizada] = valor;
  }
  const final = tratarValoresDoObjeto(objeto);
  const temDocumentoDisponivel = await abaDetalhes.evaluate(() => {
    const h3 = document.querySelector('#detalheDocumento\\:quadroDocumento h3');
    if (!h3) return true;
    const texto = h3.innerText?.trim().toLowerCase();
    return !(texto.includes('não há documentos disponíveis') || texto.includes('você não possui permissão'));
  });
  if (!temDocumentoDisponivel) {
    await abaDetalhes.close();
    await page.bringToFront();
    return null;
  }
  if (!temAdvogado) {
    await baixarPDFDoProcesso(numero_processo, abaDetalhes, pastaDestino);
    await abaDetalhes.close();
    await page.bringToFront();
    return final;
  }
  await abaDetalhes.close();
  await page.bringToFront();
  return null;
}

async function preencherBuscaPorAcao(frame, acao) {
  console.log('Função preencherBuscaPorAcao');
  await frame.waitForSelector('#fPP\\:j_id246\\:classeJudicial');
  await frame.evaluate(() => {
    document.querySelector('#fPP\\:j_id246\\:classeJudicial').value = '';
    document.querySelector('#fPP\\:valorDaCausaDecoration\\:valorCausaInicial').value = '';
  });
  await frame.type('#fPP\\:j_id246\\:classeJudicial', acao);
  await frame.type('#fPP\\:valorDaCausaDecoration\\:valorCausaInicial', '8000000');
  await frame.click('#fPP\\:searchProcessos');
}

async function avancarPagina(frame) {
  console.log('Função avancarPagina');
  await frame.waitForSelector('#fPP\\:processosTable tbody tr td:nth-child(15)');
  const linhas = await frame.$$('#fPP\\:processosTable tbody tr');
  const tds = await linhas[0].$$('td');
  await tds[14].click();
  await new Promise(res => setTimeout(res, 5000));
}

async function voltarParaPrimeiraPagina(frame) {
  console.log('Função voltarParaPrimeiraPagina');
  await frame.waitForSelector('#fPP\\:processosTable tbody tr td:nth-child(15)');
  const linhas = await frame.$$('#fPP\\:processosTable tbody tr');
  const tds = await linhas[0].$$('td');
  await tds[0].click();
  await new Promise(res => setTimeout(res, 3000));
}

async function baixarPDFDoProcesso(numero, aba, destino) {
  console.log('Função baixarPDFDoProcesso');
  const dialogHandler = new Promise(resolve => {
    aba.once('dialog', async dialog => {
      await dialog.accept();
      resolve();
    });
  });
  await aba.waitForSelector('i.fa.fa-download', { visible: true });
  await aba.click('i.fa.fa-download');
  await new Promise(res => setTimeout(res, 1000));
  await aba.waitForSelector('#navbar\\:cbCronologia', { visible: true });
  await aba.select('#navbar\\:cbCronologia', 'ASC');
  await aba.click('#navbar\\:downloadProcesso');
  await Promise.race([dialogHandler, new Promise(res => setTimeout(res, 10000))]);
  const downloads = path.join(os.homedir(), 'Downloads');
  const nomeArquivo = numero + '.pdf';
  const origem = await esperarArquivoEspecifico(downloads, nomeArquivo);
  const destinoFinal = path.join(destino, nomeArquivo);
  fs.renameSync(origem, destinoFinal);
}

function tratarValoresDoObjeto(obj) {
  console.log('Função tratarValoresDoObjeto');
  const novo = {};
  for (const chave in obj) {
    let valor = obj[chave];
    if (typeof valor === 'string') {
      let valorLower = valor.toLowerCase().trim();
      if (valorLower === 'sim') {
        valor = 1;
      } else if (valorLower === 'não' && chave != 'prioridade') {
        valor = 0;
      }
      else if (chave === 'valor_causa') {
        valor = valor.replace('R$ ', '').replace(/\./g, '').replace(',', '.').trim();
        valor = parseFloat(valor);
      }
      else if (chave === 'data_autuacao' || chave === 'ultima_distribuicao') {
        valor = converterDataBrasilParaISO(valor);
      } else {
        valor = valorLower;
      }
    }
    novo[chave] = valor;
  }
  return novo;
}

function esperarArquivoEspecifico(dir, nomeArquivo, tentativas = 30, intervalo = 3000) {
  console.log('Função esperarArquivoEspecifico');
  return new Promise((resolve, reject) => {
    let tentativasFeitas = 0;
    const checar = () => {
      const caminho = path.join(dir, nomeArquivo);
      const caminhoCrdownload = caminho + '.crdownload';
      if (fs.existsSync(caminho) && !fs.existsSync(caminhoCrdownload)) {
        return resolve(caminho);
      }
      tentativasFeitas++;
      if (tentativasFeitas >= tentativas) {
        return reject(new Error(`Arquivo ${nomeArquivo} não apareceu após várias tentativas.`));
      }
      setTimeout(checar, intervalo);
    };
    checar();
  });
}

function converterDataBrasilParaISO(dataStr) {
  const meses = {
    jan: '01', fev: '02', mar: '03', abr: '04',
    mai: '05', jun: '06', jul: '07', ago: '08',
    set: '09', out: '10', nov: '11', dez: '12'
  };
  const partes = dataStr.trim().toLowerCase().split(' ');
  if (partes.length !== 3) return null;
  const [dia, mesAbrev, ano] = partes;
  const mes = meses[mesAbrev];
  if (!mes) return null;
  const diaNum = dia.padStart(2, '0');
  return `${ano}-${mes}-${diaNum}`;
}

(async () => {
  try {
    const { browser, page } = await iniciarBrowser();
    await fazerLogin(page, cpf, senha);
    await acessarPainelAdvogado(page);
    const consultaProcessoFrame = await acessarConsultaProcesso(page);
    const pastaDestino = 'C:/Users/Pc-18/Documents/big-fish-pje/back/storage/processos';
    const tiposDeAcao = ['Busca e Apreensão', 'Execução de Título', 'Monitória', 'Despejo'];
    const quantidadePaginas = 3;
    const processos = await coletarProcessos(consultaProcessoFrame, browser, page, pastaDestino, tiposDeAcao, quantidadePaginas);
    const caminhoArquivo = path.join(pastaDestino, 'processos.json');
    fs.writeFileSync(caminhoArquivo, JSON.stringify(processos, null, 2), 'utf8');
    console.log('escreveu os processos');
    await browser.close();
  } catch (error) {
    console.log("Deu erro:", error);
  }
})();