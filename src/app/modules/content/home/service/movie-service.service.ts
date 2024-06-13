// src/app/services/movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})

export class MovieService {

  // Constructor para inyectar HttpClient
  constructor(private http: HttpClient) { }

  // URLs de la API para diferentes tipos de películas
  private popularMovieURL = "/api/movies/popular";
  private recommendedMovieURL = "/api/movies/recommended";
  private watchedMovieURL = "/api/movies/watched";

  // Método privado para obtener los encabezados con el token de autorización
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    return new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crea y devuelve los encabezados con el token
  }

  // Método para obtener las películas populares
  getPopularMovies(): Observable<any> {
    const headers = this.getHeaders(); // Obtiene los encabezados con el token
    return this.http.get(this.popularMovieURL, { headers }); // Realiza la solicitud HTTP GET
  }

  // Método para obtener las películas recomendadas
  getRecommendedMovies(): Observable<any> {
    const headers = this.getHeaders(); // Obtiene los encabezados con el token
    return this.http.get(this.recommendedMovieURL, { headers }); // Realiza la solicitud HTTP GET
  }

  // Método para obtener las películas vistas
  getWatchedMovies(): Observable<any> {
    const headers = this.getHeaders(); // Obtiene los encabezados con el token
    return this.http.get(this.watchedMovieURL, { headers }); // Realiza la solicitud HTTP GET
  }

  // Método para obtener una película por su ID
  getMovieById(id: number): Observable<any> {
    const headers = this.getHeaders(); // Obtiene los encabezados con el token
    return this.http.get(`/api/movies/${id}`, { headers }); // Realiza la solicitud HTTP GET
  }

  // Método para obtener una película por su título
  getMovieByTitle(title: string): Observable<any> {
    const headers = this.getHeaders(); // Obtiene los encabezados con el token
    const params = new HttpParams().set('title', title); // Crea los parámetros de la solicitud con el título
    return this.http.get(`/api/movies/title`, { headers, params }); // Realiza la solicitud HTTP GET
  }
}
