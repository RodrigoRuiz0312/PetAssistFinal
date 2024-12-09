<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;
use App\Models\InformacionVeterinario;


use HasFactory;

class DetallesVeterinario extends Model
{
    protected $guarded = [];

    // Relación con el usuario
    public function usuario()
{
    return $this->belongsTo(Usuario::class, 'usuario_id');
}

    public function informacion()
{
    return $this->hasOne(InformacionVeterinario::class, 'usuario_id');
}

    
    public function informacionVeterinario()
{
    return $this->hasMany(InformacionVeterinario::class, 'nombre_veterinaria', 'usuario_id', );
}

}