import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'favorite_albums';
  private favoritesSubject = new BehaviorSubject<number[]>(this.loadFromStorage());

  favorites$ = this.favoritesSubject.asObservable();

  private loadFromStorage(): number[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(ids: number[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(ids));
  }

  isFavorite(id: number): boolean {
    return this.favoritesSubject.value.includes(id);
  }

  toggle(id: number): void {
    const current = this.favoritesSubject.value;
    const updated = current.includes(id)
      ? current.filter(f => f !== id)
      : [...current, id];
    this.saveToStorage(updated);
    this.favoritesSubject.next(updated);
  }

  getCount(): number {
    return this.favoritesSubject.value.length;
  }
}