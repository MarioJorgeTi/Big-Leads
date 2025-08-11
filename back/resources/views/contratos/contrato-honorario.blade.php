<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Contrato</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
        }

        .texto-centralizado {
            text-align: center;
        }

        .header-table {
            width: 100%;
            margin-bottom: 20px;
        }

        .header-text {
            font-size: 10pt;
            line-height: 1.5;
            text-align: right;
        }

        .logo {
            width: 120px;
            height: auto;
        }

        .texto-grande {
            font-size: 16pt;
        }

        .texto-medio {
            font-size: 13pt;
        }

        .tab {
            text-indent: 50px;
        }
    </style>
</head>

<body>

    <h3 class="texto-centralizado">CONTRATO DE HONORÁRIO</h3>

    @php
    $enderecoCompleto = $anexo1['endereco'];
    if (!empty($anexo1['numero'])) { $enderecoCompleto .= ', nº ' . $anexo1['numero']; }
    if (!empty($anexo1['complemento'])) { $enderecoCompleto .= ', ' . $anexo1['complemento']; }
    @endphp

    <p class="texto-medio tab">
        <b>CONTRATANTE:</b> <b>{{ $anexo1['nome_completo'] }}</b>, {{ strtolower($anexo1['nacionalidade']) }}, {{ strtolower($anexo1['estado_civil']) }}, {{ strtolower($anexo1['profissao']) }},
        portador do RG {{ $anexo1['rg'] }}, inscrito no CPF {{ $anexo1['cpf'] }},
        residente e domiciliado na {{ $enderecoCompleto }},
        bairro {{ $anexo1['bairro'] }},
        {{ $anexo1['cidade'] }}/{{ $anexo1['estado'] }}, CEP {{ $anexo1['cep'] }},
        e-mail {{ $anexo1['email'] }}.
    </p>

    <p class="texto-medio tab">
        <b>CONTRATADO:</b> <b>MARIO JORGE DOS SANTOS TAVARES SOCIEDADE INDIVIDUAL DE ADVOCACIA</b>, OAB/RJ 016377-2015, CNPJ 23.177.952/0001-80,
        com escritório na Av. das Américas, 12.900 – bl.02, sala 501,
        Recreio dos Bandeirantes – Rio de Janeiro RJ – Cep. 22790-702,
        e-mail: contato@mariojorgeadvocacia.com.br;
    </p>

    <p class="tab">
        <b>1. DO OBJETO</b>
    </p>

    <p class="tab">
        Os advogados contratados se obrigam,
        com fundamento no mandato judicial que lhes foi outorgado,
        a prestar serviços profissionais na defesa dos interesses da parte contratante,
        dentro dos limites fixados na procuração anexa,
        conforme discriminado no <b>Anexo II</b> deste contrato.
    </p>

    <h4 class="texto-centralizado">Anexo II – Objeto dos Serviços Contratuais</h4>

    <p class="tab">
        O presente <b>Anexo II</b> tem por finalidade especificar,
        em formato de tabela, os serviços jurídicos contratados,
        conforme cláusula 1 do Contrato de Honorários celebrado entre as partes.
    </p>

    <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th style="text-align: left;">Tipo de Serviço</th>
                <th style="text-align: left;">Descrição</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($anexo2 as $servico)
            <tr>
                <td>{{ $servico['tipo'] }}</td>
                <td>{{ $servico['descricao'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <p class="tab">
        Observação: Na hipótese de propositura de ação revisional,
        o contratante compromete-se a efetuar o depósito mensal em juízo dos valores incontroversos durante todo o curso do processo,
        sob pena de indeferimento da petição inicial, conforme jurisprudência dominante.
    </p>

    <p class="tab">
        O <b>Anexo II</b> especifica os serviços jurídicos contratados,
        abrangendo a atuação nas respectivas ações judiciais indicadas,
        inclusive ações revisionais, de execução, busca e apreensão,
        monitórias, dentre outras.
    </p>

    <p class="tab">
        Na hipótese de propositura de ação revisional de contrato,
        o CONTRATANTE obriga-se a efetuar o depósito mensal em juízo dos valores incontroversos,
        correspondentes ao montante que reconhece como devido,
        durante todo o curso do processo.
    </p>

    <p class="tab">
        O não cumprimento dessa obrigação poderá ensejar o indeferimento da petição inicial,
        nos termos do entendimento jurisprudencial e legal aplicável,
        especialmente diante do princípio da boa-fé processual.
    </p>

    <p class="tab">
        <b>2. DAS ATIVIDADES</b>
    </p>

    <p>
        As atividades compreendidas na prestação de serviços objeto
        deste contrato abrangem todos os atos inerentes ao exercício da
        advocacia, conforme previsto no Estatuto da Ordem dos Advogados
        do Brasil e no instrumento de mandato outorgado. Além das
        atividades expressamente previstas na procuração, também estão
        incluídas:
    </p>

    <p class="tab">
        1.&nbsp;&nbsp;&nbsp;&nbsp;Atendimento inicial ao cliente;
    </p>

    <p class="tab">
        2.&nbsp;&nbsp;&nbsp;&nbsp;Elaboração da petição inicial;
    </p>

    <p class="tab">
        3.&nbsp;&nbsp;&nbsp;&nbsp;Realização de cálculos judiciais necessários;
    </p>

    <p class="tab">
        4.&nbsp;&nbsp;&nbsp;&nbsp;Distribuição da peça judicial;
    </p>

    <p class="tab">
        5.&nbsp;&nbsp;&nbsp;&nbsp;Atendimento telefônico ao cliente, de segunda a sexta-feira,
        durante o horário comercial, em todos os dias úteis do ano;
    </p>

    <p class="tab">
        6.&nbsp;&nbsp;&nbsp;&nbsp;Atendimento presencial,
        quando previamente solicitado por e-mail (contato@mariojorgeadvocacia.com)
        ou pelos telefones indicados neste instrumento;
    </p>

    <p class="tab">
        7.&nbsp;&nbsp;&nbsp;&nbsp;Acompanhamento processual completo;
    </p>

    <p class="tab">
        8.&nbsp;&nbsp;&nbsp;&nbsp;Apresentação de petições interlocutórias no curso do processo.
    </p>

    <p class="tab">
        <b>2.1 INÍCIO DA DEFESA EM AÇÕES DE EXECUÇÃO</b>
    </p>

    <p class="tab">
        No caso de ações de execução,
        o CONTRATADO somente iniciará a elaboração da defesa,
        inclusive embargos à execução ou qualquer outro meio de defesa cabível,
        após a efetiva citação do CONTRATANTE no processo executivo.
        Fica ressalvado que, até esse momento, o CONTRATADO poderá realizar
        atos preparatórios e de orientação, sem que isso implique obrigação
        de protocolo de peças processuais.
    </p>

    <p class="tab">
        <b>3. DOS ATOS PROCESSUAIS</b>
    </p>

    <p class="tab">
        Havendo necessidade de contratação de outros profissionais,
        no decurso do processo, o CONTRATADO elaborará substabelecimento,
        indicando os advogados de seu conhecimento.
    </p>

    <p class="tab">
        <b>4. DOS HONORÁRIOS CONTRATUAIS</b>
    </p>

    <p class="tab">
        As condições relativas à remuneração ajustada entre as partes pela prestação dos
        serviços objeto deste contrato estão detalhadas no
        <b>Anexo III – Honorários Contratuais</b>, que integra este instrumento para
        todos os fins de direito.
    </p>

    <p class="tab">
        O referido anexo apresenta de forma discriminada os valores de entrada,
        as parcelas mensais, a data de vencimento, os critérios de cobrança de honorários
        de êxito e as demais disposições financeiras acordadas entre as partes.
    </p>

    <p class="tab">
        O CONTRATANTE declara ciência e concordância com todos os valores ali descritos,
        obrigando-se ao seu integral cumprimento nas condições e prazos estipulados.
    </p>

    <h4 class="texto-centralizado">Anexo III – Honorários Contratuais</h4>

    <p class="tab">
        O presente Anexo III apresenta, de forma detalhada, os valores ajustados
        a título de honorários contratuais, nos termos da cláusula 4 do Contrato
        de Honorários celebrado entre as partes.
    </p>

    <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th style="text-align: left;">Descrição</th>
                <th style="text-align: left;">Valor / Condição</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($anexo3 as $linha)
            <tr>
                <td>{{ $linha['descricao'] }}</td>
                <td>{{ $linha['valor'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <p class="tab">
        <b>5. VALOR DE MANUTENÇÃO</b>
    </p>

    <p class="tab">
        As condições relativas ao valor mensal de manutenção dos serviços
        advocatícios prestados estão detalhadas no
        <b>Anexo IV – Valor de Manutenção Contratual</b>,
        que integra o presente contrato para todos os fins.
    </p>

    <h4 class="texto-centralizado">Anexo IV – Valor de Manutenção Contratual</h4>

    <p class="tab">
        Nos termos da cláusula 5 do Contrato de Honorários celebrado entre as partes,
        fica estabelecido o seguinte valor de manutenção mensal referente ao acompanhamento
        do processo judicial:
    </p>

    <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th style="text-align: left;">Descrição</th>
                <th style="text-align: left;">Valor / Condição</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($anexo4 as $linha)
            <tr>
                <td>{{ $linha['descricao'] }}</td>
                <td>{{ $linha['valor'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <p class="tab">
        Conforme especificado no referido anexo, a partir do sétimo mês contado da
        assinatura deste instrumento, será devido pelo CONTRATANTE o valor mensal
        de R$ 200,00 (duzentos reais), com vencimento no dia 10 de cada mês, a título
        de acompanhamento e manutenção do processo em curso.
    </p>

    <p class="tab">
        Caso o pagamento seja realizado com um dia de antecedência, será
        concedido desconto de 5% (cinco por cento) sobre o valor mensal.
    </p>

    <p class="tab">
        O valor da manutenção será exigido até o trânsito em
        julgado da demanda ou até a data de eventual rescisão contratual
        por iniciativa do CONTRATANTE.
    </p>

    <p class="tab">
        <b>6. CONDIÇÃO DE EFICÁCIA DO CONTRATO – INÍCIO DA PRESTAÇÃO DE SERVIÇOS</b>
    </p>

    <p class="tab">
        O presente contrato somente produzirá efeitos e os serviços profissionais
        somente terão início após a efetiva comprovação do pagamento da quantia
        referente à entrada mencionada na cláusula 1, sendo esta condição essencial
        para a validade da contratação. Enquanto não houver o pagamento inicial acordado,
        o CONTRATADO não estará obrigado à prática de qualquer ato jurídico ou processual,
        não podendo ser responsabilizado por eventuais prejuízos decorrentes da inércia
        processual ou perda de prazos.
    </p>

    <p class="tab">
        <b>7. ATRASO NO PAGAMENTO:</b>
    </p>

    <p class="tab">
        <b>7.1 </b>Em caso de atraso no pagamento das obrigações contratuais,
        incidirá multa de 10% (dez por cento) sobre o valor devido, acrescida de
        juros moratórios de 1% (um por cento) ao mês e correção monetária com base no IGP-M.
    </p>

    <p class="tab">
        <b>7.2 </b>Caso o atraso ultrapasse 3 (três) meses consecutivos,
        o contrato será automaticamente rescindido, sem prejuízo das medidas
        legais cabíveis para cobrança dos valores devidos até a data da rescisão.
    </p>

    <p class="tab">
        <b>7.3 </b>A parte contratante caberá o pagamento das
        custas e demais despesas necessárias ao andamento da ação, bem
        como o fornecimento de documentos e informações que os advogados contratados
        solicitarem.
    </p>

    <p class="tab">
        <b>7.4 </b>No caso de obtenção de sentença favorável, independentemente
        do pagamento, por parte do contratante, do total dos honorários ajustados na
        cláusula segunda, os honorários sucumbenciais pertencerão na sua totalidade
        aos advogados contratados.
    </p>

    <p class="tab">
        <b>8. PAGAMENTO INTEGRAL DOS HONORÁRIOS EM CASO DE ACORDO</b>
    </p>

    <p class="tab">
        No caso de celebração de acordo judicial ou extrajudicial, independentemente
        da fase processual em que se encontre a demanda, o CONTRATANTE se compromete a
        quitar integralmente os honorários advocatícios ajustados neste contrato.
    </p>

    <p class="tab">
        <b>8.1 </b>O pagamento deverá ser realizado no ato da assinatura do acordo
        entre as partes, sob pena de incidência das penalidades previstas neste instrumento.
    </p>

    <p class="tab">
        <b>8.2 </b>O CONTRATADO poderá reter qualquer valor decorrente do acordo
        realizado até a quitação integral dos honorários ajustados, podendo, para tanto,
        requerer a reserva dos honorários diretamente nos autos do processo ou perante a
        parte adversa.
    </p>

    <p class="tab">
        <b>9. PENALIDADE EM CASO DE RESCISÃO PELO CONTRATANTE</b>
    </p>

    <p class="tab">
        <b>9.1 </b>Em caso de rescisão unilateral do presente contrato por iniciativa do
        CONTRATANTE, este ficará obrigado ao pagamento de multa compensatória equivalente
        a 30% (trinta por cento) do saldo restante dos honorários pactuados, além dos
        valores já vencidos até a data da rescisão.
    </p>

    <p class="tab">
        <b>9.2 </b>Caso a rescisão ocorra após a propositura da ação ou a realização de
        atos processuais relevantes, incluindo a elaboração de petições iniciais,
        defesas, recursos, sustentações orais ou qualquer outro serviço jurídico prestado
        pelo CONTRATADO, será devido pelo CONTRATANTE o pagamento integral dos honorários
        iniciais e das parcelas vencidas, acrescido da multa prevista na clausula 9.1.
    </p>

    <p class="tab">
        <b>9.3 </b>A rescisão contratual por parte do CONTRATANTE não exime o pagamento
        dos honorários de êxito sobre valores já recebidos ou a serem recebidos em
        decorrência do trabalho desenvolvido pelo CONTRATADO até a data da rescisão, nos
        termos deste contrato.
    </p>

    <p class="tab">
        <b>9.4 </b>O CONTRATANTE declara estar ciente de que a rescisão não afeta
        o direito do CONTRATADO ao recebimento dos honorários sucumbenciais eventualmente
        fixados na ação, que pertencem exclusivamente ao advogado nos termos do artigo 23
        do Estatuto da OAB (Lei nº 8.906/1994).
    </p>

    <p class="tab">
        <b>10. CLÁUSULA DE PROTEÇÃO DE DADOS PESSOAIS</b>
    </p>

    <p class="tab">
        O CONTRATANTE autoriza o fornecimento de seus dados pessoais e uma fotografia tipo
        "selfie" para fins de conferência de identidade pelo CONTRATADO, exclusivamente para
        a execução dos serviços previstos neste contrato.
    </p>

    <p class="tab">
        O CONTRATADO compromete-se a proteger essas informações,
        utilizando-as em conformidade com a Lei Geral de Proteção de Dados
        (Lei nº 13.709/2018), garantindo sigilo, segurança contra acessos não autorizados e
        exclusão dos dados ao término do contrato, salvo obrigação legal em contrário.
    </p>

    <p class="tab">
        <b>11. CLÁUSULA DE VALIDADE JURÍDICA DA ASSINATURA DIGITAL</b>
    </p>

    <p class="tab">
        As partes acordam que o presente contrato será assinado digitalmente por meio da
        plataforma Clicksign, utilizando tecnologia de certificação digital que assegura a
        autenticidade, integridade e validade jurídica do documento, nos termos da legislação
        vigente, incluindo a Medida Provisória nº 2.200-2/2001.
    </p>

    <p class="tab">
        A assinatura digital realizada pela plataforma terá o mesmo efeito legal que
        uma assinatura física, sendo plenamente válida e eficaz para todos os fins
        de direito.
    </p>

    <p class="tab">
        <b>12. LIMITAÇÃO DA ABRANGÊNCIA DOS SERVIÇOS CONTRATADOS</b>
    </p>

    <p class="tab">
        <b>12.1 </b>O presente contrato abrange exclusivamente a atuação do CONTRATADO
        na fase de primeira instância do processo judicial, conforme especificado na
        cláusula 1.
    </p>

    <p class="tab">
        <b>12.2 </b>A contratação dos serviços não inclui a interposição de recursos
        perante tribunais de segunda instância (Tribunal de Justiça, Tribunal Regional
        Federal, Tribunal Regional do Trabalho, entre outros), nem a realização de
        sustentação oral, embargos de declaração, agravos ou qualquer outra medida recursal,
        salvo contratação específica mediante aditivo contratual e pagamento de honorários
        adicionais a serem previamente acordados entre as partes.
    </p>

    <p class="tab">
        <b>12.3 </b>Caso a parte CONTRATANTE tenha interesse em prosseguir com a demanda em
        instâncias superiores, deverá negociar novos honorários com o CONTRATADO,
        firmando contrato adicional para a prestação dos serviços recursais.
    </p>

    <p class="tab">
        <b>13. CLÁUSULA DE MANUTENÇÃO DE CONTATO E ATUALIZAÇÃO DE DADOS</b>
    </p>

    <p class="tab">
        O CONTRATANTE se compromete a manter seus dados de contato sempre atualizados
        junto ao CONTRATADO, especialmente endereço, telefone e e-mail, para viabilizar a
        comunicação sobre o andamento dos serviços.
    </p>

    <p class="tab">
        A ausência de contato por mais de 30 (trinta) dias ou a falta de atualização
        cadastral autoriza o CONTRATADO a renunciar ao mandato, mediante simples aviso
        por qualquer meio informado anteriormente, sem prejuízo da cobrança dos honorários
        já vencidos.
    </p>

    <p class="tab">
        O CONTRATADO poderá reter documentos ou valores do CONTRATANTE até a quitação de
        eventuais pendências financeiras.
    </p>

    <p class="tab">
        <b>14. FORO COMPETENTE</b>
    </p>

    <p class="tab">
        Fica estabelecido o foro da Cidade do domicilio do CONTRATANTE para discussão
        judicial deste contrato, excluindo-se outro foro, mesmo que seja mais privilegiado.
    </p>

    <p class="tab">
        E, por estarem justos, contratados, cientes e de acordo com todas as
        cláusulas e condições do presente contrato, as partes assinam este instrumento
        em <b>2 (duas) vias</b> para um só efeito.
    </p>

    <p class="tab">
        As informações referentes à identificação das partes e respectivas assinaturas,
        incluindo os campos destinados à qualificação das testemunhas, constam do Anexo V
        deste contrato.
    </p>

    <p class="tab">
        O referido anexo integra o presente instrumento para todos os fins de direito,
        contendo:
    </p>

    <p class="tab">
        1.&nbsp;&nbsp;&nbsp;&nbsp;Local e data de assinatura;
    </p>

    <p class="tab">
        2.&nbsp;&nbsp;&nbsp;&nbsp;Nome e identificação do CONTRATANTE;
    </p>

    <p class="tab">
        3.&nbsp;&nbsp;&nbsp;&nbsp;Nome e identificação do CONTRATADO;
    </p>

    <p class="tab">
        4.&nbsp;&nbsp;&nbsp;&nbsp;Espaço para assinatura e identificação de duas testemunhas, com nome completo e CPF.
    </p>

    <h4 class="texto-centralizado">Anexo V – Assinaturas e Identificação das Partes</h4>

    <br>
    <table width="100%" style="font-size: 12pt; margin-top: 30px;">
        <tr>
            <td><b>LOCAL:</b> {{ $anexo5['local'] }}</td>
            <td><b>DATA:</b> {{ $anexo5['data'] }}</td>
        </tr>
    </table>

    <br>

    @php
    $nome = $anexo5['contratante'];
    $tamanhoNome = strlen($nome);
    $espacosFaltando = max(0, 50 - $tamanhoNome);
    $nomeComEspacos = $nome . str_repeat('&nbsp;', $espacosFaltando);
    $nomeContratado = 'Mario Jorge S. Tavares';
    $tamanhoNomeContratado = strlen($nomeContratado);
    $espacosContratado = max(0, 50 - $tamanhoNomeContratado);
    $nomeContratadoComEspacos = $nomeContratado . str_repeat('&nbsp;', $espacosContratado);
    @endphp

    <table width="100%" style="font-size: 12pt;">
        <tr>
            <td>
                <b>CONTRATANTE: </b>
                <br><br>
                <div style="width: 300px; text-align: center; font-family: 'greatvibes', cursive; font-size: 20pt; text-decoration: underline;">
                    {!! $nomeComEspacos !!}
                </div>
                <i>Assinatura</i>
            </td>
        </tr>
        <br><br><br>
        <tr>
            <td>
                <b>CONTRATADO: </b>
                <br><br>
                <div style="width: 300px; text-align: center; font-family: 'greatvibes', cursive; font-size: 20pt; text-decoration: underline;">
                    {!! $nomeContratadoComEspacos !!}
                </div>
                <i>Assinatura</i>
            </td>
        </tr>
    </table>

    <br><br>

    <b>Testemunhas:</b>
    <br><br>

    <table width="100%" style="font-size: 12pt;">
        @php
        $nome1 = $anexo5['testemunha1_nome'] ?? '';
        $cpf1 = $anexo5['testemunha1_cpf'] ?? '';
        $nome2 = $anexo5['testemunha2_nome'] ?? '';
        $cpf2 = $anexo5['testemunha2_cpf'] ?? '';
        $espacos1 = str_repeat('&nbsp;', max(0, 50 - strlen($nome1)));
        $espacos2 = str_repeat('&nbsp;', max(0, 50 - strlen($nome2)));
        @endphp

        <tr>
            <td>
                <b>Nome: </b>
                <span style="display: inline-block; width: 300px; text-align: center; font-family: 'greatvibes', cursive; font-size: 16pt; text-decoration: underline;">
                    {!! $nome1 . $espacos1 !!}
                </span>
                <br>
                CPF: {{ $cpf1 }}
            </td>
        </tr>

        <tr>
            <td><br><br></td>
        </tr>

        <tr>
            <td>
                <b>Nome: </b>
                <span style="display: inline-block; width: 300px; text-align: center; font-family: 'greatvibes', cursive; font-size: 16pt; text-decoration: underline;">
                    {!! $nome2 . $espacos2 !!}
                </span>
                <br>
                CPF: {{ $cpf2 }}
            </td>
        </tr>
    </table>

</body>

</html>