<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cita Reagendada</title>
</head>
<body>
    <h1>Estimado/a {{ $cita->cliente->nombre }} {{ $cita->cliente->apellidos }}</h1>

    <p>Su cita ha sido reagendada.</p>
    <p><strong>Fecha:</strong> {{ $cita->fecha }}</p>
    <p><strong>Hora:</strong> {{ $cita->hora }}</p>

    <!-- Mostrar el nombre del veterinario -->
    <p><strong>Veterinario:</strong> Dr. {{ $veterinario->nombre }} {{ $veterinario->apellidos }}</p>

    <!-- Mostrar el motivo de la reagendada si está presente -->
    @if ($motivoReagendada)
        <p><strong>Motivo del cambio:</strong> {{ $motivoReagendada }}</p>
    @endif

    <p>Gracias por confiar en nuestros servicios.</p>
</body>
</html>