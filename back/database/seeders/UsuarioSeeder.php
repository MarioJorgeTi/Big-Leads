<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        $fixos = [
            ['nome' => 'Ian Germano', 'cpf_cnpj' => '13927938742', 'email' => 'ian_germano@hotmail.com', 'nivel_acesso' => 1],
            ['nome' => 'Carlos Alberto', 'cpf_cnpj' => '98765432100', 'email' => 'carlosammgomes@gmail.com', 'nivel_acesso' => 1],
            ['nome' => 'Teste Diretor', 'cpf_cnpj' => '65432132100', 'email' => 'testediretor@teste.com', 'nivel_acesso' => 1],
            ['nome' => 'Teste Gerente', 'cpf_cnpj' => '25765432100', 'email' => 'testegerente@teste.com', 'nivel_acesso' => 2],
            ['nome' => 'Teste Vendedor', 'cpf_cnpj' => '34765432100', 'email' => 'testevendedor@teste.com', 'nivel_acesso' => 3],
            ['nome' => 'Teste Tramit', 'cpf_cnpj' => '30956732790', 'email' => 'testetramit@teste.com', 'nivel_acesso' => 4],
            ['nome' => 'Teste Jurídico', 'cpf_cnpj' => '31985452180', 'email' => 'testejuridico@teste.com', 'nivel_acesso' => 5],
        ];
        foreach ($fixos as $dados) {
            Usuario::create([
                'nome' => $dados['nome'],
                'cpf_cnpj' => $dados['cpf_cnpj'],
                'email' => $dados['email'],
                'senha' => '123',
                'email_verificado' => true,
                'nivel_acesso' => $dados['nivel_acesso'],
            ]);
        }
        $diretores = Usuario::where('nivel_acesso', 1)->get();
        $gerentes = collect();
        for ($i = 0; $i < 5; $i++) {
            $gerentes->push(
                Usuario::factory()->create([
                    'nivel_acesso' => 2,
                    'id_superior' => $diretores->random()->id,
                    'senha' => '123',
                ])
            );
        }
        foreach ($gerentes as $gerente) {
            Usuario::factory()->count(10)->state(['nivel_acesso' => 3, 'id_superior' => $gerente->id, 'senha' => '123'])->create();
        }
        Usuario::factory()->count(5)->state(['nivel_acesso' => 4, 'senha' => '123'])->create();
        Usuario::factory()->count(5)->state(['nivel_acesso' => 5, 'senha' => '123'])->create();
    }
}
