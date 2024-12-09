<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Cita;
use App\Models\DetallesVeterinario;
use App\Models\InformacionVeterinario;
use App\Http\Controllers\CitaController;


class ReagendarCitaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $cita;
    public $veterinario;

    public function __construct(Cita $cita, DetallesVeterinario $veterinario)
{
    $this->cita = $cita;
    $this->veterinario = $veterinario;
    $this->motivoReagendada = $cita->motivo_reagendada; // Asignar el motivo de la reagendada
}

public function build()
{
    return $this->view('emails.reagendar_cita')
        ->with([
            'cita' => $this->cita,
            'detallesVeterinario' => $this->veterinario,
            'motivoReagendada' => $this->motivoReagendada, // Pasar el motivo
        ]);
}


    


    
}
