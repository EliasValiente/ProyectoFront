import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service'; 
import { PricingService } from './service/pricing.service';

interface Suscripcion {
  id: number;
  nombre: string;
  duracion: number;
  precio: number; 
  descripcion: string;
  precio_mensual: number;
  caracteristicas: string[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent implements OnInit, OnDestroy {

  suscripciones: Suscripcion[] = [];

  constructor(private visibilityService: VisibilityService, private pricingService: PricingService) {}


  subscribeToSuscripcion(suscripcionId: number) {
    this.pricingService.subscribeToSuscripcion(suscripcionId).subscribe(response => {
      console.log(response);
      // Manejar la respuesta, mostrar mensaje al usuario, etc.
    }, error => {
      console.error(error);
      // Manejar el error, mostrar mensaje al usuario, etc.
    });
  }

  ngOnInit() {

    this.pricingService.getSuscripciones().subscribe(data => {
      this.suscripciones = data;
    });

    setTimeout(() => {
      this.visibilityService.setShowSearchBox(false);
    });
  }
  
  ngOnDestroy() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }
}
