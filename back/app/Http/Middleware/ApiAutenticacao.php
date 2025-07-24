<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Auth\AuthenticationException;

class ApiAutenticacao extends Middleware
{
    protected function redirectTo($request)
    {
        return null;
    }

    public function handle($request, Closure $next, ...$guards)
    {
        if (!$request->bearerToken()) {
            return response()->json([
                'errors' => [
                    'autenticacao' => ['Token ausente.']
                ]
            ], 401);
        }
        try {
            return parent::handle($request, $next, ...$guards);
        } catch (AuthenticationException $e) {
            return response()->json([
                'errors' => [
                    'autenticacao' => ['Token inválido ou expirado.']
                ]
            ], 401);
        }
    }
}
