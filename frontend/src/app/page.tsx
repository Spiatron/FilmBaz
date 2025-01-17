import Navbar from "@/components/Navbar";
import MovieRecommender from "@/components/MovieRecommender";
import ScrollUp from "@/components/ScrollUp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Main content with ShadCN layout */}
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Content */}
        <main className="flex-grow">
          <MovieRecommender />
        </main>

        {/* Scroll to Top button */}
        <ScrollUp />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
