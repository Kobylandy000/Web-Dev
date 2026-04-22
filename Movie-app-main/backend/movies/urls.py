from django.urls import path
from .views import (
    GenreListAPIView, MovieListAPIView, MovieDetailAPIView,
    RatingListCreateAPIView, ReviewListCreateAPIView,
    WatchlistAPIView, WatchlistDeleteAPIView,
    BuySubscriptionAPIView, SubscriptionAPIView,
    ReviewDetailAPIView, CurrentUserAPIView,
    SemanticMovieSearchAPIView,
    genre_stats, movie_search_fbv
)

urlpatterns = [
    path('genres/', GenreListAPIView.as_view(), name='genre-list'),
    path('genres/stats/', genre_stats, name='genre-stats'),
    path('movies/', MovieListAPIView.as_view(), name='movie-list'),
    path('movies/search/', movie_search_fbv, name='movie-search-fbv'),
    path('movies/<int:pk>/', MovieDetailAPIView.as_view(), name='movie-detail'),
    path('movies/semantic-search/', SemanticMovieSearchAPIView.as_view(), name='semantic-movie-search'),
    path('ratings/', RatingListCreateAPIView.as_view(), name='rating-list-create'),
    path('reviews/', ReviewListCreateAPIView.as_view(), name='review-list'),
    path('reviews/<int:pk>/', ReviewDetailAPIView.as_view(), name='review-detail'),
    path('watchlist/', WatchlistAPIView.as_view(), name='watchlist'),
    path('watchlist/<int:pk>/', WatchlistDeleteAPIView.as_view(), name='watchlist-delete'),
    path('subscription/', SubscriptionAPIView.as_view(), name='subscription'),
    path('subscription/buy/', BuySubscriptionAPIView.as_view(), name='buy-subscription'),
    path('auth/me/', CurrentUserAPIView.as_view(), name='current-user'),
]