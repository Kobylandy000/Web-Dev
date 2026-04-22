import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css'
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
  this.movieService.getWatchlist().subscribe({
    next: (data) => this.watchlist = data,
    error: (err) => console.error('Error loading watchlist:', err)
  });
}

  removeItem(id: number): void {
    this.movieService.removeFromWatchlist(id).subscribe({
      next: () => this.loadWatchlist(),
      error: (err) => console.error('Error removing item:', err)
    });
  }
}