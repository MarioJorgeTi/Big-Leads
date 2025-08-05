<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mpdf\Mpdf;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;
use App\Http\Requests\ContratoHonorarioRequest;
use Carbon\Carbon;

class ContratoController extends Controller
{
    public function gerarContratoHonorario(ContratoHonorarioRequest $request)
    {
        $dados = $request->validated();
        
        $numero_processo = $dados['numero_processo'];
        $anexo1 = $dados['anexo1'];
        $anexo2 = [];
        $anexo3Cru = $dados['anexo3'];
        $anexo4Cru = $dados['anexo4'];
        $anexo5Cru = $dados['anexo5'];
        $anexo6Cru = $dados['anexo6'];
        $data_pagamento = Carbon::parse($anexo5Cru['contrato_data'])->format('d/m/Y');

        $mapaDescricoes = [
            'Ação Revisional' => 'Propositura de ação revisional de contrato bancário com pedido de revisão de juros abusivos.',
            'Busca e Apreensão' => 'Apresentação de defesa em ação de busca e apreensão – Processo nº ' . $numero_processo,
            'Execução de Título Extrajudicial' => 'Embargos à Execução (ação incidental autônoma). Exceção de Pré-Executividade (instrumento excepcional, cabível para matérias de ordem pública ou ausências de pressupostos legais da execução)',
            'Ação Monitória' => 'Apresentar os embargos à ação monitória.',
            'Ação de Despejo' => 'Apresentar a contestação cabível.',
        ];

        foreach ($dados['anexo2']['servicos'] as $tipo) {
            if (isset($mapaDescricoes[$tipo])) {
                $anexo2[] = [
                    'tipo' => $tipo,
                    'descricao' => $mapaDescricoes[$tipo],
                ];
            }
        }

        $anexo3 = [
            ['descricao' => 'Entrada', 'valor' => 'R$ ' . number_format($anexo3Cru['entrada'], 2, ',', '.')],
            ['descricao' => 'Parcelas', 'valor' => $anexo3Cru['parcelas'] . ' parcelas'],
            ['descricao' => 'Data de Pagamento', 'valor' => $data_pagamento],
            ['descricao' => 'Honorários de Êxito', 'valor' => 'R$ ' . number_format($anexo3Cru['honorario_exito'], 2, ',', '.')],
            ['descricao' => 'Condição para Honorários de Êxito', 'valor' => 'Devido somente se houver recebimento de valores na ação judicial'],
            ['descricao' => 'Observação', 'valor' => $anexo3Cru['observacao'] ?? ''],
        ];

        $anexo4 = [
            ['descricao' => 'Valor Mensal', 'valor' => 'R$ ' . number_format($anexo4Cru['valor_mensal'], 2, ',', '.')],
            ['descricao' => 'Início da Cobrança', 'valor' => Carbon::parse($anexo4Cru['inicio_cobranca'])->format('d/m/Y')],
            ['descricao' => 'Vencimento', 'valor' => Carbon::parse($anexo4Cru['vencimento'])->format('d/m/Y')],
            ['descricao' => 'Término da Obrigação', 'valor' => Carbon::parse($anexo4Cru['termino_obrigacao'])->format('d/m/Y')],
        ];

        $anexo5 = [
            'local' => $anexo5Cru['local'],
            'data' => Carbon::parse($anexo5Cru['contrato_data'])->format('d/m/Y'),
            'contratante' => $anexo5Cru['contratante'],
            'contratado' => $anexo5Cru['contratado'],
            'oab_contratado' => $anexo5Cru['oab_contratado'],
            'testemunha1_nome' => $anexo6Cru['testemunha1_nome'],
            'testemunha1_cpf' => $anexo6Cru['testemunha1_cpf'],
            'testemunha2_nome' => $anexo6Cru['testemunha2_nome'],
            'testemunha2_cpf' => $anexo6Cru['testemunha2_cpf'],
        ];

        $logo = public_path('imagens/mario-jorge-logo.png');
        $logoCaminho = 'data:image/png;base64,' . base64_encode(file_get_contents($logo));

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

        $nomeArquivo = 'contrato_honorario_' . $numero_processo . '.pdf';
        $caminho = 'contratos/' . $nomeArquivo;

        Storage::put($caminho, $pdfContent);

        $pdfBase64 = base64_encode($pdfContent);

        return response()->json([
            'success' => [
                'mensagem' => 'PDF gerado e salvo com sucesso!',
                'pdf' => $pdfBase64,
                'nome_arquivo' => $nomeArquivo,
                'tipo' => 'application/pdf'
            ]
        ], 200);
    }
}
