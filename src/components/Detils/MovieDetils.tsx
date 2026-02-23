import { DetilsResult } from "@/Utils/Interfaces";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetils, fetchVideo } from "../../Utils/FetchAPI";

// NavBar: shared heavy chunk, lazy so it doesn't block content render
const NavBar = lazy(() => import("../Home/NavBar"));

// DetilsComponents: single network request (module cached by browser),
// each export wrapped so React.lazy gets a { default } shape.
// All 7 imports resolve from the same cached module chunk.
const DC = {
  BackdropHero: lazy(() => import("./DetilsComponents").then(m => ({ default: m.BackdropHero }))),
  PosterCard: lazy(() => import("./DetilsComponents").then(m => ({ default: m.PosterCard }))),
  GenreList: lazy(() => import("./DetilsComponents").then(m => ({ default: m.GenreList }))),
  RatingBadge: lazy(() => import("./DetilsComponents").then(m => ({ default: m.RatingBadge }))),
  WatchlistButton: lazy(() => import("./DetilsComponents").then(m => ({ default: m.WatchlistButton }))),
  OverviewSection: lazy(() => import("./DetilsComponents").then(m => ({ default: m.OverviewSection }))),
  VideosSection: lazy(() => import("./DetilsComponents").then(m => ({ default: m.VideosSection }))),
};

const MovieDetils = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const id = movieId ?? localStorage.getItem("id") ?? "";

  const [detils, setDetils] = useState<DetilsResult | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!id) return;
    window.scrollTo({ top: 0, behavior: "instant" });

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setDetils(null);
    setVideos([]);
    localStorage.setItem("id", id);

    (async () => {
      try {
        const [details, vids] = await Promise.all([
          fetchMovieDetils(Number(id)),
          fetchVideo(id),
        ]);
        if (controller.signal.aborted) return;
        setDetils(details ?? null);
        setVideos(Array.isArray(vids) ? vids : []);
      } catch {
        // silently ignore aborted requests
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
        <Suspense fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}>
          <NavBar />
        </Suspense>
        <div className="animate-pulse">
          {/* Backdrop skeleton */}
          <div className="w-full h-[50vw] max-h-[520px] bg-white/5" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 -mt-32 relative z-10">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-40 sm:w-52 lg:w-64 flex-shrink-0 aspect-[2/3] rounded-2xl bg-white/10 self-start" />
              <div className="flex-1 space-y-4 pt-4">
                <div className="h-8 bg-white/10 rounded-lg w-3/4" />
                <div className="h-4 bg-white/8 rounded w-1/2" />
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-7 w-20 bg-white/8 rounded-full" />)}
                </div>
                <div className="h-24 bg-white/5 rounded-xl mt-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!detils) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)" }}>
        <Suspense fallback={null}><NavBar /></Suspense>
        <p className="text-white/40 font-roboto text-lg">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: "var(--bg-base)" }}>
      <Suspense fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}>
        <NavBar />
      </Suspense>

      {/* ── Hero backdrop ── */}
      <Suspense fallback={<div className="w-full h-[40vw] max-h-[520px] bg-white/5" />}>
        <DC.BackdropHero backdrop_path={detils.backdrop_path} title={detils.title} />
      </Suspense>

      {/* ── Main content card ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-10">
        {/* Poster + info row — poster overlaps the backdrop */}
        <div className="flex flex-col sm:flex-row gap-5 lg:gap-10 -mt-20 sm:-mt-32 lg:-mt-44 relative z-10">

          {/* Poster */}
          <div className="flex-shrink-0 self-start mx-auto sm:mx-0">
            <Suspense fallback={<div className="w-36 sm:w-48 lg:w-60 aspect-[2/3] rounded-2xl bg-white/10" />}>
              <DC.PosterCard
                poster_path={detils.poster_path}
                movie_id={detils.id.toString()}
                title={detils.title}
              />
            </Suspense>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-4 pt-2 sm:pt-8 lg:pt-12 min-w-0">
            {/* Title + year */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-roboto text-white leading-tight">
                {detils.title}
              </h1>
              <p className="text-white/40 font-roboto text-sm mt-1">
                {detils.release_date?.slice(0, 4)}
                {detils.runtime ? ` · ${Math.floor(detils.runtime / 60)}h ${detils.runtime % 60}m` : ""}
                {detils.status ? ` · ${detils.status}` : ""}
              </p>
              {detils.tagline && (
                <p className="text-white/35 font-roboto text-sm italic mt-1">&ldquo;{detils.tagline}&rdquo;</p>
              )}
            </div>

            {/* Genres */}
            <Suspense fallback={null}>
              <DC.GenreList genres={detils.genres} />
            </Suspense>

            {/* Rating */}
            <Suspense fallback={null}>
              <DC.RatingBadge vote_average={detils.vote_average} vote_count={detils.vote_count} />
            </Suspense>

            {/* Watchlist button */}
            <Suspense fallback={null}>
              <DC.WatchlistButton movie_id={detils.id.toString()} />
            </Suspense>

            {/* Overview — shown inline on desktop */}
            <div className="hidden sm:block">
              <p className="text-white/45 font-roboto text-sm font-semibold uppercase tracking-widest mb-2">Overview</p>
              <p className="text-white/75 font-roboto text-base leading-relaxed">
                {detils.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Overview — shown below on mobile */}
        <div className="sm:hidden mt-6">
          <Suspense fallback={null}>
            <DC.OverviewSection overview={detils.overview} />
          </Suspense>
        </div>

        {/* Videos — heaviest section (iframes), loaded last */}
        <Suspense fallback={null}>
          <DC.VideosSection videos={videos} />
        </Suspense>
      </div>

      <div className="h-16" />
    </div>
  );
};

export default MovieDetils;
