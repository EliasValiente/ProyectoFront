import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-search-bar', // Selector del componente
  standalone: true, // Componente independiente
  imports: [
    CommonModule, // Importa CommonModule
    FormsModule // Importa FormsModule para manejo de formularios
  ],
  templateUrl: './search-bar.component.html', // Plantilla HTML del componente
  styleUrl: './search-bar.component.css' // Estilos CSS del componente
})
export class SearchBarComponent {
  searchTerm: string = ''; // Propiedad para almacenar el término de búsqueda

  // @Output() crea un EventEmitter que emite eventos cuando se realiza una búsqueda
  @Output() search = new EventEmitter<string>();

  // Método que se llama cuando se realiza una búsqueda
  onSearch(): void {
    this.search.emit(this.searchTerm); // Emite el término de búsqueda
  }
}
