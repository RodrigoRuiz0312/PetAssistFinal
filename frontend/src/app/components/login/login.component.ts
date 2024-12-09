import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string = '';
  isLoading: boolean = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.isLoading = true; // Mostrar animación de carga

      this.authService.login(email, password).subscribe(
        (response) => {
          this.isLoading = false; // Ocultar animación de carga

          this.successMessage = 'Logeo exitoso, redirigiendo...'; // Mostrar mensaje de éxito

          // Establecer tipo de usuario en el servicio
          this.authService.setUserTipo(response.tipo);

          // Redirección basada en el tipo de usuario
          setTimeout(() => {
            const userType = response.tipo;
            if (userType === 'cliente') {
              this.router.navigate(['/inicio-cliente']);
            } else if (userType === 'veterinario') {
              this.router.navigate(['/inicioVet']);
            }
            this.successMessage = ''; // Ocultar mensaje después de redirigir
          }, 2000); // Esperar 2 segundos antes de redirigir
        },
        (error) => {
          this.isLoading = false; // Ocultar animación de carga
          this.mensajeError = error.error.error || 'Ocurrió un error al iniciar sesión.';
        }
      );
    } else {
      this.mensajeError = 'Por favor complete todos los campos correctamente.';
    }
  }

  cerrarAlerta(): void {
    this.mensajeError = '';
  }
}
