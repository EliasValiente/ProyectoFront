import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-landing', // Selector del componente
  standalone: true, // Componente independiente
  imports: [], // No se importan otros módulos
  templateUrl: './landing.component.html', // Plantilla HTML del componente
  styleUrl: './landing.component.css' // Estilos CSS del componente
})
export class LandingComponent implements AfterViewInit, OnInit, OnDestroy {

  // Constructor para inyectar dependencias
  constructor(
    private visibilityService: VisibilityService,
    private router: Router
  ) {}

  // Decorador @ViewChild para acceder al elemento del DOM
  @ViewChild('photoContainer') photoContainer!: ElementRef;

  // Método del ciclo de vida de Angular, se llama después de que la vista se ha inicializado
  ngAfterViewInit() {
    this.loadPhotos(); // Carga las fotos después de que la vista se ha inicializado
  }

  // Método para navegar a una URL específica
  navigateTo(url: string): void {
    this.router.navigate(['/' + url]);
  }

  // Método para cargar las fotos en el contenedor de fotos
  loadPhotos(): void {
    if (this.photoContainer) {
      let content = '<div class="column">';
      for (let i = 0; i < 9; i++) {
        if (i != 0 && (i % 9 == 0)) {
          content += `
              </div><div class="column">
              ${this.getPhotoElement(i + 1)}`;
        } else {
          content += this.getPhotoElement(i + 1);
        }
      }
      content += "</div>";
      this.photoContainer.nativeElement.innerHTML = content;
    }
  }

  // Método privado para generar un número aleatorio entre 1 y 2
  private generarInt(): number {
    return Math.floor(Math.random() * 2) + 1;
  }

  // Método privado para obtener el elemento HTML de una foto
  private getPhotoElement(photoId: number): string {
    let carpeta = this.generarInt();
    return `<a href="#" class="photo">
      <img loading="lazy" alt="Photo ${photoId}" src="assets/images/imgs_${carpeta}/photo_${photoId}.jpg" />
    </a>`;
  }

  // Método del ciclo de vida de Angular, se llama cuando el componente se inicializa
  ngOnInit() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(false); // Esconde la barra de búsqueda cuando se carga el componente
    });
  }

  // Método del ciclo de vida de Angular, se llama cuando el componente se destruye
  ngOnDestroy() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true); // Muestra la barra de búsqueda cuando se destruye el componente
    });
  }
}
