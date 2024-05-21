import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private loginUrl = 'http://localhost:8000/api/login';
  private logoutUrl = 'http://localhost:8000/api/logout';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.http.post<any>(this.loginUrl, body, options);
  }

  logout(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.http.post<any>(this.logoutUrl, {}, options);
  }
}