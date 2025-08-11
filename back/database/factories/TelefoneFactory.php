<?php

namespace Database\Factories;

use App\Models\Telefone;
use Illuminate\Database\Eloquent\Factories\Factory;

class TelefoneFactory extends Factory
{
    protected $model = Telefone::class;

    public function definition(): array
    {
        return [
            'tipo' => $this->faker->randomElement(['fixo', 'movel']),
            'numero' => $this->faker->phoneNumber(),
        ];
    }
}
