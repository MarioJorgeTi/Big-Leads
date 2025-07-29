<?php

namespace Database\Factories;

use App\Models\PoloPassivo;
use Illuminate\Database\Eloquent\Factories\Factory;

class PoloPassivoFactory extends Factory
{
    protected $model = PoloPassivo::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'cpf_cnpj' => $this->faker->boolean() ? $this->faker->numerify('###.###.###-##') : $this->faker->numerify('##.###.###/0001-##'),
        ];
    }
}
