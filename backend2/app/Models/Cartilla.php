<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DetallesCliente;

class Cartilla extends Model
{
    use HasFactory;

    protected $table = 'cartilla';
    protected $fillable = [
        'detalles_cliente_id',
        'nombre',
        'especie',
        'raza',
        'sexo',
        'color',
        'edad',
        'senas',
    ];

    public function cliente()
    {
        return $this->belongsTo(DetallesCliente::class, 'detalles_cliente_id');
    }

    // Relación con Citas
    public function citas()
    {
        return $this->hasMany(Cita::class, 'cartilla_id');
    }
}