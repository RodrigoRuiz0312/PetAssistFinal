<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;
use App\Models\InformacionVeterinario;
use App\Models\DetallesVeterinario;

class InformacionVeterinario extends Model
{
    //
    use HasFactory;

    protected $table = 'informacion_veterinarios';
    protected $fillable = [
        'usuario_id',
        'nombre_veterinaria',
        'direccion',
        'telefono',
        'horarios',
        'servicios',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación con detalles_veterinario (asumiendo que cada veterinario tiene un solo detalle)
    public function detallesVeterinario()
    {
        return $this->hasOne(DetallesVeterinario::class); // Ajusta el nombre del campo según tu base de datos
    }
}
