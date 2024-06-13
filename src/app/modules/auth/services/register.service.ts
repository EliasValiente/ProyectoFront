// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class RegisterService {

  // Constructor para inyectar AuthService
  constructor(private authService: AuthService) {}

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    // Llama al método register del servicio AuthService con los datos del usuario
    return this.authService.register(usuario);
  }
}
