<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CartillaController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\VeterinarioController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Registro e inicio de sesion
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

//Cartilla
Route::post('/mascotas', [CartillaController::class, 'store']);
Route::get('/mascotas/{clienteId}', [CartillaController::class, 'index']);

//Citas
Route::post('/citas', [CitaController::class, 'store']);         // Crear una nueva cita
Route::get('/citas/{mascotaId}', [CitaController::class, 'index']);      // Mostrar una cita específica


Route::get('/citas/veterinario/{id}', [CitaController::class, 'citasPorVeterinario']);
// Rutas en Laravel (routes/api.php)
Route::put('/citas/reagendar/{id}', [CitaController::class, 'reagendar']);


//Listado de veterinarios para clientes
Route::get('/veterinarios', [VeterinarioController::class, 'listarVeterinarios']);

Route::get('/veterinarios/{id}', [VeterinarioController::class, 'mostrarPerfil']);

Route::put('/veterinarios/actualizar/{veterinarioId}', [VeterinarioController::class, 'actualizarPerfil']);
