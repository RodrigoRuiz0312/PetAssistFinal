<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detalles_veterinarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id');  // Clave foránea hacia usuarios
            $table->string('nombre');
            $table->string('apellidos');
            $table->string('cedula_profesional');
            $table->timestamps();
    
            $table->foreign('usuario_id')->references('id')->on('usuarios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalles_veterinarios');
    }
};
