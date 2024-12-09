<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DetallesCliente;
use App\Models\Cartilla;
use App\Models\DetallesVeterinario;
use App\Models\informacionVeterinario;


class Cita extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'citas';

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'detalles_cliente_id',
        'cartilla_id',
        'detalles_veterinario_id',
        'fecha',
        'hora',
        'motivo',
        'notas',
        'estado',
        'motivo_reagendada',
    ];

    // Relaciones
    public function cliente()
    {
        return $this->belongsTo(DetallesCliente::class, 'detalles_cliente_id');
    }

    public function mascota()
    {
        return $this->belongsTo(Cartilla::class, 'cartilla_id');
    }

    // Relación con detalles de cliente
    public function detallesCliente()
    {
        return $this->belongsTo(DetallesCliente::class);
    }

    // Relación con Veterinario
    public function veterinario()
    {
        return $this->belongsTo(DetallesVeterinario::class, 'detalles_veterinario_id');
    }

    // Define la relación con el modelo Cartilla
    public function cartilla()
    {
        return $this->belongsTo(Cartilla::class); // Ajusta si es belongsToMany o hasOne/hasMany
    }

    public function informacionVeterinario()
{
    return $this->hasOneThrough(
        InformacionVeterinario::class,
        DetallesVeterinario::class,
        'id', // Foreign key on detalles_veterinarios table...
        'usuario_id', // Foreign key on informacion_veterinarios table...
        'detalles_veterinario_id', // Local key on citas table...
        'id' // Local key on detalles_veterinarios table...
    );
}
}