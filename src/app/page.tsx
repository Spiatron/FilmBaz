import Navbar from "@/components/Navbar";
import MovieRecommender from "@/components/MovieRecommender";
import ScrollUp from "@/components/ScrollUp";
import Background from "@/components/Background"; // Import Background component

export default function Home() {
  return (
    <>
      {/* Background component */}
      {/* <Background /> */}

      {/* Main content */}
      <div className="relative z-10"> {/* Ensures content is on top of the background */}
        <Navbar />
        <MovieRecommender />

        {/* Scroll to Top button */}
        <ScrollUp />
      </div>
    </>
  );
}
