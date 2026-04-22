import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.css'
})
export class SubscriptionComponent implements OnInit {
  subscription: any = null;
  message = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadSubscription();
  }

  loadSubscription(): void {
    this.movieService.getSubscription().subscribe({
      next: (data) => this.subscription = data,
      error: (err) => console.error('Error loading subscription:', err)
    });
  }

  buySubscription(): void {
    this.movieService.buySubscription().subscribe({
      next: (data) => {
        this.subscription = data;
        this.message = 'Subscription activated!';
      },
      error: () => {
        this.message = 'Failed to activate subscription.';
      }
    });
  }
}