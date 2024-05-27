// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private authService: AuthService) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.authService.register(usuario);
  }
}
