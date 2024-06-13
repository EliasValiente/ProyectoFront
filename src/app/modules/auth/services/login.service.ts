// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class LoginService {
  
  // Constructor para inyectar dependencias
  constructor(private authService: AuthService, private router: Router) {}

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    // Llama al método login del servicio AuthService con las credenciales de usuario
    return this.authService.login({ username, password }).pipe(
      // Usa el operador tap para realizar acciones con la respuesta sin modificar el flujo de datos
      tap(response => {
        // Guarda el token JWT en el almacenamiento local del navegador
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    // Elimina el token JWT del almacenamiento local
    localStorage.removeItem('token');
    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    // Devuelve true si hay un token JWT en el almacenamiento local, false en caso contrario
    return !!localStorage.getItem('token');
  }
}
