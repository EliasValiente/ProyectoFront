import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private loginUrl = 'http://localhost:8000/api/login';
  private logoutUrl = 'http://localhost:8000/api/logout';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap(() => {
        localStorage.setItem('isLoggedIn', 'true');
      })
    );
  }

  logout(): void {
    this.http.post(this.logoutUrl, {}).subscribe(
      () => {
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}