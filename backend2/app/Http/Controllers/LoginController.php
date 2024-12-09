<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Usuario; // Asegúrate de que esta ruta sea correcta
use App\Models\DetallesCliente;
use App\Models\DetallesVeterinarios;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    
    // Validar las credenciales del usuario
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        $user = Auth::user();

        // Verificar si el usuario está aprobado
        if ($user->estado !== 'aprobada') {
            Auth::logout();
            return response()->json(['error' => 'Tu cuenta aún no ha sido aprobada.'], 403);
        }

        // Inicializar variables
        $clienteId = null;
        $veterinarioId = null;
        $nombre = null;
        $apellidos = null;
        $cedula = null;
        $tipo = null; // Agregamos el campo tipo

        // Verificar si es cliente o veterinario
        if ($user->cliente) {
            $clienteId = $user->cliente->id;
            $nombre = $user->cliente->nombre;
            $apellidos = $user->cliente->apellidos;
            $tipo = 'cliente'; // Definir tipo como cliente
        } elseif ($user->veterinario) {
            $veterinarioId = $user->veterinario->id;
            $nombre = $user->veterinario->nombre;
            $apellidos = $user->veterinario->apellidos;
            $cedula = $user->veterinario->cedula_profesional;
            $tipo = 'veterinario'; // Definir tipo como veterinario
        }

        // Generar el token
        $token = $user->createToken('PetAssistApp')->plainTextToken;

        // Respuesta JSON
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'token' => $token,
            'clienteId' => $clienteId,
            'veterinarioId' => $veterinarioId,
            'nombre' => $nombre,
            'apellidos' => $apellidos,
            'email' => $user->email,
            'cedula' => $cedula,
            'tipo' => $tipo, // Devolver el tipo de usuario
        ]);
    }

    return response()->json(['error' => 'Credenciales incorrectas.'], 401);
}

    }