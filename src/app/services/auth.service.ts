import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL base de la API

  // Constructor para inyectar HttpClient
  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Método para cerrar sesión
  logout() {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
  }

  // Método para obtener el token
  getToken() {
    // Devuelve el token del almacenamiento local
    return localStorage.getItem('token');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Devuelve true si hay un token, false en caso contrario
    return !!this.getToken();
  }
}
