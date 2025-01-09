import pickle
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

# Initialize FastAPI app
app = FastAPI()

# Allow all origins (for development purposes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all domains; change this for production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load the movie list and similarity matrix
with open('movie_list.pkl', 'rb') as file:
    movie_list = pickle.load(file)

with open('similarity.pkl', 'rb') as file:
    similarity_matrix = pickle.load(file)

# Convert movie_list to a DataFrame
movies = pd.DataFrame(movie_list)  # Assuming it's a list of dictionaries or similar

# Function to fetch movie details from TMDb (poster, summary, rating, trailer, etc.)
def fetch_movie_details(movie_id):
    # TMDb movie details API
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?[ADD_YOUR_TMDB_API_KEY_HERE]language=en-US"
    data = requests.get(url).json()
    
    # Fetching poster, summary, rating, genres, release date, and runtime
    poster_path = data.get('poster_path', '')
    poster_url = f"https://image.tmdb.org/t/p/w500/{poster_path}" if poster_path else None
    summary = data.get('overview', 'No summary available.')
    rating = data.get('vote_average', 'No rating available.')
    genres = ', '.join([genre['name'] for genre in data.get('genres', [])])
    release_date = data.get('release_date', 'Unknown release date')
    runtime = data.get('runtime', 'Unknown runtime')
    runtime_str = f"{runtime // 60}h {runtime % 60}m" if isinstance(runtime, int) else runtime
    
    # Fetching YouTube trailer link
    video_url = None
    videos_url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos?[ADD_YOUR_TMDB_API_KEY_HERE]language=en-US"
    video_data = requests.get(videos_url).json()
    for video in video_data.get('results', []):
        if video['site'] == 'YouTube' and video['type'] == 'Trailer':
            video_url = f"https://www.youtube.com/watch?v={video['key']}"
            break
    
    return {
        "poster_url": poster_url,
        "summary": summary,
        "rating": rating,
        "genres": genres,
        "release_date": release_date,
        "runtime": runtime_str,
        "trailer_url": video_url
    }

# Request schema
class RecommendationRequest(BaseModel):
    movie_title: str
    top_n: int = 5

# Recommendation logic
@app.post("/recommend")
def recommend(request: RecommendationRequest):
    movie_title = request.movie_title
    top_n = request.top_n

    if movie_title not in movies['title'].values:
        return {"success": False, "message": f"Movie '{movie_title}' not found!"}

    # Find index of the movie
    movie_index = movies[movies['title'] == movie_title].index[0]

    # Fetch similarity scores
    similarity_scores = list(enumerate(similarity_matrix[movie_index]))
    sorted_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[1:top_n + 1]

    # Get recommended movie titles, posters, summaries, ratings, genres, release dates, runtimes, and trailers
    recommended_movies = []
    for i in sorted_scores:
        movie_info = movies.iloc[i[0]]
        movie_id = movie_info['tmdbId']  # Assuming movie_id exists
        movie_details = fetch_movie_details(movie_id)
        
        recommended_movies.append({
            'title': movie_info['title'],
            'poster_url': movie_details['poster_url'],
            'summary': movie_details['summary'],
            'rating': movie_details['rating'],
            'genres': movie_details['genres'],
            'release_date': movie_details['release_date'],
            'runtime': movie_details['runtime'],
            'trailer_url': movie_details['trailer_url']
        })

    return {"success": True, "recommendations": recommended_movies}
