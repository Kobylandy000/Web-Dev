import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="about-container">
      <h1>About This App</h1>
      <div class="about-card">
        <h2>Album Browser</h2>
        <p>This application was built as part of the Web Development course (Lab 6). It demonstrates Angular routing, HTTP requests, services, and component architecture.</p>
        <div class="info-grid">
          <div class="info-item">
            <label>Course</label>
            <span>Web Development</span>
          </div>
          <div class="info-item">
            <label>Lab</label>
            <span>Lab 6 — Routing & HTTP</span>
          </div>
          <div class="info-item">
            <label>Framework</label>
            <span>Angular 17+</span>
          </div>
          <div class="info-item">
            <label>API</label>
            <span>JSONPlaceholder</span>
          </div>
        </div>
        <div class="tech-stack">
          <h3>Technologies Used</h3>
          <div class="tags">
            <span class="tag">Angular Router</span>
            <span class="tag">HttpClient</span>
            <span class="tag">RxJS Observables</span>
            <span class="tag">TypeScript</span>
            <span class="tag">JSONPlaceholder API</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 48px 24px;
    }
    h1 { font-size: 2rem; color: #1a1a2e; margin-bottom: 24px; font-weight: 800; }
    .about-card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
    }
    h2 { color: #e94560; margin-bottom: 12px; }
    p { color: #555; line-height: 1.7; margin-bottom: 28px; }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 28px;
    }
    .info-item { background: #f5f6fa; padding: 16px; border-radius: 8px; }
    .info-item label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .info-item span { font-weight: 600; color: #1a1a2e; }
    h3 { color: #1a1a2e; margin-bottom: 12px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag {
      background: #1a1a2e;
      color: white;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  `]
})
export class AboutComponent {}