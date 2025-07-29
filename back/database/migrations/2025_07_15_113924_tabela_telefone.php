<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('telefone', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
            $table->string('numero');
            $table->foreignId('id_polo_passivo')->constrained('polo_passivo')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('telefone');
    }
};
