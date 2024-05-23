// suscripcion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Suscripcion {
  id: number;
  nombre: string;
  duracion: number;
  precio: number; 
  descripcion: string;
  precio_mensual: number;
  caracteristicas: string[];
}


@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private url = 'http://localhost:8000/api/suscripciones'; 
  private subscribeUrl = 'http://localhost:8000/api/subscribe';

  constructor(private http: HttpClient) {}

  getSuscripciones(): Observable<Suscripcion[]> {
    return this.http.get<Suscripcion[]>(this.url);
  }

  subscribeToSuscripcion(suscripcionId: number): Observable<any> {
    return this.http.post<any>(this.subscribeUrl, { suscripcionId });
  }
}
