import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { Genre } from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres/`);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/`);
  }

  getMoviesByGenre(genreId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/?genre=${genreId}`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}/`);
  }


semanticSearchMovies(query: string) {
  return this.http.get<Movie[]>(`${this.apiUrl}/movies/semantic-search/?query=${encodeURIComponent(query)}`);
}

getRatings(movieId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/ratings/?movie=${movieId}`);
}

addRating(data: { movie: number; score: number }) {
  return this.http.post(`${this.apiUrl}/ratings/`, data);
}

getReviews(movieId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/reviews/?movie=${movieId}`);
}

addReview(data: { movie: number; text: string }) {
  return this.http.post(`${this.apiUrl}/reviews/`, data);
}

getWatchlist() {
  return this.http.get<any[]>(`${this.apiUrl}/watchlist/`);
}

addToWatchlist(data: { movie_id: number }) {
  return this.http.post(`${this.apiUrl}/watchlist/`, data);
}

checkWatchlist(movieId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/watchlist/?movie=${movieId}`);
}

removeFromWatchlist(id: number) {
  return this.http.delete(`${this.apiUrl}/watchlist/${id}/`);
}
 
getSubscription() {
  return this.http.get<any>(`${this.apiUrl}/subscription/`);
}

buySubscription() {
  return this.http.put(`${this.apiUrl}/subscription/buy/`, {});
}

updateReview(id: number, data: { movie: number; text: string }) {
  return this.http.put(`${this.apiUrl}/reviews/${id}/`, data);
}

deleteReview(id: number) {
  return this.http.delete(`${this.apiUrl}/reviews/${id}/`);
}

searchMovies(query: string) {
  return this.http.get<Movie[]>(`${this.apiUrl}/movies/?search=${query}`);
}

}



