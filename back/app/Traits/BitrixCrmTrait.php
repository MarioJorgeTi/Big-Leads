<?php

namespace App\Traits;

use Bitrix24\SDK\Services\ServiceBuilderFactory;
use Bitrix24\SDK\Core\Exceptions\BaseException;
use Bitrix24\SDK\Core\Exceptions\TransportException;

trait BitrixCrmTrait
{
    protected function criarLeadNoBitrix(array $dados)
    {
        try {
            $builder = ServiceBuilderFactory::createServiceBuilderFromWebhook(env('BITRIX24_WEBHOOK'));
            $resposta = $builder->getCRMScope()->deal()->add($dados)->getId();
            return [
                'sucesso' => true,
                'retorno' => $resposta
            ];
        } catch (TransportException $e) {
            return ['sucesso' => false, 'erro' => 'transport: ' . $e->getMessage(), 'codigo' => $e->getCode()];
        } catch (BaseException $e) {
            return ['sucesso' => false, 'erro' => 'base: ' . $e->getMessage(), 'codigo' => $e->getCode()];
        } catch (\Throwable $e) {
            return ['sucesso' => false, 'erro' => 'unexpected: ' . $e->getMessage(), 'codigo' => $e->getCode()];
        }
    }
}
