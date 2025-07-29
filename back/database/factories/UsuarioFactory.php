<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UsuarioFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name,
            'cpf_cnpj' => $this->faker->unique()->numerify('###########'),
            'email' => $this->faker->unique()->safeEmail,
            'senha' => 'senha123',
            'email_verificado' => true,
            'token_email' => null,
            'token_senha' => null,
            'nivel_acesso' => 3,
        ];
    }
}
