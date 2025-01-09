"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import SearchInput from "@/components/SearchInput";
import MovieSuggestionDropdown from "@/components/MovieSuggestionDropdown";
import RecommendationCard from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import TopLoadingBar from 'react-top-loading-bar';
import { RiMovie2Line } from "react-icons/ri";
import MovieHeader from "@/components/MovieHeader";


const MovieRecommender: React.FC = () => {
  const [movie, setMovie] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);  // State for loading status
  const [recommendationFetched, setRecommendationFetched] = useState(false);  // New state to track if recommendations are fetched
  const loaderRef = useRef<any>(null);  // Create a reference for the loading bar

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const searchMovies = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    loaderRef.current?.continuousStart();  // Start the loading bar

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: query,
          language: "en-US",
          page: 1,
          include_adult: false,
        },
      });

      setSuggestions(
        response.data.results.map((movie: any) => ({
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          id: movie.id,
          summary: movie.overview || "No summary available",
          release_date: movie.release_date,
          genres: movie.genre_ids,
        }))
      );
    } catch (error) {
      console.error("Error fetching movie suggestions:", error);
    } finally {
      setLoading(false);
      loaderRef.current?.complete();  // Complete the loading bar
    }
  };

  const getRecommendations = async () => {
    if (!selectedMovie) return;

    setLoading(true);
    loaderRef.current?.continuousStart();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recommend`, {
        movie_title: selectedMovie.title,
        top_n: 5,
    });    

      if (response.data.success) {
        setRecommendations(response.data.recommendations);
        setRecommendationFetched(true);  // Set to true after fetching recommendations
      } else {
        setAlertMessage(response.data.message || "Something went wrong.");
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
      loaderRef.current?.complete();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(e.target.value);
    searchMovies(e.target.value);
  };

  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie);
    setMovie(movie.title);
    setSuggestions([]);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4"  style={{fontFamily:"kufi"}}>
      {/* Top Loading Bar */}
      <TopLoadingBar color="#7209b7" className="h-5.5" ref={loaderRef} />

   {/* Movie Header */}
   <MovieHeader />


      {/* Conditionally render SearchInput and Button */}
      {!recommendationFetched && (
        <>
          <SearchInput value={movie} onChange={handleInputChange} />
          {/* Conditionally render the button based on movie selection */}
          {selectedMovie && (
            <Button onClick={getRecommendations} disabled={loading} className="mt-2">
              {loading ? <RiMovie2Line className="animate-spin" /> : "Get Recommendations"}
            </Button>
          )}
        </>
      )}

      {/* Movie Suggestions */}
      {suggestions.length > 0 && (
        <MovieSuggestionDropdown suggestions={suggestions} onSelect={handleMovieSelect} />
      )}

      {/* Movie Recommendations */}
      <div>
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} {...rec} />
        ))}
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Something Went Wrong</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpenAlert(false)}>Okay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MovieRecommender;
