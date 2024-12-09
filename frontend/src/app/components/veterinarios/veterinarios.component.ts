import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veterinarios.component.html',
  styleUrl: './veterinarios.component.css'
})
export class VeterinariosComponent {
  veterinarios: any[] = [];
  noVets: boolean = false;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authservice.getVeterinarios().subscribe(
      (data) => {
        if (data.length > 0) {
          this.veterinarios = data;
        } else {
          this.noVets = true;
        }
      },
      (error) => {
        console.error('Error al obtener los veterinarios:', error);
        this.noVets = true;
      }
    );
  }

  seleccionarVeterinario(vet: any): void {
    // Guarda el objeto completo del veterinario (puedes guardar solo el ID si prefieres)
    localStorage.setItem('veterinarioSeleccionado', JSON.stringify(vet));  
    this.router.navigate(['/registroCita']);  // Redirige al formulario de cita
  }  
}
