import { fetchTrendMovie } from "@/Utils/FetchAPI";
import { MovieResult } from "@/Utils/Interfaces";
import { useEffect, useState } from "react";
import MovieCard from "../Cards/MovieCard";
import Trending from "../Cards/Trending";
import Footer from "./Footer";
import GenreRail from "./GenreRail";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";

const Home = () => {
  const [heroMovies, setHeroMovies] = useState<MovieResult[]>([]);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const trending = await fetchTrendMovie();
        if (!cancelled) setHeroMovies(trending ?? []);
      } finally {
        if (!cancelled) setHeroLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Navbar sits above the hero */}
      <NavBar />

      {/* Hero — full bleed, no extra top spacing needed (NavBar is sticky) */}
      <HeroSection movies={heroMovies} loading={heroLoading} />

      {/* Genre rail */}
      <div className="h-px" style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 25%, transparent), transparent)" }} />
      <GenreRail />

      {/* Content sections */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-3 sm:mx-5 lg:mx-8" />
      <Trending />
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-3 sm:mx-5 lg:mx-8" />
      <MovieCard />

      <Footer />
    </div>
  );
};

export default Home;
