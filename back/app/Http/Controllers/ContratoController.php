<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mpdf\Mpdf;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;

class ContratoController extends Controller
{
    public function gerarContratoHonorario()
    {
        $logo = public_path('imagens/mario-jorge-logo.png');
        $logoCaminho = 'data:image/png;base64,' . base64_encode(file_get_contents($logo));

        $numero_processo = '5020874-35.2025.8.13.0024';

        $anexo1 = [
            'nome_completo' => 'Alexandre Martins de Abreu Torres',
            'nacionalidade' => 'Brasileiro',
            'estado_civil' => 'Casado',
            'profissao' => 'Empresário',
            'rg' => '14597200',
            'cpf' => '074.202.416-43',
            'endereco' => 'Rua Sebastião Fabiano Dias, 233, Ap. 1801, Bloco B',
            'bairro' => 'Belvedere',
            'cidade' => 'Belo Horizonte',
            'estado' => 'MG',
            'cep' => '30320-690',
            'email' => 'contato@mariojorgeadvocacia.com.br',
        ];

        $anexo2 = [
            ['tipo' => 'Ação Revisional', 'descricao' => 'Propositura de ação revisional de contrato bancário com pedido de revisão de juros abusivos.'],
            ['tipo' => 'Busca e Apreensão', 'descricao' => 'Apresentação de defesa em ação de busca e apreensão – Processo nº ' . $numero_processo],
            ['tipo' => 'Execução de Título Extrajudicial', 'descricao' => 'Embargos à Execução (ação incidental autônoma). Exceção de Pré-Executividade (instrumento excepcional, cabível para matérias de ordem pública ou ausências de pressupostos legais da execução)'],
            ['tipo' => 'Ação Monitória', 'descricao' => 'Apresentar os embargos à ação monitória.'],
            ['tipo' => 'Ação de Despejo', 'descricao' => 'Apresentar a contestação cabível.'],
        ];

        $anexo3 = [
            ['descricao' => 'Entrada', 'valor' => 'R$ 2.000,00'],
            ['descricao' => 'Parcelas', 'valor' => '5 parcelas iguais de R$ 2.000,00'],
            ['descricao' => 'Data de Pagamento', 'valor' => 'Todo dia 04 de cada mês'],
            ['descricao' => 'Honorários de Êxito', 'valor' => '8% sobre os valores recebidos judicialmente, a qualquer título'],
            ['descricao' => 'Condição para Honorários de Êxito', 'valor' => 'Devido somente se houver recebimento de valores na ação judicial'],
            ['descricao' => 'Observação', 'valor' => 'Não havendo êxito, permanecem devidos os valores fixos (entrada e parcelas mensais)'],
        ];

        $anexo4 = [
            ['descricao' => 'Valor Mensal', 'valor' => 'R$ 200,00'],
            ['descricao' => 'Início da Cobrança', 'valor' => 'A partir do 7º mês da assinatura do contrato'],
            ['descricao' => 'Vencimento', 'valor' => 'Todo dia 10 de cada mês'],
            ['descricao' => 'Desconto', 'valor' => '5% se pago com 1 dia de antecedência'],
            ['descricao' => 'Término da Obrigação', 'valor' => 'Até o trânsito em julgado ou rescisão contratual pelo CONTRATANTE'],
        ];

        $anexo5 = [
            'local' => 'Rio de Janeiro',
            'data' => '24/07/2025',
            'contratante' => $anexo1['nome_completo'],
            'contratado' => 'MARIO JORGE DOS SANTOS TAVARES SOCIEDADE INDIVIDUAL DE ADVOCACIA',
            'oab_contratado' => 'OAB/RJ 016377-2015',
            'testemunhas' => [
                ['nome' => 'Testemunha 1', 'cpf' => '000.000.000-00'],
                ['nome' => 'Testemunha 2', 'cpf' => '111.111.111-11'],
            ],
        ];

        $headerHtml = view('layout.cabecalho', ['logo' => $logoCaminho])->render();
        $footerHtml = view('layout.rodape', [])->render();

        $defaultConfig = (new ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];

        $mpdf = new Mpdf([
            'fontDir' => array_merge($fontDirs, [
                storage_path('fonts'),
            ]),
            'fontdata' => $fontData + [
                'greatvibes' => [
                    'R' => 'GreatVibes-Regular.ttf',
                ]
            ],
            'default_font' => 'Arial',
            'margin_top' => 35,
            'margin_bottom' => 30,
            'setAutoTopMargin' => 'stretch',
            'setAutoBottomMargin' => 'stretch',
        ]);

        $mpdf->DefHTMLHeaderByName('cabecalho', $headerHtml);
        $mpdf->DefHTMLFooterByName('rodape', $footerHtml);
        $mpdf->SetHTMLHeaderByName('cabecalho');
        $mpdf->SetHTMLFooterByName('rodape');

        $html = view('contratos.contrato-honorario', [
            'anexo1' => $anexo1,
            'anexo2' => $anexo2,
            'anexo3' => $anexo3,
            'anexo4' => $anexo4,
            'anexo5' => $anexo5,
        ])->render();

        $mpdf->WriteHTML($html);

        $pdfContent = $mpdf->Output('', 'S');

        $nomeArquivo = 'contrato_honorario_teste' . '.pdf';
        $caminho = 'contratos/' . $nomeArquivo;

        Storage::put($caminho, $pdfContent);

        return response()->json([
            'mensagem' => 'PDF gerado e salvo com sucesso!',
        ]);
    }
}
