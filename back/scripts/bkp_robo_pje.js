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
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--window-size=1920,1080'] });
  const [page] = await browser.pages();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36');
  return { browser, page };
}

async function fazerLogin(page, cpf, senha) {
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
  console.log('Login efetuado.');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
}

async function acessarPainelAdvogado(page) {
  console.log('Acessando painel do advogado...');
  await page.goto('https://tjrj.pje.jus.br/1g/Painel/painel_usuario/advogado.seam', { waitUntil: 'networkidle2' });
}

async function acessarConsultaProcesso(page) {
  console.log('Acessando aba de consulta de processos');
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

function tratarValoresDoObjeto(obj) {
  const novo = {};
  for (const chave in obj) {
    let valor = obj[chave];
    if (typeof valor === 'string') {
      let valorLower = valor.toLowerCase().trim();
      if (valorLower === 'sim') {
        valor = 1;
      } else if (valorLower === 'não') {
        valor = 0;
      }
      else if (chave === 'valor_causa') {
        valor = valor.replace('R$ ', '').replace(/\./g, '').replace(',', '.').trim();
        valor = parseFloat(valor);
      } else {
        valor = valorLower;
      }
    }
    novo[chave] = valor;
  }
  return novo;
}

function esperarArquivoEspecifico(dir, nomeArquivo, tentativas = 30, intervalo = 3000) {
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

(async () => {
  const { browser, page } = await iniciarBrowser();

  try {
    await fazerLogin(page, cpf, senha);
    await acessarPainelAdvogado(page);
    const consultaProcessoFrame = await acessarConsultaProcesso(page);

    const processos = [];
    const pastaDestino = 'C:/Users/Pc-18/Documents/big-fish-pje/back/storage/processos';
    const tiposDeAcao = ['Busca e Apreensão', 'Execução de Título', 'Monitória', 'Despejo'];
    const quantidadePaginas = 3;

    for (let j = 0; j < tiposDeAcao.length; j++) {

      const acao = tiposDeAcao[j];
      console.log('Pesquisando processo do tipo:', acao);

      await consultaProcessoFrame.waitForSelector('#fPP\\:j_id246\\:classeJudicial', { visible: true });
      await consultaProcessoFrame.waitForSelector('#fPP\\:valorDaCausaDecoration\\:valorCausaInicial', { visible: true });

      await consultaProcessoFrame.evaluate(() => {
        document.querySelector('#fPP\\:j_id246\\:classeJudicial').value = '';
        document.querySelector('#fPP\\:valorDaCausaDecoration\\:valorCausaInicial').value = '';
      });
      await consultaProcessoFrame.type('#fPP\\:j_id246\\:classeJudicial', acao);
      await consultaProcessoFrame.type('#fPP\\:valorDaCausaDecoration\\:valorCausaInicial', '5000000');
      await consultaProcessoFrame.click('#fPP\\:searchProcessos');

      for (let k = 1; k < quantidadePaginas; k++) {
        await consultaProcessoFrame.waitForSelector('#fPP\\:processosTable tbody tr td:nth-child(15)', { visible: true, timeout: 50000 });
        const linhas = await consultaProcessoFrame.$$('#fPP\\:processosTable tbody tr');
        for (let i = 1; i < 6; i++) {
          const tds = await linhas[i].$$('td');
          let caracteristicas = '';
          if (tds[2]) {
            caracteristicas = await tds[2].evaluate(td => {
              const icones = td.querySelectorAll('i');
              const titles = Array.from(icones).map(i => i.getAttribute('title')?.trim()).filter(Boolean);
              return titles.join(', ');
            });
          }
          const objetoProcesso = {
            numero_processo: await tds[1].evaluate(td => td.innerText.trim()),
            caracteristica: caracteristicas,
            orgao_julgador: await tds[3].evaluate(td => td.innerText.trim()),
            data_autuacao: await tds[4].evaluate(td => td.innerText.trim()),
            polo_ativo: await tds[6].evaluate(td => td.innerText.trim()),
            polo_passivo: await tds[7].evaluate(td => td.innerText.trim()),
            ultima_movimentacao: await tds[8].evaluate(td => td.innerText.trim()),
          };
          console.log('numero do processo:', objetoProcesso.numero_processo);
          const novaAbaPromise = new Promise(resolve => {
            browser.once('targetcreated', async target => {
              const newPage = await target.page();
              if (!newPage) {
                return resolve(null);
              }
              await newPage.bringToFront();
              resolve(newPage);
            });
          });
          const dialogHandler1 = new Promise(resolve => {
            page.once('dialog', async dialog => {
              await dialog.accept();
              resolve();
            });
          });
          await consultaProcessoFrame.waitForSelector(`#fPP\\:processosTable tbody tr td a`, { visible: true, timeout: 60000 });
          await consultaProcessoFrame.evaluate((i) => {
            const tr = document.querySelectorAll('#fPP\\:processosTable tbody tr')[i];
            const link = tr?.querySelectorAll('td')[1]?.querySelector('a');
            if (link) link.click();
          }, i);
          await Promise.race([dialogHandler1, new Promise(resolve => setTimeout(resolve, 5000))]);

          const abaDetalhes = await novaAbaPromise;
          await abaDetalhes.waitForSelector('#panelDetalhesProcesso');
          await abaDetalhes.click('a[title="Mais detalhes"]');
          await abaDetalhes.waitForSelector('#maisDetalhes', { visible: true, timeout: 5000 });
          
          const { temAdvogado, representantes } = await abaDetalhes.evaluate(() => {
            const poloDiv = document.querySelector('#poloPassivo');
            let temAdvogado = 0;
            const representantes = [];
            if (poloDiv) {
              const icone = poloDiv.querySelector('i[alt*="ícone de grupo"]');
              if (icone) temAdvogado = 1;
              const linhas = poloDiv.querySelectorAll('tr');
              linhas.forEach(tr => {
                const textoSpan = tr.querySelector('td span span')?.innerText || '';
                let nome = '';
                let cpf_cnpj = null;
                const match = textoSpan.match(/(.+?)\s+-\s+(CPF|CNPJ):\s+([\d./-]+)/i);
                if (match) {
                  nome = match[1].trim().toLowerCase();
                  cpf_cnpj = match[3].trim();
                } else {
                  nome = textoSpan.split('(')[0].trim();
                }
                if (nome) {
                  representantes.push(cpf_cnpj ? { nome, cpf_cnpj } : { nome });
                }
              });
            }
            return { temAdvogado, representantes };
          });
          objetoProcesso.polo_passivo = representantes;
          const detalhesProcesso = await abaDetalhes.evaluate(() => {
            const container = document.querySelector('#maisDetalhes');
            const dts = Array.from(container.querySelectorAll('dt'));
            const dds = Array.from(container.querySelectorAll('dd'));
            const resultado = {};
            for (let i = 0; i < dts.length; i++) {
              const chave = dts[i].innerText.trim();
              const dd = dds[i];
              if (!dd) continue;
              const lista = dd.querySelectorAll('li');
              if (lista.length > 0) {
                const itens = Array.from(lista).map(li => li.textContent.trim());
                resultado[chave] = itens.join(', ');
              } else {
                resultado[chave] = dd.textContent.trim();
              }
            }
            return resultado;
          });
          for (const [chaveOriginal, valor] of Object.entries(detalhesProcesso)) {
            if (["Autuação", "Última distribuição"].includes(chaveOriginal)) continue;
            let chaveNormalizada = chaveOriginal.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\?/g, "").replace(/[^a-zA-Z0-9 ]/g, "").trim().toLowerCase().replace(/\s+/g, "_");
            const mapaRenomeacao = { valor_da_causa: "valor_causa", segredo_de_justica: "segredo_justica", tutelaliminar: "tutela_liminar" };
            if (mapaRenomeacao[chaveNormalizada]) {
              chaveNormalizada = mapaRenomeacao[chaveNormalizada];
            }
            objetoProcesso[chaveNormalizada] = valor;
          }
          const objetoFinal = tratarValoresDoObjeto(objetoProcesso);
          if (!temAdvogado) {
            processos.push(objetoFinal);
            console.log(`Registrou todos os dados do processo ${i} da página ${k}`);
          }
          await abaDetalhes.click('a[title="Mais detalhes"]');
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (!temAdvogado) {
            const dialogHandler2 = new Promise(resolve => {
              abaDetalhes.once('dialog', async dialog => {
                await dialog.accept();
                resolve();
              });
            });
            await abaDetalhes.waitForSelector('i.fa.fa-download', { visible: true, timeout: 10000 });
            await abaDetalhes.click('i.fa.fa-download');
            await new Promise(resolve => setTimeout(resolve, 1000));
            await abaDetalhes.waitForSelector('#navbar\\:cbCronologia', { visible: true, timeout: 10000 });
            await abaDetalhes.select('#navbar\\:cbCronologia', 'ASC');
            await abaDetalhes.click('#navbar\\:downloadProcesso');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await Promise.race([dialogHandler2, new Promise(resolve => setTimeout(resolve, 10000))]);
            console.log(`Baixou todos os dados do processo ${i} da página ${k}`);
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
          await abaDetalhes.close();
          await page.bringToFront();
          if (!temAdvogado) {
            const pastaDownloads = path.join(os.homedir(), 'Downloads');
            const nomeProcesso = objetoFinal.numero_processo + '.pdf';
            try {
              const caminhoOrigem = await esperarArquivoEspecifico(pastaDownloads, nomeProcesso);
              const destino = path.join(pastaDestino, nomeProcesso);
              fs.renameSync(caminhoOrigem, destino);
              console.log(`Movido processo ${i} da página ${k} com sucesso.`);
            } catch (err) {
              console.warn(`Falha ao mover processo ${i} da página ${k}:`, err.message);
            }
          }
        }
        if (k < quantidadePaginas - 1) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          await consultaProcessoFrame.waitForSelector('#fPP\\:processosTable tbody tr td:nth-child(15)', { visible: true, timeout: 50000 });
          const linhasAtualizadas = await consultaProcessoFrame.$$('#fPP\\:processosTable tbody tr');
          const novaTd0 = await linhasAtualizadas[0].$$('td');
          await novaTd0[14].click({ delay: 100 });
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
      await consultaProcessoFrame.waitForSelector('#fPP\\:processosTable tbody tr td:nth-child(15)', { visible: true, timeout: 50000 });
      const linhasAtualizadas = await consultaProcessoFrame.$$('#fPP\\:processosTable tbody tr');
      const novaTd0 = await linhasAtualizadas[0].$$('td');
      await novaTd0[0].click({ delay: 100 });
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    const caminhoJson = path.join(pastaDestino, 'processos.json');
    fs.writeFileSync(caminhoJson, JSON.stringify(processos, null, 2), 'utf8');
    console.log('Dados salvos com sucesso!');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await browser.close();
  } catch (error) {
    console.log("Deu erro:", error);
  }
})();