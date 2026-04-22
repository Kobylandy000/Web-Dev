import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie';
import { Movie } from '../../interfaces/movie';
import { AuthService } from '../../services/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
  
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;

  ratings: any[] = [];
  selectedScore = 5;
  message = '';

  reviews: any[] = [];
  newReview = '';

  isInWatchlist = false;
  watchlistItemId: number | null = null;

  accessError = '';

  editingReviewId: number | null = null;
  editedReviewText = '';

  currentUserId: number | null = null;

  showRatingForm = false;
  showReviewForm = false;

  showPlayer = false;
  safeVideoUrl: SafeResourceUrl | null = null;
  

  constructor(
  private route: ActivatedRoute,
  private movieService: MovieService,
  private authService: AuthService,
  private sanitizer: DomSanitizer
) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovie(id);
    this.loadRatings(id);
    this.loadReviews(id);
    this.checkWatchlist(id);

    this.authService.getCurrentUser().subscribe({
      next: (data) => this.currentUserId = data.id,
      error: () => console.error('Error loading current user')
    });
  }

  loadMovie(id: number): void {
  this.movieService.getMovieById(id).subscribe({
    next: (data) => {
      this.movie = data;
      this.accessError = '';
    },
    error: (err) => {
      if (err.status === 403) {
        this.accessError = 'This is a premium movie. Subscription required.';
      } else {
        console.error('Error loading movie:', err);
      }
    }
  });
}

  loadRatings(movieId: number): void {
    this.movieService.getRatings(movieId).subscribe({
      next: (data) => this.ratings = data,
      error: (err) => console.error('Error loading ratings:', err)
    });
  }

  submitRating(): void {
  if (!this.movie) return;

  const data = {
    movie: this.movie.id,
    score: this.selectedScore
  };

  this.movieService.addRating(data).subscribe({
    next: () => {
      this.message = 'Rating submitted!';
      this.loadRatings(this.movie!.id);
    },
    error: () => {
      this.message = 'Failed to submit rating.';
    }
  });
}

  getAverageRating(): number {
    if (this.ratings.length === 0) return 0;
    const total = this.ratings.reduce((sum, rating) => sum + rating.score, 0);
    return total / this.ratings.length;
  }

  loadReviews(movieId: number): void {
    this.movieService.getReviews(movieId).subscribe({
      next: (data) => this.reviews = data,
      error: (err) => console.error('Error loading reviews:', err)
    });
  }

  submitReview(): void {
    if (!this.movie || !this.newReview) return;

    const data = {
      movie: this.movie.id,
      text: this.newReview
    };

    this.movieService.addReview(data).subscribe({
      next: () => {
        this.newReview = '';
        this.loadReviews(this.movie!.id);
      },
      error: () => console.error('Error submitting review')
      });
  }

  checkWatchlist(movieId: number): void {
  this.movieService.checkWatchlist(movieId).subscribe({
    next: (data) => {
      if (data.length > 0) {
        this.isInWatchlist = true;
        this.watchlistItemId = data[0].id;
      } else {
        this.isInWatchlist = false;
        this.watchlistItemId = null;
      }
    },
    error: (err) => console.error('Error checking watchlist:', err)
  });
}

  addToWatchlist(): void {
  if (!this.movie) return;

  const data = {
    movie_id: this.movie.id
  };

  this.movieService.addToWatchlist(data).subscribe({
    next: () => {
      this.isInWatchlist = true;
      this.checkWatchlist(this.movie!.id);
    },
    error: () => console.error('Error adding to watchlist')
  });
}

  removeFromWatchlist(): void {
    if (!this.watchlistItemId || !this.movie) return;

    this.movieService.removeFromWatchlist(this.watchlistItemId).subscribe({
      next: () => {
        this.isInWatchlist = false;
        this.watchlistItemId = null;
      },
      error: () => console.error('Error removing from watchlist')
    });
  }

  startEditReview(review: any): void {
  this.editingReviewId = review.id;
  this.editedReviewText = review.text;
}

cancelEditReview(): void {
  this.editingReviewId = null;
  this.editedReviewText = '';
}

updateReview(review: any): void {
  if (!this.movie) return;

  const data = {
    movie: this.movie.id,
    text: this.editedReviewText
  };

  this.movieService.updateReview(review.id, data).subscribe({
    next: () => {
      this.editingReviewId = null;
      this.editedReviewText = '';
      this.loadReviews(this.movie!.id);
    },
    error: (err) => console.error('Error updating review:', err)
  });
}

deleteReview(reviewId: number): void {
  if (!this.movie) return;

  this.movieService.deleteReview(reviewId).subscribe({
    next: () => this.loadReviews(this.movie!.id),
    error: (err) => console.error('Error deleting review:', err)
  });
}


toggleRatingForm(): void {
  this.showRatingForm = !this.showRatingForm;
}

toggleReviewForm(): void {
  this.showReviewForm = !this.showReviewForm;
}

togglePlayer(): void {
  if (!this.movie?.video_url) return;

  if (this.showPlayer) {
    this.showPlayer = false;
    return;
  }

  this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.video_url);
  this.showPlayer = true;
}


}