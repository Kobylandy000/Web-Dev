import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="albums-container">
      <h1>All Albums</h1>
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading albums...</p>
      </div>
      <div *ngIf="!loading" class="albums-grid">
        <div class="album-card" *ngFor="let album of albums" (click)="goToDetail(album.id)">
          <div class="album-id">#{{ album.id }}</div>
          <div class="album-title">{{ album.title }}</div>
          <div class="album-actions">
            <button class="btn-view" (click)="goToDetail(album.id); $event.stopPropagation()">View</button>
            <button class="btn-delete" (click)="deleteAlbum(album.id, $event)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .albums-container { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }
    h1 { font-size: 2rem; color: #1a1a2e; margin-bottom: 32px; font-weight: 800; }
    .loading { display: flex; flex-direction: column; align-items: center; padding: 80px 0; color: #666; }
    .spinner {
      width: 48px; height: 48px;
      border: 4px solid #e0e0e0;
      border-top-color: #e94560;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .albums-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .album-card {
      background: white; padding: 24px; border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.07);
      cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
    }
    .album-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
    .album-id { font-size: 0.8rem; color: #e94560; font-weight: 700; margin-bottom: 8px; }
    .album-title { font-size: 0.95rem; color: #1a1a2e; font-weight: 600; line-height: 1.4; margin-bottom: 16px; text-transform: capitalize; }
    .album-actions { display: flex; gap: 8px; }
    .btn-view, .btn-delete {
      padding: 6px 16px; border: none; border-radius: 6px;
      font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: background 0.2s;
    }
    .btn-view { background: #1a1a2e; color: white; }
    .btn-view:hover { background: #2d2d50; }
    .btn-delete { background: #fde8ec; color: #e94560; }
    .btn-delete:hover { background: #e94560; color: white; }
  `]
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading = true;

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/albums', id]);
  }

  deleteAlbum(id: number, event: Event): void {
    event.stopPropagation();
    this.albumService.deleteAlbum(id).subscribe(() => {
      this.albums = this.albums.filter(a => a.id !== id);
      this.cdr.detectChanges();
    });
  }
}

