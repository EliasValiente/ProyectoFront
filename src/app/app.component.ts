import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VisibilityService } from './shared/services/visibility/visibility.service';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeComponent } from './modules/content/home/home.component';
import { LandingComponent } from './modules/content/landing/landing.component';
import { ApiService } from './shared/services/api.service'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './modules/auth/services/login.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LoginComponent, 
    RegisterComponent, 
    HomeComponent, 
    LandingComponent, 
    CommonModule,
    HttpClientModule, 
    ReactiveFormsModule,
  ],
  providers: [
    ApiService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnDestroy, OnInit {
  showSearchbox: boolean = true;
  private visibilitySubscription: Subscription;
  message: string = ''; // Inicializar la propiedad con un valor por defecto
  isDropdownOpen = false; // Estado del dropdown

  constructor(
    private visibilityService: VisibilityService,
    private loginService: LoginService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.visibilitySubscription = this.visibilityService.showSearchBox$.subscribe(visible => {
      this.showSearchbox = visible;
    });
  }

  ngOnInit() {
    // Llamar al método del servicio cuando el componente se inicialice
    this.apiService.getTestMessage().subscribe(
      data => {
        this.message = data.message; // Almacenar el mensaje de la API
        console.info(this.message);
      },
      error => {
        console.error('Error al obtener el mensaje de la API', error);
      }
    );
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.loginService.logout()
    /** 
    console.log('Cerrar sesión');
    this.loginService.logout().subscribe(
      response => {
        console.log('sesion cerrada', response);
        this.router.navigate(['/landing']);
      },
      error => {
        console.error('fallo al cerrar sesion', error)
      }
    );
    */
  }
  

  ngOnDestroy() {
    this.visibilitySubscription.unsubscribe();
  }
}