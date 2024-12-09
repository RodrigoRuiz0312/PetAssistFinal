<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\DetallesCliente;
use App\Models\DetallesVeterinario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Mail\CuentaEnRevision;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|min:6',
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'tipo' => 'required|in:cliente,veterinario',
            'cedula_profesional' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Crear el usuario en la tabla de usuarios
        $usuario = Usuario::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'tipo' => $request->tipo,  // Asegúrate de que el tipo se guarde correctamente
        ]);

        // Crear el detalle del cliente o veterinario
        if ($request->tipo == 'cliente') {
            // Crear el detalle para clientes
            $usuario->cliente()->create([
                'nombre' => $request->nombre,
                'apellidos' => $request->apellidos,
            ]);
        } else if ($request->tipo == 'veterinario') {
            // Crear el detalle para veterinarios
            $usuario->veterinario()->create([
                'nombre' => $request->nombre,
                'apellidos' => $request->apellidos,
                'cedula_profesional' => $request->cedula_profesional,
            ]);
        }

        // Mensaje del correo
        $message = "Hola {$request->nombre}, tu cuenta está en revisión por el administrador.";
        $subject = 'Cuenta en revisión';

        // Enviar correo
        Mail::to($usuario->email)->send(new CuentaEnRevision($message, $subject));

        return response()->json(['message' => 'Usuario registrado exitosamente.'], 201);
    }
}