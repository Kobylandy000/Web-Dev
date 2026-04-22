from rest_framework import serializers
from .models import Genre, Movie, Rating, Review, Watchlist, Subscription


# ✅ serializers.Serializer (талап бойынша кемінде 2 штук)
class MovieSearchSerializer(serializers.Serializer):
    query = serializers.CharField(max_length=200)


class RatingInputSerializer(serializers.Serializer):
    movie_id = serializers.IntegerField()
    score = serializers.IntegerField(min_value=1, max_value=10)


# ✅ ModelSerializer-лар (бұрынғылары өзгеріссіз)
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(),
        source='genre',
        write_only=True
    )

    class Meta:
        model = Movie
        fields = [
            'id',
            'title',
            'description',
            'release_year',
            'genre',
            'genre_id',
            'poster_url',
            'video_url',
            'is_premium',
        ]


class RatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'username', 'user', 'movie', 'score']
        read_only_fields = ['user']


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'username', 'user', 'movie', 'text']
        read_only_fields = ['user']


class WatchlistSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    movie_id = serializers.PrimaryKeyRelatedField(
        queryset=Movie.objects.all(),
        source='movie',
        write_only=True
    )

    class Meta:
        model = Watchlist
        fields = ['id', 'user', 'movie', 'movie_id']
        read_only_fields = ['user']


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
        read_only_fields = ['user']