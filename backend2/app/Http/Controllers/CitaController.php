<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Cita;
use App\Models\Cartilla;
use App\Models\DetallesCliente;
use App\Models\DetallesVeterinario;
use App\Models\InformacionVeterinario;

use App\Mail\ReagendarCitaMail;
use Illuminate\Support\Facades\Mail;

class CitaController extends Controller
{
    /**
     * Registrar una nueva cita.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'detalles_cliente_id' => 'required|exists:detalles_clientes,id',
            'cartilla_id' => 'required|exists:cartilla,id',
            'detalles_veterinario_id' => 'required|exists:detalles_veterinarios,id',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
            'motivo' => 'nullable|string|max:255',
            'notas' => 'nullable|string|max:500',
        ]);

        $cita = Cita::create($validatedData);

        return response()->json([
            'message' => 'Cita registrada con éxito.',
            'cita' => $cita,
        ], 201);
    }

    /**
     * Obtener citas por cliente.
     */
    public function index($mascotaId)
{
    // Obtener las citas relacionadas con la mascota
    $citas = Cita::join('cartilla', 'citas.cartilla_id', '=', 'cartilla.id')
        ->join('detalles_clientes', 'cartilla.detalles_cliente_id', '=', 'detalles_clientes.id')
        ->join('detalles_veterinarios', 'citas.detalles_veterinario_id', '=', 'detalles_veterinarios.id')
        ->join('informacion_veterinarios', 'detalles_veterinarios.usuario_id', '=', 'informacion_veterinarios.usuario_id')
        ->select(
            'citas.fecha',
            'citas.hora',
            'citas.motivo',
            'cartilla.nombre as mascota',
            Cita::raw("CONCAT(detalles_veterinarios.nombre, ' ', detalles_veterinarios.apellidos) as veterinario"),
            'informacion_veterinarios.nombre_veterinaria as veterinaria'
        )
        ->where('cartilla.id', $mascotaId) // Filtra las citas según el ID de la mascota
        ->get();

    return response()->json([
        'message' => 'Citas obtenidas con éxito.',
        'data' => $citas
    ]);
}






    /**
     * Obtener citas programadas para un veterinario.
     */
    public function citasPorVeterinario($veterinarioId)
    {
        $citas = Cita::with([
            'cliente' => function ($query) {
                $query->select('id', 'nombre', 'apellidos');
            },
            'mascota' => function ($query) {
                $query->select('id', 'nombre'); // Obtener nombre de la mascota
            }
        ])
            ->where('detalles_veterinario_id', $veterinarioId)
            ->get();

        if ($citas->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron citas programadas para este veterinario.',
            ], 404);
        }

        return response()->json([
            'message' => 'Citas programadas obtenidas con éxito.',
            'data' => $citas,
        ], 200);
    }

    // CitaController.php
    public function reagendar(Request $request, $id)
{
    $cita = Cita::find($id);
    if (!$cita) {
        return response()->json(['message' => 'Cita no encontrada'], 404);
    }

    // Actualizar la fecha, hora y estado
    $cita->fecha = $request->input('fecha');
    $cita->hora = $request->input('hora');
    $cita->estado = 'reagendada'; // Actualizar estado

    // Guardar el motivo si está presente en el request
    $cita->motivo_reagendada = $request->input('motivo_reagendada', null); // Si no hay motivo, se guarda como null

    $cita->save();

    // Obtener el email del cliente
    $clienteEmail = $cita->cliente->usuario->email;

    // Obtener el veterinario con sus detalles
    $veterinario = $cita->veterinario;

    // Enviar el correo al cliente
    Mail::to($clienteEmail)->send(new ReagendarCitaMail($cita, $veterinario));

    return response()->json(['message' => 'Cita reagendada y correos enviados exitosamente', 'data' => $cita]);
}






}