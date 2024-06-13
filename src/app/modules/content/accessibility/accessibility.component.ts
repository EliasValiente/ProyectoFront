import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-accessibility', // Selector del componente
  standalone: true, // Componente independiente
  imports: [], // No se importan otros módulos
  templateUrl: './accessibility.component.html', // Plantilla HTML del componente
  styleUrl: './accessibility.component.css' // Estilos CSS del componente
})
export class AccessibilityComponent implements OnInit, OnDestroy {

  // Constructor para inyectar el servicio VisibilityService
  constructor(
    private visibilityService: VisibilityService
  ) {}

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
}
