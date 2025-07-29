<?php

namespace Database\Factories;

use App\Models\Documento;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentoFactory extends Factory
{
    protected $model = Documento::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->word() . '.pdf',
            'arquivo' => 'processos/' . $this->faker->uuid() . '.pdf',
        ];
    }
}
