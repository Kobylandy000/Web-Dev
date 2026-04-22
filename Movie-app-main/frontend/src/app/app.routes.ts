import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { WatchlistComponent } from './pages/watchlist/watchlist';
import { SubscriptionComponent } from './pages/subscription/subscription';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'subscription', component: SubscriptionComponent },
];