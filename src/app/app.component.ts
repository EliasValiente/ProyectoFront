import { Component, OnDestroy, OnInit, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VisibilityService } from './shared/services/visibility/visibility.service';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeComponent } from './modules/content/home/home.component';
import { LandingComponent } from './modules/content/landing/landing.component';
import { ApiService } from './shared/services/api.service'; // Importar el servicio
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Importar HttpClientModule

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
    HttpClientModule // Añadir HttpClientModule a los imports
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

  constructor(private visibilityService: VisibilityService, private apiService: ApiService) {
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

  ngOnDestroy() {
    this.visibilitySubscription.unsubscribe();
  }
}
