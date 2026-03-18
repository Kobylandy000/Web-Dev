import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  // 1. Қасиеттер (properties)
  albums: Album[] = [];
  loading = true;
  showOnlyFavorites = false;
  favorites: Set<number> = new Set();

  // 2. Конструктор
  constructor(private albumService: AlbumService) {}

  // 3. Initialization
  ngOnInit(): void {
    this.loadFavorites();
    this.loadAlbums();
  }

  // 4. Computed properties (getters)
  get visibleAlbums(): Album[] {
    if (this.showOnlyFavorites) {
      return this.albums.filter(album => this.favorites.has(album.id));
    }
    return this.albums;
  }

  get favoriteCount(): number {
    return this.favorites.size;
  }

  // 5. Методтар
  loadAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading albums:', error);
        this.loading = false;
      }
    });
  }

  deleteAlbum(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this album?')) {
      this.albumService.deleteAlbum(id).subscribe({
        next: () => {
          this.albums = this.albums.filter(album => album.id !== id);
          this.favorites.delete(id);
          this.saveFavorites();
        },
        error: (error) => console.error('Error deleting album:', error)
      });
    }
  }

  toggleFavorite(albumId: number, event: Event): void {
    event.stopPropagation();
    if (this.favorites.has(albumId)) {
      this.favorites.delete(albumId);
    } else {
      this.favorites.add(albumId);
    }
    this.saveFavorites();
  }

  isFavorite(albumId: number): boolean {
    return this.favorites.has(albumId);
  }

  // 6. Жеке методтар (private)
  private loadFavorites(): void {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      this.favorites = new Set(JSON.parse(stored));
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }
}