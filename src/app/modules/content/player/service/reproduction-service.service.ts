import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class ReproductionService {

  // Constructor para inyectar HttpClient
  constructor(private http: HttpClient) { }

  // Método privado para obtener los encabezados con el token de autorización
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    return new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crea y devuelve los encabezados con el token
  }

  // Método para registrar una reproducción
  recordReproduction(data: { movieId: number, date: Date }): Observable<any> {
    const headers = this.getHeaders(); // Obtiene los encabezados con el token
    return this.http.post('/api/reproductions', data, { headers }); // Realiza la solicitud HTTP POST
  }
}
