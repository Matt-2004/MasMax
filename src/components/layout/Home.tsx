import {
  fetchTrendMovie,
  fetchTopRatedMovie,
  fetchNowPlaying,
  fetchTrendingTV,
  fetchUpComingMoive,
} from "@/lib/FetchAPI";
import { getLargeImagePath } from "@/lib/GetImagePath";
import { MovieResult, TVResult } from "@/lib/Interfaces";
import { lazy, Suspense, useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import HomeRow from "./HomeRow";

// NavBar: split so it doesn't block hero paint
const NavBar = lazy(() => import("./NavBar"));
// GenreRail: below-fold genre pill strip
const GenreRail = lazy(() => import("./GenreRail"));
// Footer: entirely below the fold
const Footer = lazy(() => import("./Footer"));

declare global {
  interface Window {
    __heroPromise?: Promise<MovieResult[]>;
  }
}

const Divider = () => (
  <div
    className="h-px mx-3 sm:mx-5 lg:mx-8"
    style={{
      background:
        "linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 20%, transparent), transparent)",
    }}
  />
);

const Home = () => {
  const [heroMovies, setHeroMovies] = useState<MovieResult[]>([]);
  const [heroLoading, setHeroLoading] = useState(true);

  const [trendingMovies, setTrendingMovies] = useState<MovieResult[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  const [topRated, setTopRated] = useState<MovieResult[]>([]);
  const [topRatedLoading, setTopRatedLoading] = useState(true);

  const [nowPlaying, setNowPlaying] = useState<MovieResult[]>([]);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);

  const [upcoming, setUpcoming] = useState<MovieResult[]>([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);

  const [trendingTV, setTrendingTV] = useState<TVResult[]>([]);
  const [trendingTVLoading, setTrendingTVLoading] = useState(true);

  useEffect(() => {
    const dataPromise: Promise<MovieResult[]> =
      window.__heroPromise ?? fetchTrendMovie();

    let cancelled = false;
    dataPromise
      .then((results) => {
        if (!cancelled) {
          const movies = results ?? [];
          setHeroMovies(movies);
          // Inject a <link rel="preload"> for the LCP hero backdrop the moment
          // we have the URL — this races the React render and wins most of the time.
          if (movies[0]?.backdrop_path) {
            const existing = document.querySelector("link[data-hero-preload]");
            if (!existing) {
              const link = document.createElement("link");
              link.rel = "preload";
              link.as = "image";
              link.href = getLargeImagePath(movies[0].backdrop_path);
              link.setAttribute("fetchpriority", "high");
              link.setAttribute("data-hero-preload", "1");
              document.head.appendChild(link);
            }
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          fetchTrendMovie()
            .then((r) => {
              if (!cancelled) setHeroMovies(r ?? []);
            })
            .catch(() => {});
        }
      })
      .finally(() => {
        if (!cancelled) setHeroLoading(false);
      });

    // Secondary rows: fire all in parallel — don't waterfall
    Promise.all([
      fetchTrendMovie("week"),
      fetchTopRatedMovie(),
      fetchNowPlaying(),
      fetchUpComingMoive(),
      fetchTrendingTV("week"),
    ])
      .then(([trending, topR, nowP, upcoming, tv]) => {
        if (cancelled) return;
        setTrendingMovies(trending ?? []);
        setTrendingLoading(false);
        setTopRated(topR ?? []);
        setTopRatedLoading(false);
        setNowPlaying(nowP ?? []);
        setNowPlayingLoading(false);
        setUpcoming(upcoming ?? []);
        setUpcomingLoading(false);
        setTrendingTV(tv ?? []);
        setTrendingTVLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setTrendingLoading(false);
        setTopRatedLoading(false);
        setNowPlayingLoading(false);
        setUpcomingLoading(false);
        setTrendingTVLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <Suspense
        fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}
      >
        <NavBar />
      </Suspense>

      {/* Hero — full bleed */}
      <HeroSection movies={heroMovies} loading={heroLoading} />

      {/* Genre rail */}
      <Divider />
      <Suspense fallback={<div style={{ height: 80 }} />}>
        <GenreRail />
      </Suspense>

      {/* Content rows — content-visibility:auto lets browser skip layout+paint
           for rows fully outside the viewport, cutting scroll jank significantly */}
      <Divider />
      <div
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 280px" }}
      >
        <HomeRow
          title="Trending This Week"
          subtitle="Most popular movies right now"
          items={trendingMovies}
          type="movie"
          loading={trendingLoading}
          viewAllHref="/movies"
          eagerCount={5}
        />
      </div>

      <Divider />
      <div
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 280px" }}
      >
        <HomeRow
          title="Now Playing"
          subtitle="Currently in cinemas"
          items={nowPlaying}
          type="movie"
          loading={nowPlayingLoading}
          viewAllHref="/movies"
        />
      </div>

      <Divider />
      <div
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 280px" }}
      >
        <HomeRow
          title="Top Rated"
          subtitle="All-time highest rated films"
          items={topRated}
          type="movie"
          loading={topRatedLoading}
          viewAllHref="/movies"
        />
      </div>

      <Divider />
      <div
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 280px" }}
      >
        <HomeRow
          title="Coming Soon"
          subtitle="Upcoming theatrical releases"
          items={upcoming}
          type="movie"
          loading={upcomingLoading}
          viewAllHref="/movies"
        />
      </div>

      <Divider />
      <div
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 280px" }}
      >
        <HomeRow
          title="Trending TV Shows"
          subtitle="Hottest series this week"
          items={trendingTV}
          type="tv"
          loading={trendingTVLoading}
          viewAllHref="/series"
        />
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
