import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';
import { MovieService } from './service/movie-service.service';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-home', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule, RouterModule, SearchBarComponent], // Importa CommonModule, RouterModule y SearchBarComponent
  templateUrl: './home.component.html', // Plantilla HTML del componente
  styleUrl: './home.component.css' // Estilos CSS del componente
})
export class HomeComponent implements OnInit, OnDestroy {
  popularMovies: any[] = []; // Almacena la lista de películas populares
  recommendedMovies: any[] = []; // Almacena la lista de películas recomendadas
  watchedMovies: any[] = []; // Almacena la lista de películas vistas
  searchedMovies: any[] = []; // Almacena la lista de películas buscadas

  // Constructor para inyectar dependencias
  constructor(
    private visibilityService: VisibilityService,
    private movieService: MovieService
  ) {}

  // Método del ciclo de vida de Angular, se llama cuando el componente se inicializa
  ngOnInit(): void {
    // Muestra la barra de búsqueda después de un pequeño retraso cuando se carga el componente
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });

    // Carga las listas de películas
    this.loadMovies();
  }

  // Método del ciclo de vida de Angular, se llama cuando el componente se destruye
  ngOnDestroy(): void {
    // Muestra la barra de búsqueda después de un pequeño retraso cuando se destruye el componente
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

  // Método que se llama cuando se realiza una búsqueda
  onSearch(searchTerm: string): void {
    // Llama al servicio de películas para buscar por título
    this.movieService.getMovieByTitle(searchTerm).subscribe(
      data => {
        this.searchedMovies = data; // Almacena los resultados de búsqueda
      },
      error => {
        // Maneja el error
        console.error('Error al buscar películas:', error);
      }
    );
  }

  // Método para cargar las listas de películas
  loadMovies(): void {
    // Llama al servicio de películas para obtener las películas populares
    this.movieService.getPopularMovies().subscribe(data => {
      this.popularMovies = data; // Almacena las películas populares
    });

    // Llama al servicio de películas para obtener las películas recomendadas
    this.movieService.getRecommendedMovies().subscribe(data => {
      this.recommendedMovies = data; // Almacena las películas recomendadas
    });

    // Llama al servicio de películas para obtener las películas vistas
    this.movieService.getWatchedMovies().subscribe(data => {
      this.watchedMovies = data; // Almacena las películas vistas
    });
  }
}
