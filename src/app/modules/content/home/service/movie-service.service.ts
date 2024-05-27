// src/app/services/movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  private popularMovieURL = "/api/movies/popular";
  private recommendedMovieURL = "/api/movies/recommended";


  getPopularMovies(): Observable<any> {
    return this.http.get(this.popularMovieURL);
  }

  getRecommendedMovies(): Observable<any> {
    return this.http.get(this.recommendedMovieURL);
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get(`/api/movies/${id}`);
  }

  
}
