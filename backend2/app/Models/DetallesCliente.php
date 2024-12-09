<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;

use HasFactory;

class DetallesCliente extends Model
{

    protected $guarded = [];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function cartilla()
    {
        return $this->hasMany(Cartilla::class, 'detalles_cliente_id');
    }

    public function citas()
    {
        return $this->hasMany(Cita::class, 'detalles_cliente_id');
    }

}