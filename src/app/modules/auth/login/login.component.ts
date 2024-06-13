// src/app/components/login/login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';
import { LoginService } from '../services/login.service';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-login', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule, FormsModule], // Importa CommonModule y FormsModule para el uso en este componente
  templateUrl: './login.component.html', // Plantilla HTML del componente
  styleUrls: ['./login.component.css'] // Estilos CSS del componente
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = ''; // Almacena el nombre de usuario ingresado
  password: string = ''; // Almacena la contraseña ingresada
  errorMessage: string = ''; // Almacena mensajes de error en el login

  // Constructor para inyectar servicios necesarios
  constructor(private visibilityService: VisibilityService, private loginService: LoginService, private router: Router) {}

  // Método del ciclo de vida de Angular, se llama cuando el componente se inicializa
  ngOnInit() {
    // Esconde la barra de búsqueda después de un pequeño retraso cuando se carga el componente
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(false);
    });
  }

  // Método del ciclo de vida de Angular, se llama cuando el componente se destruye
  ngOnDestroy() {
    // Muestra la barra de búsqueda después de un pequeño retraso cuando se destruye el componente
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

  // Método que se llama cuando se envía el formulario de login
  onLogin(): void {
    // Llama al método login del servicio LoginService con el nombre de usuario y la contraseña
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        this.errorMessage = ''; // Resetea el mensaje de error
        console.log(response); // Muestra la respuesta en la consola
        if (response.roles.includes('ROLE_ADMIN')) {
          // Si el usuario tiene el rol de administrador, redirige al dashboard de administración
          window.location.href = 'http://localhost:8000/admin/dashboard'; 
        } else {
          // Si no, redirige a la página de inicio
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login failed', error); // Muestra el error en la consola
        // Establece el mensaje de error
        this.errorMessage = 'Login failed: ' + (error.error.error || 'Unknown error');
      }
    );
  }
}
