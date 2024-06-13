// suscripcion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz que define la estructura de una suscripción
interface Suscripcion {
  id: number;
  nombre: string;
  duracion: number;
  precio: number;
  descripcion: string;
  precio_mensual: number;
  caracteristicas: string[];
}

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class PricingService {
  private url = 'http://localhost:8000/api/suscripciones'; // URL de la API para obtener suscripciones
  private subscribeUrl = 'http://localhost:8000/api/subscribe'; // URL de la API para suscribirse

  // Constructor para inyectar HttpClient
  constructor(private http: HttpClient) {}

  // Método para obtener las suscripciones
  getSuscripciones(): Observable<Suscripcion[]> {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crea los encabezados con el token
    return this.http.get<Suscripcion[]>(this.url, { headers }); // Realiza la solicitud HTTP GET
  }

  // Método para suscribirse a una suscripción específica
  subscribeToSuscripcion(suscripcionId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crea los encabezados con el token
    return this.http.post<any>(this.subscribeUrl, { suscripcionId }, { headers }); // Realiza la solicitud HTTP POST
  }
}
