<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class NivelAcesso
{
    public function handle(Request $request, Closure $next, ...$niveis)
    {
        $usuario = $request->user();

        $niveisPermitidos = array_map('intval', $niveis);

        if (!in_array($usuario->nivel_acesso, $niveisPermitidos)) {
            return response()->json([
                'errors' => [
                    'autenticacao' => 'Nível de acesso negado.'
                ],
            ], 403);
        }

        return $next($request);
    }
}
