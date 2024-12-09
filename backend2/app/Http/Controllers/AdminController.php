<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use App\Mail\CuentaEnRevision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class AdminController extends Controller
{
    public function showPendingUsers()
    {
        // Mostrar usuarios pendientes
        $usuarios = Usuario::where('estado', 'pendiente')->get();
        return view('admin.usuarios_pendientes', compact('usuarios'));
    }

    public function approveUser($id)
    {
        // Aprobar un usuario
        $usuarios = Usuario::findOrFail($id);
        $usuarios->estado = 'aprobada';
        $usuarios->save();
        
        Mail::to($usuarios->email)->send(new CuentaEnRevision(
            'Tu cuenta ha sido aprobada. Ya puedes acceder a nuestra plataforma.',
            'Cuenta Aprobada'
        ));

        return redirect()->route('admin.pendingUsers')->with('success', 'Usuario aprobado.');
    }

    public function rejectUser($id)
    {
        // Rechazar un usuario
        $usuarios = Usuario::findOrFail($id);
        $usuarios->estado = 'rechazada';
        $usuarios->save();

        Mail::to($usuarios->email)->send(new CuentaEnRevision(
            'Tu cuenta ha sido rechazada. Si tienes dudas, por favor contáctanos.',
            'Cuenta Rechazada'
        ));

        return redirect()->route('admin.pendingUsers')->with('success', 'Usuario rechazado.');
    }
}