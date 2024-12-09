import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyección del servicio de autenticación
  const router = inject(Router);          // Inyección del Router

  // Verifica si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true; // Permite el acceso
  }

  // Redirige al login si no está autenticado
  router.navigate(['/'], {
  });
  return false; // Bloquea el acceso
};