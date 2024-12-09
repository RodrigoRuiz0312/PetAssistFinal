import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartilla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})

export class CartillaComponent implements OnInit {
  mascotas: any[] = [];  // Array para almacenar los datos de las mascotas
  clienteId: number | null = null;
  selectedMascota: any = null;  // Para almacenar la mascota seleccionada
  citas: any[] = []; // Array para almacenar las citas de la mascota seleccionada
  historialMedico: any[] = []; // Array para almacenar el historial médico de la mascota

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.clienteId = Number(localStorage.getItem('clienteId')); // Obtén el clienteId del localStorage
    if (this.clienteId) {
      this.obtenerCartilla(this.clienteId);  // Llama a obtenerCartilla con el clienteId
    } else {
      console.error('Cliente no identificado');
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

  seleccionarMascota(mascota: any): void {
    this.selectedMascota = mascota;
    this.obtenerCitasCartilla(mascota.id); // Llama a obtener las citas de la mascota
  }

  obtenerCitasCartilla(mascotaId: number): void {
    this.authService.obtenerCitasCartilla(mascotaId).subscribe({
      next: (response) => {
        console.log(response); // Verifica la respuesta en la consola
        this.citas = response.data || []; // Asigna directamente las citas
        this.actualizarHistorialMedico(); // Actualiza el historial médico
      },
      error: (error) => {
        console.error('Error al obtener las citas:', error);
        this.citas = []; // En caso de error, asegura que citas sea un array vacío
      }
    });
  }
  

  actualizarHistorialMedico(): void {
    const hoy = new Date();
    this.historialMedico = []; // Resetea el historial

    this.citas.forEach(cita => {
      const fechaCita = new Date(cita.fecha);
      
      // Si la cita ya pasó, la agregamos al historial médico
      if (fechaCita <= hoy) {
        this.historialMedico.push({
          fecha: cita.fecha,
          procedimiento: cita.motivo, // O el nombre del procedimiento si lo prefieres
          notas: cita.notas || 'N/A' // Usa 'N/A' si no hay notas
        });
      }
    });
  }
  
  

  cerrarCartilla(): void {
    this.selectedMascota = null;
    this.citas = []; // Limpia las citas al cerrar la cartilla
    this.historialMedico = []; // Limpia el historial médico al cerrar la cartilla
  }
}