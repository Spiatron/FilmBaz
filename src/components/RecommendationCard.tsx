"use client";
import React from "react";
import Image from "next/image";
import { Card, CardTitle, CardContent, CardDescription,} from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Recommendation {
  title: string;
  poster_url: string;
  summary: string;
  rating: string;
  trailer_url: string | null;
  genres: string;
  release_date: string;
  runtime: string;
}

const RecommendationCard: React.FC<Recommendation> = ({
  title,
  poster_url,
  summary,
  rating,
  trailer_url,
  genres,
  release_date,
  runtime,
}) => {
  const ratingPercentage = Math.round(parseFloat(rating) * 10);

    // Function to determine the path color based on ratingPercentage
    const getPathColor = (percentage: number) => {
      if (percentage >= 90) return "#006400"; // Dark Green
      if (percentage >= 75) return "#32CD32"; // Green
      if (percentage >= 50) return "#FFD700"; // Yellow
      return "#FF4500"; // Red
    };

  return (
    <Card
      className="relative max-w-4xl mx-auto shadow-xl rounded-xl p-6 text-white mb-6 mt-6 border-none" style={{background:"#0a0a0a", fontFamily:"kufi"}}>
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Poster Section */}
        <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
          <Image
            src={poster_url}
            alt={title}
            width={300}
            height={450}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {/* Title and Metadata */}
          <div>
            <CardTitle className="text-2xl font-extrabold">
              {title} <span className="text-gray-400 text-lg">({new Date(release_date).getFullYear()})</span>
            </CardTitle>
            <div className="flex text-sm text-gray-400 gap-4 mt-2">
              <p>{genres}</p>
              <span>•</span>
              <p>{runtime}</p>
            </div>
          </div>

          {/* Summary */}
            <CardDescription className="text-sm text-gray-300 text-pretty">
              {summary}
            </CardDescription>

          {/* Trailer Section */}
          {trailer_url ? (
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${trailer_url.split("v=")[1]}`}
              title={`Trailer for ${title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-700 rounded-lg mt-4">
              <p className="text-gray-500">Trailer not available</p>
            </div>
          )}
        </div>
      </div>

      {/* Rating in Top-Right Corner */}
      <div className="absolute top-6 right-6 w-16 h-16">
        <CircularProgressbar
          value={ratingPercentage}
          text={`${ratingPercentage}%`}
          styles={buildStyles({
            textSize: "1.5rem",
            textColor: "#fff",
           pathColor: getPathColor(ratingPercentage),
            trailColor: "#2d2d2d",
          })}
        />
      </div>
    </Card>
  );
};

export default RecommendationCard;
