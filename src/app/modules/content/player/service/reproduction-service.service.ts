import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReproductionService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  recordReproduction(data: { movieId: number, date: Date }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post('/api/reproductions', data, { headers });
  }
}
