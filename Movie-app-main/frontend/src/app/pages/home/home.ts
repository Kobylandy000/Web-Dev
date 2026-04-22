import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie';
import { Movie } from '../../interfaces/movie';
import { Genre } from '../../interfaces/genre';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
  
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadMovies();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe({
      next: (data) => this.genres = data,
      error: (err) => console.error('Error loading genres:', err)
    });
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Error loading movies:', err)
    });
  }

  filterByGenre(genreId: number): void {
    this.movieService.getMoviesByGenre(genreId).subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Error filtering movies:', err)
    });
  }

  showAllMovies(): void {
    this.loadMovies();
  }

  searchText: string = '';

search(): void {
  if (this.searchText.trim()) {
    this.movieService.semanticSearchMovies(this.searchText).subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error(err)
    });
  }
}
}