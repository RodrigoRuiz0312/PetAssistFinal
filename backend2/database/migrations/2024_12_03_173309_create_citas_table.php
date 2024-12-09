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
        Schema::create('citas', function (Blueprint $table) {
            $table->id();

            // Relación con clientes
            $table->unsignedBigInteger('detalles_cliente_id'); // Clave foránea hacia detalles_clientes
            $table->foreign('detalles_cliente_id')->references('id')->on('detalles_clientes')->onDelete('cascade');

            // Relación con mascotas
            $table->unsignedBigInteger('cartilla_id'); // Clave foránea hacia cartilla
            $table->foreign('cartilla_id')->references('id')->on('cartilla')->onDelete('cascade');

            $table->unsignedBigInteger('detalles_veterinario_id');
            $table->foreign('detalles_veterinario_id')->references('id')->on('detalles_veterinarios')->onDelete('cascade');

            // Datos de la cita
            $table->date('fecha'); // Fecha de la cita
            $table->time('hora'); // Hora de la cita
            $table->string('motivo')->nullable(); // Motivo de la cita
            $table->text('notas')->nullable(); // Notas adicionales sobre la cita
            // Migración actualizada para incluir el campo 'estado'
            $table->string('estado')->default('confirmada');  // O el valor que se adecue a tu lógica


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};