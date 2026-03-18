import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  loading = true;
  albumId: number;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Album ID from route:', this.albumId); // Қосыңыз
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    console.log('Loading photos for album:', this.albumId); // Қосыңыз
    
    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (data) => {
        console.log('Photos received:', data); // Қосыңыз
        this.photos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading photos:', error);
        this.loading = false;
      }
    });
  }
}