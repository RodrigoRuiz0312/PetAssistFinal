import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.css'],
})
export class RegistroMascotaComponent implements OnInit {
  mascotaForm: FormGroup;
  message: string = '';
  clienteId: number | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      senas: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el clienteId desde el servicio AuthService
    this.clienteId = this.authService.getClienteId();
    if (!this.clienteId) {
      this.message = 'No se pudo obtener el ID del cliente. Asegúrese de estar autenticado.';
    }
  }

  onSubmit(): void {
    if (this.mascotaForm.valid && this.clienteId) {
      // Agregar el clienteId al objeto de datos de la mascota
      const mascotaData = { ...this.mascotaForm.value, detalles_cliente_id: this.clienteId };

      this.authService.registrarMascota(mascotaData).subscribe({
        next: (response) => {
          this.message = 'Mascota registrada exitosamente';
          console.log(response);
          this.mascotaForm.reset();
        },
        error: (error) => {
          this.message = 'Error al registrar la mascota';
          console.error(error);
        },
      });
    } else {
      this.message = 'Por favor, completa todos los campos y asegúrate de estar autenticado.';
    }
  }
}