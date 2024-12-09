import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Asegúrate de incluir FormsModule aquí
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css'],
})
export class RegistroCitaComponent implements OnInit {
  nombreUsuario: string | null = null;
  mascotas: any[] = [];  // Array para almacenar los datos de las mascotas
  clienteId: number | null = null;
  selectedMascota: any = {};  // Inicialización segura
  selectedVeterinario: any = {};  // Guardar el veterinario seleccionado


  cita: any = {
    fecha: '',
    hora: '',
    motivo: '',
    notas: '',
    mascotaId: null,
    clienteId: null,
    veterinarioId: null,  // Agregar veterinarioId
  }; // Objeto para la información de la cita

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.clienteId = Number(localStorage.getItem('clienteId'));
    if (this.clienteId) {
      this.obtenerCartilla(this.clienteId);
    } else {
      console.error('Cliente no identificado');
    }

    this.nombreUsuario = this.authService.getNombre();
    const veterinario = JSON.parse(localStorage.getItem('veterinarioSeleccionado') || '{}');
    if (veterinario && veterinario.id) {
      this.cita.veterinarioId = veterinario.id;  // Asigna el ID del veterinario seleccionado
      this.selectedVeterinario = veterinario;  // Guarda el veterinario completo para mostrarlo
    } else {
      console.error('Veterinario no seleccionado');
    }
  }

  obtenerCartilla(clienteId: number): void {
    this.authService.obtenerCartilla(clienteId).subscribe({
      next: (response) => {
        this.mascotas = response.data || [];  // Siempre asigna un array, incluso si no hay datos
      },
      error: (error) => {
        console.error('Error al obtener la cartilla:', error);
        this.mascotas = [];  // Si ocurre un error, asegúrate de que mascotas sea un array vacío
      }
    });
  }

  seleccionarMascota(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const mascotaId = selectElement.value; // Obtener el ID de la mascota seleccionada
    this.selectedMascota = this.mascotas.find(
      (mascota) => mascota.id === Number(mascotaId)
    ) || {};
    this.cita.mascotaId = Number(mascotaId); // Asegúrate de convertir a número
  }


  registrarCita(): void {
    const citaData = {
      detalles_cliente_id: this.clienteId,
      cartilla_id: this.cita.mascotaId,
      fecha: this.cita.fecha,
      hora: this.cita.hora,
      motivo: this.cita.motivo,
      notas: this.cita.notas,
      detalles_veterinario_id: this.cita.veterinarioId,  // Enviar el ID del veterinario
    };

    this.authService.agendarCita(citaData).subscribe(
      (response) => {
        console.log('Cita registrada:', response);

        this.cita = {
          fecha: '',
          hora: '',
          motivo: '',
          notas: '',
          mascotaId: null,
          clienteId: this.clienteId, // Mantener el clienteId
          veterinarioId: this.cita.veterinarioId,
        };
      },
      (error) => {
        console.error('Error al agendar la cita:', error);
        console.log('Datos enviados:', citaData);
      }
    );
  }

  cambiarVeterinario(): void {
    this.router.navigate(['/listaVets']);
  }

  cartilla(): void {
    this.router.navigate(['/cartilla']);
  }
}