import { SectionSkeleton } from "@/components/Skeletons";
import { fetchTrendMovie } from "@/Utils/FetchAPI";
import { MovieResult } from "@/Utils/Interfaces";
import { lazy, Suspense, useEffect, useState } from "react";
import HeroSection from "./HeroSection";

// ── Lazy chunks ────────────────────────────────────────────────────────────
// NavBar: 556 lines + ThemeToggle + autocomplete — split so it doesn't block hero paint
const NavBar = lazy(() => import("./NavBar"));
// GenreRail: below-fold genre pill strip
const GenreRail = lazy(() => import("./GenreRail"));
// Footer: entirely below the fold
const Footer = lazy(() => import("./Footer"));
// Content sections: only needed after hero is visible
const Trending = lazy(() => import("../Cards/Trending"));
const MovieCard = lazy(() => import("../Cards/MovieCard"));

// Grab the early-fired promise from index.html's inline <script>.
// By the time Home mounts, the fetch is already in-flight (or done).
declare global { interface Window { __heroPromise?: Promise<MovieResult[]> } }

const Home = () => {
  const [heroMovies, setHeroMovies] = useState<MovieResult[]>([]);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    // Use the early fetch kicked off in index.html if available, otherwise fall back.
    // Do NOT guard with a ref — StrictMode double-invokes effects and a ref guard
    // would cause the second run to skip, leaving heroLoading=true forever.
    const dataPromise: Promise<MovieResult[]> =
      window.__heroPromise ?? fetchTrendMovie();

    let cancelled = false;
    dataPromise
      .then((results) => {
        if (!cancelled) setHeroMovies(results ?? []);
      })
      .catch(() => {
        // fetch failed — fall back to real fetch
        if (!cancelled) {
          fetchTrendMovie()
            .then((r) => { if (!cancelled) setHeroMovies(r ?? []); })
            .catch(() => { });
        }
      })
      .finally(() => {
        // Always clear loading regardless of cancel — the component is still
        // mounted at this point because cancel only fires on unmount.
        if (!cancelled) setHeroLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg-base)" }}>
      {/* NavBar is lazy — placeholder keeps layout stable while chunk loads */}
      <Suspense fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}>
        <NavBar />
      </Suspense>

      {/* Hero — full bleed */}
      <HeroSection movies={heroMovies} loading={heroLoading} />

      {/* Genre rail — lazy, minimal fallback height to avoid layout shift */}
      <div className="h-px" style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 25%, transparent), transparent)" }} />
      <Suspense fallback={<div style={{ height: 80 }} />}>
        <GenreRail />
      </Suspense>

      {/* Below-fold — lazy loaded */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-3 sm:mx-5 lg:mx-8" />
      <Suspense fallback={<SectionSkeleton count={8} />}>
        {/* Pass the already-fetched trending data so Trending never re-fetches */}
        <Trending prefetchedData={heroLoading ? undefined : heroMovies} />
      </Suspense>
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-3 sm:mx-5 lg:mx-8" />
      <Suspense fallback={<SectionSkeleton count={8} />}>
        <MovieCard />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
