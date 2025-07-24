import puppeteer from 'puppeteer';
import fs from 'fs';
import os from 'os';
import path from 'path';

const email = 'daniele.azeredo@mariojorgeadvocacia.com.br';
const senha = '925375Da@';

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

async function fazerLogin(page, email, senha) {
    console.log('Função fazerLogin');
    await page.goto('https://lemitti.com/auth/login', { waitUntil: 'networkidle2' });
    await page.type('#email', email, { delay: 100 });
    await page.type('#password', senha, { delay: 100 });
    await page.click('button.btn.btn-lg.btn-lemit');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
}

export async function coletarInformacoes({ email, senha, cpf_cnpj }) {
    try {
        const resultado = {
            telefone: [],
            email: "",
            empresa: {
                nome: "",
                cnpj: "",
            }
        }

        const { browser, page } = await iniciarBrowser();
        await fazerLogin(page, email, senha);
        await page.type('#document', cpf_cnpj, { delay: 100 });
        await page.click('button.btn.btn-primary');

        // continuar daqui pegando os telefones
        resultado.telefone = await page.$$eval('a[href^="tel:"]', els =>
            els.map(el => el.textContent.trim())
        );

        console.log(resultado);

        await esperar(5000);
        await browser.close();
    } catch (error) {
        console.log("Deu erro:", error);
    }
}

(async () => {
    try {
        await coletarInformacoes({ email: email, senha: senha, cpf_cnpj: '13927938742' });
    } catch (error) {
        console.log("Deu erro:", error);
    }
})();