// MovieHeader.tsx
import React from 'react';
import Image from 'next/image';

const MovieHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-6 sm:bg-slate-300 py-6 rounded-lg dark:bg-slate-100 dark:text-black">
      {/* Image and Text */}
      <Image
        src="/netflix.svg"  // Path to the SVG file in the public directory
        alt="Home Cinema"
        width={288}              // Increased width for a bigger image
        height={512}             // Increased height for a bigger image
        className="mb-4"         // Add margin to space out from the text
      />
      <h1 className="text-4xl sm:text-2xl font-extrabold text-gradient bg-clip-text" style={{fontFamily:"kufi"}}>
        Discover Your Next Favorite Movie
      </h1>
    </div>
  );
};

export default MovieHeader;
