import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-citas-vet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-citas-vet.component.html',
  styleUrl: './tabla-citas-vet.component.css'
})
export class TablaCitasVetComponent {
  citas: any[] = [];
  veterinarioId: number = 0;  // Inicializa con un número predeterminado
  selectedCartilla: any = null;
  isReagendarModalOpen: boolean = false;  // Controla la visibilidad del modal
  selectedCita: any = null;  // Cita seleccionada para reagendar
  newFecha: string = '';  // Nueva fecha para la cita
  newHora: string = '';  // Nueva hora para la cita
  newMotivoReagendada: string = ''; // Nuevo campo para el motivo

  constructor(private authService: AuthService) {}

  

ngOnInit(): void {
  const storedVeterinarioId = localStorage.getItem('veterinarioId');
  if (storedVeterinarioId) {
    this.veterinarioId = Number(storedVeterinarioId);
    this.obtenerCitas(this.veterinarioId);
  } else {
    console.error('Veterinario no identificado');
  }
}

obtenerCitas(veterinarioId: number): void {
  this.authService.obtenerCitas(veterinarioId).subscribe({
    next: (response) => {
      this.citas = response.data || [];

      // Convierte la fecha y la hora a un objeto Date para cada cita
      this.citas = this.citas.map(cita => {
        // Convierte la fecha en formato 'YYYY-MM-DD' y la hora en 'HH:mm:ss'
        const fechaHora = new Date(cita.fecha + 'T' + cita.hora);
        cita.fecha = fechaHora;  // Ahora es un objeto Date
        cita.hora = fechaHora;   // También actualiza la hora si es necesario
        return cita;
      });
    },
    error: (error) => {
      console.error('Error al obtener las citas:', error);
    }
  });
}

  abrirReagendarModal(cita: any): void {
    this.selectedCita = cita;
  
    // Asegúrate de que la fecha esté en formato 'YYYY-MM-DD'
    this.newFecha = cita.fecha.toISOString().split('T')[0];
  
    // Asegúrate de que la hora sea una cadena de texto
    const horaString = String(cita.hora); // Convertir a string si no lo es
    const horaParts = horaString.split(':');  // Ahora se puede usar split
    this.newHora = `${horaParts[0]}:${horaParts[1]}`;  // Formatear como 'HH:mm'
  
    this.isReagendarModalOpen = true;  // Abre el modal
  }
  

  cerrarReagendarModal(): void {
    this.isReagendarModalOpen = false;  // Cierra el modal
  }

  reagendarCita(): void {
    if (this.selectedCita) {
      const nuevaCita = {
        id: this.selectedCita.id,
        nuevaFecha: this.newFecha,
        nuevaHora: this.newHora,
        motivo_reagendada: this.newMotivoReagendada,  // Enviar motivo de la cita reagendada
      };

      this.authService.reagendarCita(nuevaCita).subscribe({
        next: (response) => {
          console.log('Cita reagendada exitosamente', response);
          this.obtenerCitas(this.veterinarioId);  // Actualiza la lista de citas
          this.cerrarReagendarModal();  // Cierra el modal
        },
        error: (error) => {
          console.error('Error al reagendar la cita:', error);
        }
      });
    }
  }
}
