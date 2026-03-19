import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="hero">
        <div class="hero-icon">🎵</div>
        <h1>Welcome to Album Browser</h1>
        <p>Discover and explore albums from our collection. Browse through hundreds of albums, view photos, and manage your favorites.</p>
        <a routerLink="/albums" class="btn-primary">Browse Albums</a>
      </div>
      <div class="features">
        <div class="feature-card">
          <span>📂</span>
          <h3>100 Albums</h3>
          <p>Explore a wide variety of albums</p>
        </div>
        <div class="feature-card">
          <span>🖼️</span>
          <h3>Photo Gallery</h3>
          <p>View all photos for each album</p>
        </div>
        <div class="feature-card">
          <span>✏️</span>
          <h3>Edit & Delete</h3>
          <p>Manage albums with ease</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px 24px;
    }
    .hero {
      text-align: center;
      padding: 60px 0 50px;
    }
    .hero-icon { font-size: 4rem; margin-bottom: 20px; }
    h1 {
      font-size: 2.5rem;
      color: #1a1a2e;
      margin-bottom: 16px;
      font-weight: 800;
    }
    p {
      font-size: 1.1rem;
      color: #666;
      max-width: 500px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }
    .btn-primary {
      display: inline-block;
      background: #e94560;
      color: white;
      padding: 14px 36px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: background 0.2s;
    }
    .btn-primary:hover { background: #c73652; }
    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 40px;
    }
    .feature-card {
      background: white;
      padding: 32px 24px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    }
    .feature-card span { font-size: 2rem; }
    .feature-card h3 { color: #1a1a2e; margin: 12px 0 8px; }
    .feature-card p { font-size: 0.9rem; margin: 0; }
  `]
})
export class HomeComponent {}