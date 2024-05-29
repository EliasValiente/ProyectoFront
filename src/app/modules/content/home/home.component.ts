import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';
import { MovieService } from './service/movie-service.service';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  popularMovies: any[] = [];
  recommendedMovies: any[] = [];
  watchedMovies: any[] = [];
  searchedMovies: any[] = [];

  constructor(
    private visibilityService: VisibilityService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });

    this.loadMovies();
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

  onSearch(searchTerm: string): void {
    this.movieService.getMovieByTitle(searchTerm).subscribe(
      data => {
        this.searchedMovies = data;
      },
      (error) => {
        // Maneja el error
        console.error('Error al buscar películas:', error);
      }
    );
  }

  loadMovies(): void {

    this.movieService.getPopularMovies().subscribe(data => {
      this.popularMovies = data;
    });

    this.movieService.getRecommendedMovies().subscribe(data => {
      this.recommendedMovies = data;
    });

    this.movieService.getWatchedMovies().subscribe(data => {
      this.watchedMovies = data;
    })
  }
  
}
