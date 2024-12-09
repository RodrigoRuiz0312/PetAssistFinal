@extends('layouts.app')
<!-- Extiende de tu plantilla principal -->

@section('content')
<h1>Usuarios Pendientes</h1>

@if(session('success'))
<div class="alert alert-success">
    {{ session('success') }}
</div>
@endif

@foreach ($usuarios as $user)
<div class="user">
    <p>{{ $user->tipo }} - {{ $user->email }}</p>
    <form action="{{ route('admin.approveUser', $user->id) }}" method="POST">
        @csrf
        <button type="submit" class="btn btn-success">Aprobar</button>
    </form>
    <form action="{{ route('admin.rejectUser', $user->id) }}" method="POST">
        @csrf
        <button type="submit" class="btn btn-danger">Rechazar</button>
    </form>
</div>
<hr>
@endforeach
@endsection