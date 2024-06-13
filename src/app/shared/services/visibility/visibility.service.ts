import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Decorador @Injectable indica que esta clase puede ser inyectada como un servicio
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class VisibilityService {
  // BehaviorSubject para manejar la visibilidad de la barra de búsqueda, inicializado en true
  private showSearchBox = new BehaviorSubject<boolean>(true);

  // Observable público que expone el estado de visibilidad de la barra de búsqueda
  public showSearchBox$ = this.showSearchBox.asObservable();

  constructor() {}

  // Método para establecer la visibilidad de la barra de búsqueda
  public setShowSearchBox(visible: boolean): void {
    this.showSearchBox.next(visible); // Emite el nuevo valor de visibilidad
  }
}
