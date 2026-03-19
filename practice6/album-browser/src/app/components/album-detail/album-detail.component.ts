import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlbumService } from '../../services/album.service';
import { FavoritesService } from '../../services/favorites.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="detail-container">
      <button class="btn-back" (click)="router.navigate(['/albums'])">← Back to Albums</button>

      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading album...</p>
      </div>

      <div *ngIf="!loading && album" class="detail-card">
        <div class="album-meta">
          <span class="album-id">Album #{{ album.id }}</span>
          <span class="user-id">User ID: {{ album.userId }}</span>
          <button
            class="star-btn"
            [class.starred]="isFav"
            (click)="toggleFavorite()"
            [attr.aria-pressed]="isFav"
            [attr.aria-label]="isFav ? 'Remove from favorites' : 'Add to favorites'"
          >
            {{ isFav ? '⭐ Favorited' : '☆ Add to Favorites' }}
          </button>
        </div>

        <h1>{{ album.title }}</h1>

        <div class="edit-section">
          <label>Edit Title</label>
          <input
            type="text"
            [(ngModel)]="editTitle"
            class="edit-input"
            placeholder="Enter new title..."
          />
          <button class="btn-save" (click)="saveTitle()">
            {{ saved ? '✓ Saved!' : 'Save Changes' }}
          </button>
        </div>

        <div class="action-buttons">
          <a [routerLink]="['/albums', album.id, 'photos']" class="btn-photos">
            🖼️ View Photos
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container { max-width: 700px; margin: 0 auto; padding: 40px 24px; }
    .btn-back {
      background: none; border: none; color: #e94560;
      font-size: 0.95rem; font-weight: 600; cursor: pointer;
      padding: 0; margin-bottom: 24px;
    }
    .btn-back:hover { text-decoration: underline; }
    .loading { display: flex; flex-direction: column; align-items: center; padding: 80px 0; color: #666; }
    .spinner {
      width: 48px; height: 48px;
      border: 4px solid #e0e0e0; border-top-color: #e94560;
      border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .detail-card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 2px 16px rgba(0,0,0,0.08); }
    .album-meta { display: flex; gap: 12px; margin-bottom: 16px; align-items: center; flex-wrap: wrap; }
    .album-id { background: #e94560; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }
    .user-id { background: #f0f0f5; color: #666; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
    .star-btn {
      background: none;
      border: 2px solid #f5a623;
      color: #f5a623;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-left: auto;
    }
    .star-btn.starred { background: #f5a623; color: white; }
    .star-btn:hover { opacity: 0.85; }
    h1 { font-size: 1.5rem; color: #1a1a2e; margin-bottom: 32px; line-height: 1.4; text-transform: capitalize; }
    .edit-section label { display: block; font-size: 0.8rem; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
    .edit-input {
      width: 100%; padding: 12px 16px; border: 2px solid #e0e0e0;
      border-radius: 8px; font-size: 1rem; color: #1a1a2e;
      box-sizing: border-box; outline: none; transition: border-color 0.2s;
    }
    .edit-input:focus { border-color: #e94560; }
    .btn-save {
      margin-top: 12px; background: #1a1a2e; color: white;
      border: none; padding: 12px 28px; border-radius: 8px;
      font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background 0.2s;
    }
    .btn-save:hover { background: #2d2d50; }
    .action-buttons { margin-top: 28px; padding-top: 28px; border-top: 1px solid #f0f0f5; }
    .btn-photos {
      display: inline-block; background: #e94560; color: white;
      padding: 12px 28px; border-radius: 8px; text-decoration: none;
      font-weight: 600; transition: background 0.2s;
    }
    .btn-photos:hover { background: #c73652; }
  `]
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  album: Album | null = null;
  editTitle = '';
  loading = true;
  saved = false;
  isFav = false;
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private albumService: AlbumService,
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!id) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.editTitle = data.title;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.sub = this.favoritesService.favorites$.subscribe(() => {
      this.isFav = this.favoritesService.isFavorite(id);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleFavorite(): void {
    if (this.album) {
      this.favoritesService.toggle(this.album.id);
    }
  }

  saveTitle(): void {
    if (!this.album) return;
    const updated = { ...this.album, title: this.editTitle };
    this.albumService.updateAlbum(updated).subscribe(() => {
      this.album!.title = this.editTitle;
      this.saved = true;
      this.cdr.detectChanges();
      setTimeout(() => { this.saved = false; this.cdr.detectChanges(); }, 2000);
    });
  }
}