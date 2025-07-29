<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

trait AssertivaTrait
{
    public function obterToken()
    {
        $token = Cache::get('assertiva_access_token');
        if ($token) {
            return response()->json([
                'success' => [
                    'mensagem' => 'Token obtido com sucesso.',
                    'token' => $token
                ]
            ], 200);
        }
        $clientId = env('ASSERTIVA_CLIENT_ID');
        $clientSecret = env('ASSERTIVA_CLIENT_SECRET');
        $url = env('ASSERTIVA_TOKEN_URL');
        $response = Http::asForm()->withBasicAuth($clientId, $clientSecret)->post($url, ['grant_type' => 'client_credentials']);
        if ($response->successful()) {
            $data = $response->json();
            Cache::put('assertiva_access_token', $data['access_token'], now()->addMinutes(29));
            return response()->json([
                'success' => [
                    'mensagem' => 'Token gerado com sucesso.',
                    'token' => $data['access_token']
                ]
            ], 200);
        }
        return response()->json([
            'errors' => [
                'mensagem' => 'Não foi possível obter o token da Assertiva.',
                'detalhes' => $response->json()
            ]
        ], $response->status());
    }

    public function consultarCpfCnpj(string $cpfcnpj)
    {
        if (!preg_match('/^\d+$/', $cpfcnpj) || !in_array(strlen($cpfcnpj), [11, 14])) {
            return response()->json([
                'errors' => [
                    'mensagem' => 'Formato inválido. Informe apenas números. CPF (11 dígitos) ou CNPJ (14 dígitos).'
                ]
            ], 422);
        }
        if (strlen($cpfcnpj) === 11) {
            $tipo = 'cpf';
            $url = 'https://api.assertivasolucoes.com.br/localize/v3/cpf';
            $documentoFormatado = substr($cpfcnpj, 0, 3) . '.' . substr($cpfcnpj, 3, 3) . '.' .  substr($cpfcnpj, 6, 3) . '-' . substr($cpfcnpj, 9, 2);
        } else {
            $tipo = 'cnpj';
            $url = 'https://api.assertivasolucoes.com.br/localize/v3/cnpj';
            $documentoFormatado = substr($cpfcnpj, 0, 2) . '.' . substr($cpfcnpj, 2, 3) . '.' . substr($cpfcnpj, 5, 3) . '/' . substr($cpfcnpj, 8, 4) . '-' . substr($cpfcnpj, 12, 2);
        }
        $idFinalidade = 4;
        $token = Cache::get('assertiva_access_token');
        if (!$token) {
            $tokenResponse = $this->obterToken();
            $status = $tokenResponse->status();
            $data = $tokenResponse->getData(true);
            if ($status !== 200) {
                return response()->json([
                    'errors' => [
                        'mensagem' => 'Falha ao obter token da Assertiva.',
                        'detalhes' => $data
                    ]
                ], $status);
            }
            $token = $data['success']['token'];
        }
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];
        $payload = [
            'idFinalidade' => $idFinalidade,
            $tipo => $documentoFormatado,
        ];
        $consultaResponse = Http::withHeaders($headers)->get($url, $payload);
        if ($consultaResponse->successful()) {
            return response()->json([
                'success' => [
                    'mensagem' => 'Consulta realizada com sucesso.',
                    'dados' => $consultaResponse->json(),
                ]
            ], 200);
        }
        return response()->json([
            'errors' => [
                'mensagem' => 'Erro ao consultar CPF na Assertiva.',
                'detalhes' => $consultaResponse->json(),
            ]
        ], $consultaResponse->status());
    }
}
