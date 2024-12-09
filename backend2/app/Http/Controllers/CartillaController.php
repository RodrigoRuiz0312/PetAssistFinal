<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cartilla;

class CartillaController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'detalles_cliente_id' => 'required|exists:detalles_clientes,id',
            'nombre' => 'required|string',
            'especie' => 'required|string',
            'sexo' => 'required|string',
            'raza' => 'nullable|string',
            'color' => 'nullable|string',
            'edad' => 'nullable|integer',
            'senas' => 'nullable|string',
        ]);

        $mascota = Cartilla::create($request->all());

        return response()->json([
            'message' => 'Mascota registrada con éxito',
            'mascota' => $mascota,
        ], 201);
    }

    public function index($clienteId)
    {
        $mascotas = Cartilla::where('detalles_cliente_id', $clienteId)->get();

        if ($mascotas->isEmpty()){
            return response()->json([
                'message' => 'No se encontraron mascotas para este cliente.',
            ], 404);
        }

        return response()->json([
            'message' => 'Mascotas obtenidas con éxito',
            'data' => $mascotas,
        ], 200);
    }

}