import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule

@Component({
  selector: 'app-perfil-vet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil-vet.component.html',
  styleUrl: './perfil-vet.component.css'
})
export class PerfilVetComponent {
  perfil: any = {};
  veterinarioId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.veterinarioId = this.authService.getVeterinarioId();
    if (this.veterinarioId) {
      this.authService.obtenerPerfilVeterinario(this.veterinarioId).subscribe({
        next: (data) => {
          if (data && data.data) {
            this.perfil = data.data;
          }
        },
        error: (err) => console.error('Error al cargar el perfil:', err)
      });
    }
  }

  actualizarPerfil(): void {
    if (this.veterinarioId) {
      // Los datos que deseas actualizar, por ejemplo:
      const datosActualizar = {
        nombre_veterinaria: this.perfil.nombre_veterinaria,
        direccion: this.perfil.direccion,
        telefono: this.perfil.telefono,
        // Añadir cualquier otro campo que desees actualizar
      };
      
      this.authService.actualizarPerfil(this.veterinarioId, datosActualizar).subscribe({
        next: (response) => alert('Perfil actualizado correctamente'),
        error: (err) => console.error('Error al actualizar el perfil:', err)
      });
    }
  }
  
}
