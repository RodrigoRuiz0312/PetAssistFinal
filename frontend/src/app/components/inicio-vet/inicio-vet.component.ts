import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-vet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-vet.component.html',
  styleUrl: './inicio-vet.component.css'
})
export class InicioVetComponent {
  nombreUsuario: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribirse al observable que emite el nombre del usuario
    this.nombreUsuario = this.authService.getNombre();
    }
  }