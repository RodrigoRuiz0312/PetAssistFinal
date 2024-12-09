<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetallesVeterinario;
use App\Models\Usuario;
use App\Models\InformacionVeterinario;

class VeterinarioController extends Controller
{
    // Mostrar el perfil del veterinario
    public function mostrarPerfil($veterinarioId)
{
    // Recuperar el veterinario junto con la información relacionada
    $veterinario = DetallesVeterinario::join('usuarios', 'detalles_veterinarios.usuario_id', '=', 'usuarios.id')
        ->join('informacion_veterinarios', 'usuarios.id', '=', 'informacion_veterinarios.usuario_id')
        ->select(
            'detalles_veterinarios.id',
            'detalles_veterinarios.nombre',
            'detalles_veterinarios.apellidos',
            'detalles_veterinarios.cedula_profesional',
            'usuarios.email',
            'informacion_veterinarios.nombre_veterinaria',
            'informacion_veterinarios.direccion',
            'informacion_veterinarios.telefono',
            'informacion_veterinarios.horarios',
            'informacion_veterinarios.servicios'
        )
        ->where('detalles_veterinarios.id', $veterinarioId)
        ->first();

    // Verificar si se encontró el veterinario
    if (!$veterinario) {
        return response()->json([
            'message' => 'Veterinario no encontrado.',
        ], 404);
    }

    // Preparar la respuesta con la información del perfil
    $perfil = [
        'nombre' => $veterinario->nombre,
        'apellidos' => $veterinario->apellidos,
        'cedula' => $veterinario->cedula_profesional,
        'email' => $veterinario->email, // Email desde la tabla 'usuarios'
        'nombre_veterinaria' => $veterinario->nombre_veterinaria,
        'direccion' => $veterinario->direccion,
        'telefono' => $veterinario->telefono,
        'horarios' => $veterinario->horarios,
        'servicios' => $veterinario->servicios,
    ];

    // Devolver la información del perfil
    return response()->json([
        'message' => 'Perfil obtenido con éxito',
        'data' => $perfil,
    ], 200);
}


    // Actualizar la información del veterinario
    public function actualizarPerfil(Request $request, $veterinarioId)
{
    // Validación de los datos
    $validatedData = $request->validate([
        'nombre_veterinaria' => 'required|string',
        'direccion' => 'required|string',
        'telefono' => 'required|string',
        // Otros campos que desees validar
    ]);

    // Buscar el veterinario
    $veterinario = DetallesVeterinario::find($veterinarioId);

    if (!$veterinario) {
        return response()->json(['message' => 'Veterinario no encontrado.'], 404);
    }

    // Actualizar los datos
    $veterinario->informacionVeterinario->update($validatedData);

    return response()->json(['message' => 'Perfil actualizado correctamente.']);
}


    // Listar veterinarios
    public function listarVeterinarios()
{
    // Recuperar todos los veterinarios disponibles
    $veterinarios = DetallesVeterinario::join('informacion_veterinarios', 'detalles_veterinarios.usuario_id', '=', 'informacion_veterinarios.usuario_id')
        ->select('detalles_veterinarios.id','detalles_veterinarios.nombre', 'detalles_veterinarios.apellidos', 'detalles_veterinarios.cedula_profesional', 
                 'informacion_veterinarios.servicios', 'informacion_veterinarios.horarios', 
                 'informacion_veterinarios.direccion', 'informacion_veterinarios.telefono')
        ->get();

    return response()->json($veterinarios);
}
}