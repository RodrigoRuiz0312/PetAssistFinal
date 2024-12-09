<?php
namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable as LaravelAuthenticatable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\DetallesVeterinario;
use App\Models\DetallesCliente;
use App\Models\InformacionVeterinario;

class Usuario extends Model implements Authenticatable
{
    use HasFactory, LaravelAuthenticatable, HasApiTokens;

    protected $guarded = [];

    public function cliente()
    {
        return $this->hasOne(DetallesCliente::class);
    }

    public function veterinario()
    {
        return $this->hasOne(DetallesVeterinario::class, 'usuario_id');
    }

    // Relación con informacion_veterinarios
    public function informacionVeterinario()
    {
        return $this->hasOne(InformacionVeterinario::class, 'usuario_id'); // Ajusta el campo 'usuario_id'
    }
}
