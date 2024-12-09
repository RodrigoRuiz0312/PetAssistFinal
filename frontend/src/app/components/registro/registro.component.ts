import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})

export class RegistroComponent {
  mensaje: any; // Mantengo la variable para tu uso actual
  isLoading = false; // Controla la animación de carga
  alertaMensaje: string | null = null; // Mensaje de la alerta
  alertaTipo: string | null = null; // Tipo de alerta (success o danger)

  private formbuilder = new FormBuilder();

  constructor(private authService: AuthService, private router: Router) {}

  registroForm = this.formbuilder.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    tipo: ['cliente', Validators.required],
    cedula_profesional: [{ value: '', disabled: true }], // Campo deshabilitado por defecto
  });

  onSubmit() {
    this.isLoading = true; // Activar la animación de carga
    this.authService.registrarUsuario(this.registroForm.value).subscribe(
      data => {
        this.mensaje = data; // Mantén esta lógica si es necesaria
        this.alertaMensaje = 'Registro exitoso. Redirigiendo al login...';
        this.alertaTipo = 'success'; // Alerta verde
        console.log(this.mensaje);
        this.registroForm.reset();

        // Simulación de espera antes de redirigir
        setTimeout(() => {
          this.isLoading = false; // Detener la animación
          this.router.navigate(['/login']); // Redirigir
        }, 2000); // Espera de 2 segundos
      },
      error => {
        this.isLoading = false; // Detener la animación en caso de error
        this.alertaMensaje = 'Error al registrar usuario. Intenta de nuevo.';
        this.alertaTipo = 'danger'; // Alerta roja
        console.error('Error al registrar usuario', error);
      }
    );
  }

  onToggleUserType(event: Event) {
    const isVeterinario = (event.target as HTMLInputElement).checked;
    const tipo = isVeterinario ? 'veterinario' : 'cliente';
  
    this.registroForm.get('tipo')?.setValue(tipo);
  
    if (isVeterinario) {
      this.registroForm.get('cedula_profesional')?.enable();
      this.registroForm.get('cedula_profesional')?.setValidators([Validators.required]);
    } else {
      this.registroForm.get('cedula_profesional')?.disable();
      this.registroForm.get('cedula_profesional')?.clearValidators();
      this.registroForm.get('cedula_profesional')?.reset();
    }
  
    this.registroForm.get('cedula_profesional')?.updateValueAndValidity();
    console.log('Tipo de usuario:', tipo);
  }
  
}