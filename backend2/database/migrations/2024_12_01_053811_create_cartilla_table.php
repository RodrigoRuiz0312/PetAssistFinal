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
        Schema::create('cartilla', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('detalles_cliente_id'); // Clave foránea hacia detalles_clientes
            $table->string('nombre');
            $table->string('especie');
            $table->string('raza')->nullable();
            $table->enum('sexo', ['Macho', 'Hembra']);
            $table->string('color')->nullable();
            $table->integer('edad')->nullable(); // Puede ser en años o meses
            $table->string('senas')->nullable(); // Señas particulares
            
            $table->timestamps();

            // Relación con detalles_clientes
            $table->foreign('detalles_cliente_id')->references('id')->on('detalles_clientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cartilla');
    }
};
