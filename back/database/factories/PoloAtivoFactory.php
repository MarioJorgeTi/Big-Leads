<?php

namespace Database\Factories;

use App\Models\PoloAtivo;
use Illuminate\Database\Eloquent\Factories\Factory;

class PoloAtivoFactory extends Factory
{
    protected $model = PoloAtivo::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'cpf_cnpj' => $this->faker->boolean() ? $this->faker->numerify('###.###.###-##') : $this->faker->numerify('##.###.###/0001-##'),
        ];
    }
}
