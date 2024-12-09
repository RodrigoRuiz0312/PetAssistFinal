<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App</title>
</head>
<body>
    <header>
        <nav>
            <!-- Aquí puedes poner tu navegación -->
        </nav>
    </header>

    <main>
        @yield('content') <!-- Aquí se insertará el contenido de las vistas hijas -->
    </main>
</body>
</html>
