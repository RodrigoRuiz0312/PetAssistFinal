import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar-gen',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-gen.component.html',
  styleUrls: ['./navbar-gen.component.css']
})
export class NavbarGenComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userTipo: string | null = null;
  private authSubscription: Subscription = new Subscription();
  private tipoSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });

    this.tipoSubscription = this.authService.userTipo$.subscribe((tipo) => {
      this.userTipo = tipo;
    });
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('veterinarioSeleccionado');
    localStorage.removeItem('clienteId');
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // Limpiar las suscripciones al destruir el componente
    this.authSubscription.unsubscribe();
    this.tipoSubscription.unsubscribe();
  }
}