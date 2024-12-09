<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmailController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/usuarios_pendientes', [AdminController::class, 'showPendingUsers'])->name('admin.pendingUsers');
Route::post('/admin/approve-user/{id}', [AdminController::class, 'approveUser'])->name('admin.approveUser');
Route::post('/admin/reject-user/{id}', [AdminController::class, 'rejectUser'])->name('admin.rejectUser');
 

Route::get('send-mail', [EmailController::class, 'sendWelcomeEmail']);