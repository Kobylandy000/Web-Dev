import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Photo } from '../../models/album.model';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="photos-container">
      <div class="photos-header">
        <button class="btn-back" (click)="router.navigate(['/albums', albumId])">← Back to Album</button>
        <h1>Photos for Album #{{ albumId }}</h1>
      </div>
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading photos...</p>
      </div>
      <div *ngIf="!loading" class="photos-grid">
        <div class="photo-card" *ngFor="let photo of photos">
          <img [src]="photo.thumbnailUrl" [alt]="photo.title" loading="lazy" />
          <div class="photo-overlay"><p>{{ photo.title }}</p></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .photos-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    .photos-header { margin-bottom: 32px; }
    .btn-back {
      background: none; border: none; color: #e94560;
      font-size: 0.95rem; font-weight: 600; cursor: pointer;
      padding: 0; margin-bottom: 16px; display: flex; align-items: center; gap: 6px;
    }
    .btn-back:hover { text-decoration: underline; }
    h1 { font-size: 2rem; color: #1a1a2e; font-weight: 800; }
    .loading { display: flex; flex-direction: column; align-items: center; padding: 80px 0; color: #666; }
    .spinner {
      width: 48px; height: 48px;
      border: 4px solid #e0e0e0; border-top-color: #e94560;
      border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
    }
    .photo-card {
      position: relative; border-radius: 8px; overflow: hidden;
      aspect-ratio: 1; background: #e0e0e0; cursor: pointer;
    }
    .photo-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
    .photo-overlay {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      padding: 20px 8px 8px; opacity: 0; transition: opacity 0.3s;
    }
    .photo-card:hover img { transform: scale(1.05); }
    .photo-card:hover .photo-overlay { opacity: 1; }
    .photo-overlay p { color: white; font-size: 0.7rem; margin: 0; line-height: 1.3; text-transform: capitalize; }
  `]
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  albumId = 0;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}