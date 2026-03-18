import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  // Қасиеттер
  album: Album | null = null;
  loading = true;
  saving = false;
  editedTitle = '';
  favorites: Set<number> = new Set();

  // Конструктор
  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  // Инициализация
  ngOnInit(): void {
    this.loadFavorites();
    this.loadAlbum();
  }

  // Альбомды жүктеу
  loadAlbum(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.editedTitle = data.title;
        this.loading = false;
        console.log('Album loaded:', data);
      },
      error: (error) => {
        console.error('Error loading album:', error);
        this.loading = false;
      }
    });
  }

  // Атауын сақтау
  saveTitle(): void {
    if (!this.album) return;
    
    this.saving = true;
    const updatedAlbum = { ...this.album, title: this.editedTitle };
    
    this.albumService.updateAlbum(updatedAlbum).subscribe({
      next: (data) => {
        this.album = data;
        this.saving = false;
        alert('Album title updated successfully!');
      },
      error: (error) => {
        console.error('Error updating album:', error);
        this.saving = false;
        alert('Error updating album. Please try again.');
      }
    });
  }

  // Жұлдызша басқанда
  toggleFavorite(): void {
    if (!this.album) return;
    
    const id = this.album.id;
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
    this.saveFavorites();
  }

  // Тексеру: favorite ма?
  isFavorite(): boolean {
    return this.album ? this.favorites.has(this.album.id) : false;
  }

  // Favorites жүктеу (localStorage)
  private loadFavorites(): void {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      this.favorites = new Set(JSON.parse(stored));
    }
  }

  // Favorites сақтау (localStorage)
  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }
}