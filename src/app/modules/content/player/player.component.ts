// src/app/player/player.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../home/service/movie-service.service';
import { CommonModule } from '@angular/common';
import { ReproductionService } from './service/reproduction-service.service';


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private reproductionService: ReproductionService
  ) { }

  ngOnInit(): void {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (!isNaN(movieId)) {
      this.movieService.getMovieById(movieId).subscribe(data => {
        this.movie = data;
      });
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onPlay(): void {
    console.log("llega al play");
    const reproductionData = {
      movieId: this.movie.id,
      date: new Date()
    };
    this.reproductionService.recordReproduction(reproductionData).subscribe();
  }
}
