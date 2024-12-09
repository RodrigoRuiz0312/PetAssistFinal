import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-cliente',
  standalone: true,
  imports: [],
  templateUrl: './inicio-cliente.component.html',
  styleUrl: './inicio-cliente.component.css'
})
export class InicioClienteComponent {

  constructor(private router: Router) { }

  redirigir(url: string): void {
    this.router.navigate([url]); // Redirige a la ruta deseada
  }

}
