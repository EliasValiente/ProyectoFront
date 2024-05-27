// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private authService: AuthService, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.authService.login({ username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
