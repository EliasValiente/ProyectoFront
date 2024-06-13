// src/app/player/player.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../home/service/movie-service.service';
import { CommonModule } from '@angular/common';
import { ReproductionService } from './service/reproduction-service.service';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-player', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule], // Importa CommonModule
  templateUrl: './player.component.html', // Plantilla HTML del componente
  styleUrls: ['./player.component.css'] // Estilos CSS del componente
})
export class PlayerComponent implements OnInit {
  movie: any; // Propiedad para almacenar los datos de la película

  // Constructor para inyectar dependencias
  constructor(
    private route: ActivatedRoute, // Permite acceder a los parámetros de la ruta
    private router: Router, // Permite la navegación entre rutas
    private movieService: MovieService, // Servicio para obtener datos de películas
    private reproductionService: ReproductionService // Servicio para registrar reproducciones
  ) { }

  // Método del ciclo de vida de Angular, se llama cuando el componente se inicializa
  ngOnInit(): void {
    // Obtiene el ID de la película de los parámetros de la ruta
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (!isNaN(movieId)) {
      // Si el ID es válido, obtiene los datos de la película utilizando el MovieService
      this.movieService.getMovieById(movieId).subscribe(data => {
        this.movie = data; // Almacena los datos de la película en la propiedad `movie`
      });
    }
  }

  // Método para navegar a la página de inicio
  goHome(): void {
    this.router.navigate(['/home']);
  }

  // Método que se llama cuando se reproduce la película
  onPlay(): void {
    console.log("llega al play");
    const reproductionData = {
      movieId: this.movie.id, // ID de la película
      date: new Date() // Fecha y hora actuales
    };
    // Registra la reproducción utilizando el ReproductionService
    this.reproductionService.recordReproduction(reproductionData).subscribe();
  }
}
