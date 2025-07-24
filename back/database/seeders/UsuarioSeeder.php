<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        Usuario::create([
            'nome' => 'Ian Germano',
            'cpf_cnpj' => '13927938742',
            'email' => 'ian_germano@hotmail.com',
            'senha' => '123',
            'email_verificado' => true,
            'nivel_acesso' => 1,
        ]);

        Usuario::create([
            'nome' => 'Carlos Alberto',
            'cpf_cnpj' => '98765432100',
            'email' => 'carlosammgomes@gmail.com',
            'senha' => '123',
            'email_verificado' => true,
            'nivel_acesso' => 1,
        ]);

        Usuario::create([
            'nome' => 'Teste Gerente',
            'cpf_cnpj' => '25765432100',
            'email' => 'testegerente@gmail.com',
            'senha' => '123',
            'email_verificado' => true,
            'nivel_acesso' => 2,
        ]);

        Usuario::create([
            'nome' => 'Teste Comercial',
            'cpf_cnpj' => '34765432100',
            'email' => 'testecomercial@gmail.com',
            'senha' => '123',
            'email_verificado' => true,
            'nivel_acesso' => 3,
        ]);

        Usuario::factory()->count(8)->create();
    }
}
