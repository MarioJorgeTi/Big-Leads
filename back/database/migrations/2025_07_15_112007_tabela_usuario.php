<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('usuario', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cpf_cnpj')->unique();
            $table->string('email')->unique();
            $table->string('senha');
            $table->boolean('email_verificado')->default(false);
            $table->string('token_email')->nullable();
            $table->string('token_senha')->nullable();
            $table->integer('nivel_acesso')->default(3);
            $table->foreignId('id_superior')->nullable()->constrained('usuario')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuario');
    }
};
