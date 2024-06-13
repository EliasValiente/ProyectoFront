import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VisibilityService } from './shared/services/visibility/visibility.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeComponent } from './modules/content/home/home.component';
import { LandingComponent } from './modules/content/landing/landing.component';
import { ApiService } from './shared/services/api.service'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './modules/auth/services/login.service';
import { response } from 'express';
import { error } from 'console';
import { PlayerComponent } from './modules/content/player/player.component';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './interceptors/jwt-interceptor.service';
import { AccessibilityComponent } from './modules/content/accessibility/accessibility.component';
import { WebmapComponent } from './modules/content/webmap/webmap.component';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-root', // Selector del componente
  standalone: true, // Componente independiente
  imports: [
    RouterOutlet, 
    LoginComponent, 
    RegisterComponent, 
    HomeComponent, 
    LandingComponent,
    PlayerComponent,
    AccessibilityComponent,
    WebmapComponent, 
    CommonModule,
    HttpClientModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ApiService,
    AuthService,
    // Proveedor del interceptor JWT para manejo de tokens
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  templateUrl: './app.component.html', // Plantilla HTML del componente
  styleUrls: ['./app.component.css'], // Estilos CSS del componente
})

export class AppComponent implements OnDestroy, OnInit {
  showSearchbox: boolean = true; // Controla la visibilidad de la barra de búsqueda
  private visibilitySubscription: Subscription; // Suscripción a cambios de visibilidad
  message: string = ''; // Inicializa la propiedad con un valor por defecto
  isDropdownOpen = false; // Estado del dropdown

  // Constructor para inyectar dependencias y suscribirse a cambios de visibilidad
  constructor(
    private visibilityService: VisibilityService,
    private loginService: LoginService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.visibilitySubscription = this.visibilityService.showSearchBox$.subscribe(visible => {
      this.showSearchbox = visible; // Actualiza la visibilidad de la barra de búsqueda
    });
  }

  // Método del ciclo de vida de Angular, se llama cuando el componente se inicializa
  ngOnInit() {
    // Llama al método del servicio API para obtener un mensaje de prueba
    this.apiService.getTestMessage().subscribe(
      data => {
        this.message = data.message; // Almacena el mensaje de la API
        console.info(this.message); // Muestra el mensaje en la consola
      },
      error => {
        console.error('Error al obtener el mensaje de la API', error); // Muestra el error en la consola
      }
    );
  }

  // Decorador @HostListener para escuchar eventos de click en el documento
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    // Cierra el dropdown si el clic no es dentro del dropdown
    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  // Método para alternar la visibilidad del dropdown
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Evita la propagación del evento de clic
    this.isDropdownOpen = !this.isDropdownOpen; // Alterna el estado del dropdown
  }

  // Método para cerrar sesión
  logout() {
    this.loginService.logout(); // Llama al servicio de logout
  }

  // Método del ciclo de vida de Angular, se llama cuando el componente se destruye
  ngOnDestroy() {
    this.visibilitySubscription.unsubscribe(); // Cancela la suscripción a cambios de visibilidad
  }
}
