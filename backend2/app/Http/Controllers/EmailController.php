<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\CuentaEnRevision;

class EmailController extends Controller
{
    //
    public function sendWelcomeEmail(){
        $toEmail = 'rodrigorm0312@gmail.com';
        $message = 'Bienvenido';
        $subject = 'Email de bienvenida en laravel usando GMAIL';

        $response = Mail::to($toEmail)->send(new CuentaEnRevision($message, $subject));

        dd($response);
    }
}
