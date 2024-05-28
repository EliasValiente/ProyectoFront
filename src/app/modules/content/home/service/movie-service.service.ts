// src/app/services/movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  private popularMovieURL = "/api/movies/popular";
  private recommendedMovieURL = "/api/movies/recommended";
  private  watchedMovieURL = "/api/movies/watched";

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPopularMovies(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.popularMovieURL, { headers });
  }

  getRecommendedMovies(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.recommendedMovieURL, { headers });
  }

  getWatchedMovies(): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(this.watchedMovieURL, { headers });
  }

  getMovieById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`/api/movies/${id}`, { headers });
  }
}
