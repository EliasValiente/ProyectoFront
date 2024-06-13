import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service'; 
import { PricingService } from './service/pricing.service';

// Interfaz que define la estructura de una suscripción
interface Suscripcion {
  id: number;
  nombre: string;
  duracion: number;
  precio: number;
  descripcion: string;
  precio_mensual: number;
  caracteristicas: string[];
}

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-pricing', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule], // Importa CommonModule
  templateUrl: './pricing.component.html', // Plantilla HTML del componente
  styleUrl: './pricing.component.css', // Estilos CSS del componente
})
export class PricingComponent implements OnInit, OnDestroy {

  suscripciones: Suscripcion[] = []; // Almacena la lista de suscripciones

  // Constructor para inyectar dependencias
  constructor(private visibilityService: VisibilityService, private pricingService: PricingService) {}

  // Método para suscribirse a una suscripción específica
  subscribeToSuscripcion(suscripcionId: number) {
    this.pricingService.subscribeToSuscripcion(suscripcionId).subscribe(response => {
      console.log(response);
      // Manejar la respuesta, mostrar mensaje al usuario, etc.
    }, error => {
      console.error(error);
      // Manejar el error, mostrar mensaje al usuario, etc.
    });
  }

  // Método del ciclo de vida de Angular, se llama cuando el componente se inicializa
  ngOnInit() {
    // Obtiene las suscripciones desde el PricingService
    this.pricingService.getSuscripciones().subscribe(data => {
      this.suscripciones = data; // Almacena las suscripciones en la propiedad `suscripciones`
    });

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
}
