import os
import requests
from django.core.management.base import BaseCommand
from movies.models import Genre, Movie

TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"


def fetch_tmdb_poster(title: str, year: int | None, api_key: str) -> str:
    params = {
        "api_key": api_key,
        "query": title,
        "include_adult": "false",
    }
    if year:
        params["year"] = year

    try:
        response = requests.get(TMDB_SEARCH_URL, params=params, timeout=20)
        response.raise_for_status()
        data = response.json()

        results = data.get("results", [])
        if not results:
            return ""

        # first result is usually good enough for this class project
        poster_path = results[0].get("poster_path")
        if not poster_path:
            return ""

        return f"{TMDB_IMAGE_BASE}{poster_path}"
    except Exception as e:
        print(f"Poster fetch failed for {title}: {e}")
        return ""


class Command(BaseCommand):
    help = "Seed genres and real movies with TMDb poster links"

    def handle(self, *args, **kwargs):
        api_key = os.getenv("TMDB_API_KEY")
        if not api_key:
            self.stdout.write(self.style.ERROR("TMDB_API_KEY is not set."))
            return

        genres_data = [
            "Action",
            "Comedy",
            "Drama",
            "Sci-Fi",
            "Romance",
            "Thriller",
            "Fantasy",
            "Animation",
        ]

        genre_map = {}
        for genre_name in genres_data:
            genre, _ = Genre.objects.get_or_create(name=genre_name)
            genre_map[genre_name] = genre

        # wipe old fake/demo movies
        Movie.objects.all().delete()

        # keep your real list here
        movies_data = [
            {"title": "The Godfather", "description": "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.", "release_year": 1972, "genre": "Drama", "video_url": "https://www.youtube.com/embed/sY1S34973zA", "is_premium": True},
            {"title": "Pulp Fiction", "description": "The lives of two mob hitmen, a boxer, and a gangster's wife intertwine.", "release_year": 1994, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/s7EdQ4FqbhY", "is_premium": False},
            {"title": "The Lion King", "description": "A young lion prince flees his kingdom only to learn the true meaning of responsibility.", "release_year": 1994, "genre": "Animation", "video_url": "https://www.youtube.com/embed/lFzVJEksoDY", "is_premium": False},
            {"title": "Parasite", "description": "Greed and class discrimination threaten the newly formed symbiotic relationship.", "release_year": 2019, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/5xH0HfJHsaY", "is_premium": True},
            {"title": "Gladiator", "description": "A former Roman General sets out to exact vengeance against the corrupt emperor.", "release_year": 2000, "genre": "Action", "video_url": "https://www.youtube.com/embed/P5ieIbInFpg", "is_premium": False},
            {"title": "Avatar", "description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission.", "release_year": 2009, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/5PSNL1qE6VY", "is_premium": True},
            {"title": "Shrek", "description": "An ogre finds his swamp invaded by fairy tale creatures.", "release_year": 2001, "genre": "Animation", "video_url": "https://www.youtube.com/embed/OoZbaG_9n_w", "is_premium": False},
            {"title": "The Silence of the Lambs", "description": "A young FBI cadet must receive the help of an incarcerated cannibal killer.", "release_year": 1991, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/W6Mm8SbeRIw", "is_premium": True},
            {"title": "Superbad", "description": "Two co-dependent high school seniors are forced to deal with separation anxiety.", "release_year": 2007, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/4eaZ_48ZYog", "is_premium": False},
            {"title": "Spirited Away", "description": "A young girl wanders into a world ruled by gods, witches, and spirits.", "release_year": 2001, "genre": "Animation", "video_url": "https://www.youtube.com/embed/ByXuk9QqQkk", "is_premium": False},
            {"title": "The Wolf of Wall Street", "description": "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker.", "release_year": 2013, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/iszwuX1AK6A", "is_premium": True},
            {"title": "Everything Everywhere All At Once", "description": "A Chinese immigrant is swept up in an insane adventure.", "release_year": 2022, "genre": "Fantasy", "video_url": "https://www.youtube.com/embed/nm94ttPZzzs", "is_premium": True},
            {"title": "The Grand Budapest Hotel", "description": "A writer encounters the owner of a decaying high-class hotel.", "release_year": 2014, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/1Fg5iWmQjwk", "is_premium": False},
            {"title": "Dune", "description": "Feature adaptation of Frank Herbert's science fiction novel.", "release_year": 2021, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/n9xhJrPXop4", "is_premium": True},
            {"title": "Coco", "description": "Aspiring musician Miguel faces his family's ancestral ban on music.", "release_year": 2017, "genre": "Animation", "video_url": "https://www.youtube.com/embed/xlnPHQ3TLX8", "is_premium": False},
            {"title": "The Notebook", "description": "A poor yet passionate young man falls in love with a rich young woman.", "release_year": 2004, "genre": "Romance", "video_url": "https://www.youtube.com/embed/yDJIcYE32NU", "is_premium": False},
            {"title": "Inglourious Basterds", "description": "In Nazi-occupied France during WWII, a plan to assassinate Nazi leaders.", "release_year": 2009, "genre": "Action", "video_url": "https://www.youtube.com/embed/KnrRy6kSFF0", "is_premium": True},
            {"title": "The Truman Show", "description": "An insurance salesman discovers his whole life is actually a reality TV show.", "release_year": 1998, "genre": "Drama", "video_url": "https://www.youtube.com/embed/dlnmQbPGuls", "is_premium": False},
            {"title": "The Dark Knight Rises", "description": "Batman faces Bane in the epic conclusion.", "release_year": 2012, "genre": "Action", "video_url": "https://www.youtube.com/embed/g8evyE9TuYk", "is_premium": True},
            {"title": "The Hangover", "description": "A bachelor party in Vegas goes horribly wrong.", "release_year": 2009, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/tcdUhdOlz9M", "is_premium": False},
            {"title": "Seven", "description": "Two detectives hunt a serial killer.", "release_year": 1995, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/znmZoRUUPBA", "is_premium": True},
            {"title": "Up", "description": "An old man flies his house with balloons.", "release_year": 2009, "genre": "Animation", "video_url": "https://www.youtube.com/embed/ORFWdXl_zJ4", "is_premium": False},
            {"title": "Eternal Sunshine of the Spotless Mind", "description": "A couple undergoes a procedure to erase memories.", "release_year": 2004, "genre": "Romance", "video_url": "https://www.youtube.com/embed/yKWbb2p_g48", "is_premium": True},
            {"title": "Blade Runner 2049", "description": "A new blade runner unearths a long-buried secret.", "release_year": 2017, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/gCcx85zbxz4", "is_premium": True},
            {"title": "The Prestige", "description": "Two magicians engage in a competitive rivalry.", "release_year": 2006, "genre": "Drama", "video_url": "https://www.youtube.com/embed/RLtaA9LfAFc", "is_premium": True},
            {"title": "Lord of the Rings: The Fellowship of the Ring", "description": "A hobbit sets out to destroy a powerful ring.", "release_year": 2001, "genre": "Fantasy", "video_url": "https://www.youtube.com/embed/V75dMMIW2B4", "is_premium": True},
            {"title": "Mad Max: Fury Road", "description": "A woman rebels against a tyrannical ruler.", "release_year": 2015, "genre": "Action", "video_url": "https://www.youtube.com/embed/hEJnMQG9ev8", "is_premium": True},
            {"title": "Mean Girls", "description": "A new student navigates high school social cliques.", "release_year": 2004, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/oQEYNAcNCsQ", "is_premium": False},
            {"title": "Gone Girl", "description": "A man becomes the primary suspect in his wife's disappearance.", "release_year": 2014, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/2-_g8NZb1I0", "is_premium": True},
            {"title": "Spider-Man: Into the Spider-Verse", "description": "Teen Miles Morales becomes the Spider-Man.", "release_year": 2018, "genre": "Animation", "video_url": "https://www.youtube.com/embed/g4Hbz2j-f30", "is_premium": False},
            {"title": "Before Sunrise", "description": "Two strangers meet on a train and spend the night in Vienna.", "release_year": 1995, "genre": "Romance", "video_url": "https://www.youtube.com/embed/6MUcuqbGTxc", "is_premium": False},
            {"title": "Arrival", "description": "A linguist tries to communicate with extraterrestrials.", "release_year": 2016, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/tFMo3UJ4B4g", "is_premium": True},
            {"title": "Harry Potter and the Sorcerer's Stone", "description": "An orphaned boy enrolls in a school of wizardry.", "release_year": 2001, "genre": "Fantasy", "video_url": "https://www.youtube.com/embed/VyHV0BRtdxo", "is_premium": True},
            {"title": "Forrest Gump", "description": "A simple man witnesses historical events.", "release_year": 1994, "genre": "Drama", "video_url": "https://www.youtube.com/embed/bLvqoHBptjg", "is_premium": False},
            {"title": "The Dark Knight", "description": "Batman battles the Joker.", "release_year": 2008, "genre": "Action", "video_url": "https://www.youtube.com/embed/EXeTwQWrcwY", "is_premium": True},
            {"title": "Shutter Island", "description": "A marshal investigates a disappearance at a mental hospital.", "release_year": 2010, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/5iaYLCiq5RM", "is_premium": True},
            {"title": "Moana", "description": "An adventurous teenager sails out on a mission.", "release_year": 2016, "genre": "Animation", "video_url": "https://www.youtube.com/embed/LKFuXETZUsI", "is_premium": False},
            {"title": "Pride & Prejudice", "description": "Sparks fly when Elizabeth Bennet meets Mr. Darcy.", "release_year": 2005, "genre": "Romance", "video_url": "https://www.youtube.com/embed/Ur_DIHs92NM", "is_premium": False},
            {"title": "The Martian", "description": "An astronaut is stranded on Mars.", "release_year": 2015, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/ej3ioOnequ8", "is_premium": True},
            {"title": "The Hobbit: An Unexpected Journey", "description": "A reluctant hobbit joins a quest to reclaim a mountain.", "release_year": 2012, "genre": "Fantasy", "video_url": "https://www.youtube.com/embed/SDnYMbYB-nU", "is_premium": True},
            {"title": "Whiplash", "description": "A drummer pushes himself to the limit.", "release_year": 2014, "genre": "Drama", "video_url": "https://www.youtube.com/embed/7d_jQycdQGo", "is_premium": True},
            {"title": "Die Hard", "description": "An officer battles terrorists in a skyscraper.", "release_year": 1988, "genre": "Action", "video_url": "https://www.youtube.com/embed/2TQ-mDMs46Y", "is_premium": False},
            {"title": "Step Brothers", "description": "Two middle-aged men become step brothers.", "release_year": 2008, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/CewglxElBK0", "is_premium": False},
            {"title": "No Country for Old Men", "description": "A hunter finds a drug deal gone wrong.", "release_year": 2007, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/38A__WT3-o0", "is_premium": True},
            {"title": "How to Train Your Dragon", "description": "A Viking befriends a dragon.", "release_year": 2010, "genre": "Animation", "video_url": "https://www.youtube.com/embed/oKiYuIsPxYk", "is_premium": False},
            {"title": "The Fault in Our Stars", "description": "Two teens with cancer fall in love.", "release_year": 2014, "genre": "Romance", "video_url": "https://www.youtube.com/embed/9ItBvH5J6ss", "is_premium": False},
            {"title": "The Godfather Part II", "description": "The early life and career of Vito Corleone.", "release_year": 1974, "genre": "Drama", "video_url": "https://www.youtube.com/embed/9O1Iy9od7-A", "is_premium": True},
            {"title": "Fight Club", "description": "An insomniac office worker and a soap salesman form a fight club.", "release_year": 1999, "genre": "Drama", "video_url": "https://www.youtube.com/embed/qtRKdVHc-cE", "is_premium": True},
            {"title": "Star Wars: A New Hope", "description": "Luke Skywalker joins forces to save the galaxy.", "release_year": 1977, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/vZ734NWnAHA", "is_premium": True},
            {"title": "Finding Nemo", "description": "A clownfish sets out to find his son.", "release_year": 2003, "genre": "Animation", "video_url": "https://www.youtube.com/embed/SPHfeNgogVs", "is_premium": False},
            {"title": "The Big Lebowski", "description": "The Dude is mistaken for a millionaire.", "release_year": 1998, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/cd-go0oBF4Y", "is_premium": False},
            {"title": "Se7en", "description": "Two detectives hunt a serial killer.", "release_year": 1995, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/znmZoVkCjpI", "is_premium": True},
            {"title": "The Lord of the Rings: The Return of the King", "description": "The final battle for Middle-earth.", "release_year": 2003, "genre": "Fantasy", "video_url": "https://www.youtube.com/embed/r5X-hFf6Bwo", "is_premium": True},
            {"title": "Blade Runner", "description": "A blade runner must pursue and terminate four replicants.", "release_year": 1982, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/eogpIG53Cis", "is_premium": True},
            {"title": "The Shining", "description": "A family heads to an isolated hotel for the winter.", "release_year": 1980, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/S014oGZiSdI", "is_premium": True},
            {"title": "Ratatouille", "description": "A rat who can cook makes an unusual alliance.", "release_year": 2007, "genre": "Animation", "video_url": "https://www.youtube.com/embed/NgsQ8mVkN8w", "is_premium": False},
            {"title": "Casablanca", "description": "A nightclub owner encounters a former lover.", "release_year": 1942, "genre": "Romance", "video_url": "https://www.youtube.com/embed/BkL9l7qovsE", "is_premium": False},
            {"title": "John Wick", "description": "A retired hitman seeks vengeance.", "release_year": 2014, "genre": "Action", "video_url": "https://www.youtube.com/embed/C0BMx-qxsP4", "is_premium": True},
            {"title": "The Social Network", "description": "The creation of Facebook.", "release_year": 2010, "genre": "Drama", "video_url": "https://www.youtube.com/embed/lB95KLmpLR4", "is_premium": False},
            {"title": "Pan's Labyrinth", "description": "A girl retreats into a fantasy world.", "release_year": 2006, "genre": "Fantasy", "video_url": "https://www.youtube.com/embed/AcHasH-nLhU", "is_premium": True},
            {"title": "Little Miss Sunshine", "description": "A family travels to a beauty pageant.", "release_year": 2006, "genre": "Comedy", "video_url": "https://www.youtube.com/embed/wvwVkllXT80", "is_premium": False},
            {"title": "Memento", "description": "A man with short-term memory loss seeks his wife's killer.", "release_year": 2000, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/4CV41hoyS8A", "is_premium": True},
            {"title": "WALL·E", "description": "A small waste-collecting robot goes on a space journey.", "release_year": 2008, "genre": "Animation", "video_url": "https://www.youtube.com/embed/CZ1CATNbXg0", "is_premium": False},
            {"title": "The Usual Suspects", "description": "A sole survivor tells the story of a heist.", "release_year": 1995, "genre": "Thriller", "video_url": "https://www.youtube.com/embed/oiXdPolca5w", "is_premium": True},
            {"title": "Leon: The Professional", "description": "A hitman protects a 12-year-old girl.", "release_year": 1994, "genre": "Action", "video_url": "https://www.youtube.com/embed/jawVxq1Iyl0", "is_premium": True},
            {"title": "Alice in Wonderland", "description": "A journey into a surreal fantasy world.", "release_year": 1951, "genre": "Fantasy", "video_url": "https://www.youtube.com/embed/pAwR6w2TgxY", "is_premium": False},
            {"title": "Beauty and the Beast", "description": "A prince under a curse falls in love.", "release_year": 1991, "genre": "Romance", "video_url": "https://www.youtube.com/embed/e3Nl_TCQXuw", "is_premium": False},
            {"title": "Terminator 2: Judgment Day", "description": "A cyborg is sent to protect a boy.", "release_year": 1991, "genre": "Sci-Fi", "video_url": "https://www.youtube.com/embed/CRRlbK5w8AE", "is_premium": True},
            {"title": "Seven Samurai", "description": "Samurai protect a village.", "release_year": 1954, "genre": "Action", "video_url": "https://www.youtube.com/embed/wJ1TOratCTo", "is_premium": False},
        ]

        created_count = 0
        missing_posters = []

        for movie_data in movies_data:
            poster_url = fetch_tmdb_poster(
                title=movie_data["title"],
                year=movie_data["release_year"],
                api_key=api_key,
            )

            if not poster_url:
                missing_posters.append(movie_data["title"])
                poster_url = "https://dummyimage.com/500x750/111827/c084fc&text=No+Poster"

            Movie.objects.create(
                title=movie_data["title"],
                description=movie_data["description"],
                release_year=movie_data["release_year"],
                genre=genre_map[movie_data["genre"]],
                poster_url=poster_url,
                video_url=movie_data["video_url"],
                is_premium=movie_data["is_premium"],
            )
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Seeded movies. Created: {created_count}"))

        if missing_posters:
            self.stdout.write(self.style.WARNING("Movies with no TMDb poster found:"))
            for title in missing_posters:
                self.stdout.write(f" - {title}")