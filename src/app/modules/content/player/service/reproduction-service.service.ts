import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReproductionService {

  constructor(private http: HttpClient) { }

  recordReproduction(data: { movieId: number, date: Date }): Observable<any> {
    return this.http.post('/api/reproductions', data);
  }
}
