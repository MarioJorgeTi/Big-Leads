<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contrato', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario')->nullable()->constrained('usuario');
            $table->string('nome');
            $table->string('arquivo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contrato');
    }
};
