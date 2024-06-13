import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // Constructor para inyectar AuthService, que se usa para obtener el token JWT
  constructor(private authService: AuthService) {}

  // Método intercept, que se llama automáticamente para cada solicitud HTTP
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtiene el token JWT del servicio AuthService
    const token = this.authService.getToken();
    
    // Si hay un token disponible, clona la solicitud y añade el token en el encabezado Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Añade el token JWT en el encabezado Authorization
        }
      });
    }

    // Pasa la solicitud (modificada o no) al siguiente manejador en la cadena de interceptores
    return next.handle(request);
  }
}
