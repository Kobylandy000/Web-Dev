from django.core.management.base import BaseCommand
from sentence_transformers import SentenceTransformer
from movies.models import Movie

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


class Command(BaseCommand):
    help = "Generate embeddings for all movies"

    def handle(self, *args, **kwargs):
        self.stdout.write("Loading model...")
        model = SentenceTransformer(MODEL_NAME)

        movies = Movie.objects.all()
        total = movies.count()

        self.stdout.write(f"Processing {total} movies...\n")

        for i, movie in enumerate(movies, start=1):
            
            text = f"{movie.title}. This is a {movie.genre.name} movie. {movie.description}"

            # generate embedding
            embedding = model.encode(text).tolist()

            # save to DB
            movie.embedding = embedding
            movie.save(update_fields=["embedding"])

            self.stdout.write(f"[{i}/{total}] Done: {movie.title}")

        self.stdout.write(self.style.SUCCESS("\n✅ All embeddings generated!"))