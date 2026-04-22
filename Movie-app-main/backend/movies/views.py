from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from rest_framework.views import APIView
from django.db.models import Q
from .models import Genre, Movie, Rating, Review, Watchlist, Subscription
from .serializers import (
    GenreSerializer, MovieSerializer, RatingSerializer,
    ReviewSerializer, WatchlistSerializer, SubscriptionSerializer,
    MovieSearchSerializer, RatingInputSerializer
)


# ✅ FBV #1 — Genre статистикасы
@api_view(['GET'])
def genre_stats(request):
    genres = Genre.objects.all()
    data = []
    for genre in genres:
        data.append({
            'id': genre.id,
            'name': genre.name,
            'movie_count': Movie.objects.filter(genre=genre).count()
        })
    return Response(data)


# ✅ FBV #2 — Фильм іздеу
@api_view(['GET'])
def movie_search_fbv(request):
    serializer = MovieSearchSerializer(data=request.query_params)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    query = serializer.validated_data['query']
    movies = Movie.objects.filter(
        Q(title__icontains=query) | Q(description__icontains=query)
    )
    result = MovieSerializer(movies, many=True)
    return Response(result.data)


# ✅ CBV-лар
class GenreListAPIView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class MovieListAPIView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def get_queryset(self):
        queryset = Movie.objects.all()

        genre_id = self.request.query_params.get('genre')
        search = self.request.query_params.get('search')

        if genre_id:
            queryset = queryset.filter(genre_id=genre_id)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset


class MovieDetailAPIView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def retrieve(self, request, *args, **kwargs):
        movie = self.get_object()

        if movie.is_premium:
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Subscription required for premium movies."},
                    status=403
                )

            subscription = Subscription.objects.filter(user=request.user, is_active=True).first()
            if not subscription:
                return Response(
                    {"detail": "Subscription required for premium movies."},
                    status=403
                )

        serializer = self.get_serializer(movie)
        return Response(serializer.data)


class RatingListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Rating.objects.all()
        movie_id = self.request.GET.get('movie')
        if movie_id:
            queryset = queryset.filter(movie_id=movie_id)
        return queryset

    def perform_create(self, serializer):
        movie = serializer.validated_data['movie']
        score = serializer.validated_data['score']

        Rating.objects.update_or_create(
            user=self.request.user,
            movie=movie,
            defaults={'score': score}
        )


class ReviewListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Review.objects.all()
        movie_id = self.request.GET.get('movie')
        if movie_id:
            queryset = queryset.filter(movie_id=movie_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WatchlistAPIView(generics.ListCreateAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Watchlist.objects.filter(user=self.request.user)
        movie_id = self.request.GET.get('movie')
        if movie_id:
            queryset = queryset.filter(movie_id=movie_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WatchlistDeleteAPIView(generics.DestroyAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)


class SubscriptionAPIView(generics.RetrieveAPIView):
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        subscription, created = Subscription.objects.get_or_create(user=self.request.user)
        return subscription


class BuySubscriptionAPIView(generics.UpdateAPIView):
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        subscription, created = Subscription.objects.get_or_create(user=self.request.user)
        return subscription

    def update(self, request, *args, **kwargs):
        subscription = self.get_object()
        subscription.is_active = True
        subscription.save()
        serializer = self.get_serializer(subscription)
        return Response(serializer.data)


class ReviewDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)


class CurrentUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username
        })


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
semantic_model = SentenceTransformer(MODEL_NAME)


class SemanticMovieSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get("query", "").strip()

        if not query:
            return Response([])

        query_embedding = semantic_model.encode(query)
        movies = Movie.objects.exclude(embedding__isnull=True)

        scored_movies = []
        for movie in movies:
            movie_embedding = np.array(movie.embedding).reshape(1, -1)
            query_vec = np.array(query_embedding).reshape(1, -1)
            score = cosine_similarity(query_vec, movie_embedding)[0][0]
            scored_movies.append((score, movie))

        scored_movies.sort(key=lambda x: x[0], reverse=True)
        top_movies = [movie for score, movie in scored_movies[:10]]
        serializer = MovieSerializer(top_movies, many=True)
        return Response(serializer.data)