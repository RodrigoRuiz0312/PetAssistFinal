import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userTipoSubject = new BehaviorSubject<string | null>(this.getUserTipo());
  userTipo$ = this.userTipoSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  // Método de login
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/login', { email, password }).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('tipo', response.tipo);
          this.userTipoSubject.next(response.tipo);
      
          if (response.tipo === 'cliente' && response.clienteId) {
            localStorage.setItem('clienteId', response.clienteId.toString());
          } else if (response.tipo === 'veterinario' && response.veterinarioId) {
            localStorage.setItem('veterinarioId', response.veterinarioId.toString());
          }
      
          if (response.nombre) {
            localStorage.setItem('nombre', response.nombre);
            this.userNameSubject.next(response.nombre);
          }
        }
      })
    );
  }
  

  // Método de registro de usuario
  registrarUsuario(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/register', data, { responseType: 'json' });
  }

  getVeterinarioId(): number | null {
    return localStorage.getItem('veterinarioId') ? parseInt(localStorage.getItem('veterinarioId')!, 10) : null;
  }
  

  // Método de registro de mascotas
  registrarMascota(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/mascotas', data, { responseType: 'json' });
  }

  // Método para obtener mascotas
  obtenerCartilla(clienteId: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/mascotas/${clienteId}`, { headers: this.getHeaders() });
  }

  // Método para obtener los encabezados (con el token)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Incluye el token en el encabezado Authorization
    });
  }

  // Establecer el tipo del usuario en localStorage y emitir el cambio
  setUserTipo(tipo: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('tipo', tipo);
      this.userTipoSubject.next(tipo);  // Emitir el nuevo tipo
      this.isAuthenticatedSubject.next(true);  // Emitir el estado de autenticación
    }
  }

  // Obtener el tipo de usuario (cliente o veterinario)
  getUserTipo(): string | null {
    return this.isBrowser() ? localStorage.getItem('tipo') : null;
  }

  // Obtener el nombre del usuario desde localStorage
  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  // Método para obtener el clienteId del localStorage
  getClienteId(): number | null {
    return localStorage.getItem('clienteId') ? parseInt(localStorage.getItem('clienteId')!, 10) : null;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isBrowser() && localStorage.getItem('token') !== null;
  }

  // Verificar si el usuario es cliente
  isClient(): boolean {
    return this.isBrowser() && this.getUserTipo() === 'cliente';
  }

  // Verificar si el usuario es veterinario
  isVeterinarian(): boolean {
    return this.isBrowser() && this.getUserTipo() === 'veterinario';
  }

  // Cerrar sesión
  logout(): void {
    if (this.isBrowser()) {
      // Eliminar datos del almacenamiento local
      localStorage.removeItem('tipo');
      localStorage.removeItem('token');

      // Emitir cambios en los estados de autenticación
      this.isAuthenticatedSubject.next(false); // Emitir que ya no está autenticado
      this.userTipoSubject.next(null);         // Emitir que no hay tipo

      // Redirigir al inicio
      this.router.navigate(['/']);
    }
  }


  // Verifica si el código se está ejecutando en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined';  // Verifica si 'window' está definido
  }

  // Método para registrar una nueva cita
  agendarCita(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/citas', data, { responseType: 'json' })
  }

  getVeterinarios(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/veterinarios');
  }

  obtenerCitas(veterinarioId: number) {
    return this.http.get<{ data: any[] }>(`http://127.0.0.1:8000/api/citas/veterinario/${veterinarioId}`);
  }

  reagendarCita(cita: { id: number, nuevaFecha: string, nuevaHora: string, motivo_reagendada: string }) {
    return this.http.put(`http://127.0.0.1:8000/api/citas/reagendar/${cita.id}`, {
      fecha: cita.nuevaFecha,
      hora: cita.nuevaHora,
      motivo_reagendada: cita.motivo_reagendada
    });
  }  

  obtenerCitasCartilla(mascotaId: number) {
    return this.http.get<{ data: any[] }>(`http://127.0.0.1:8000/api/citas/${mascotaId}`);
  }  

  // Obtener el perfil del veterinario
obtenerPerfilVeterinario(veterinarioId: number): Observable<any> {
  return this.http.get(`http://127.0.0.1:8000/api/veterinarios/${veterinarioId}`);
}

// Actualizar el perfil del veterinario
actualizarPerfil(veterinarioId: number, data: any): Observable<any> {
  return this.http.put(`http://127.0.0.1:8000/api/veterinarios/actualizar/${veterinarioId}`, data, { responseType: 'json' });
}
}