import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">🎵 Album Browser</div>
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <a routerLink="/albums" routerLinkActive="active">Albums</a>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 64px;
      background: #1a1a2e;
      color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-brand { font-size: 1.3rem; font-weight: 700; letter-spacing: 1px; }
    .nav-links { display: flex; gap: 24px; }
    .nav-links a {
      color: #a0a0c0;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      padding: 6px 14px;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .nav-links a:hover { color: white; background: rgba(255,255,255,0.1); }
    .nav-links a.active { color: white; background: #e94560; }
    .main-content { min-height: calc(100vh - 64px); background: #f5f6fa; }
  `]
})
export class AppComponent {}