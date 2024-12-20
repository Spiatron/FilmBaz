"use client";
import React, { useState } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"; // Importing necessary HoverCard components

interface Movie {
  title: string;
  poster_url: string;
  id: number;
  summary: string;
  release_date: string;  // Add release_date
  genres: number[];  // Add genres (array of genre ids)
 // runtime: number;  // Add runtime (in minutes)
}


interface MovieSuggestionDropdownProps {
  suggestions: Movie[];  
  onSelect: (movie: Movie) => void;
}


const MovieSuggestionDropdown: React.FC<MovieSuggestionDropdownProps> = ({
  suggestions,
  onSelect,
}) => {
  // Define a function to convert genre ids to their names
  const getGenres = (genreIds: number[]) => {
    const genreMap: { [key: number]: string } = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    return genreIds.map((id) => genreMap[id] || "Unknown").join(", ");
  };

  // Format runtime to hours and minutes
  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="absolute mt-1 z-10 rounded-md" style={{fontFamily:"kufi"}}>
      {suggestions.map((movie) => (
        <HoverCard key={movie.id} openDelay={200} closeDelay={100}>
          <HoverCardTrigger
            onClick={() => onSelect(movie)}
            className="cursor-pointer p-4 mb-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {movie.title} ({new Date(movie.release_date).getFullYear()})
                </h3>
                <p className="text-sm text-gray-500">
                {getGenres(movie.genres)} 
                  {/* {getGenres(movie.genres)} • {formatRuntime(movie.runtime)} */}
                </p>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="max-w-xs p-2 bg-black border rounded-md shadow-lg text-sm text-white dark:bg-white dark:text-black">
            <p>{movie.summary}</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default MovieSuggestionDropdown;
