import { fetchSearchMovie } from "@/Utils/FetchAPI";
import { MovieResult } from "@/Utils/Interfaces";
import { SearchResultsSkeleton } from "@/components/Skeletons";
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImagePath } from "../../Utils/GetImagePath";

const NavBar = lazy(() => import("../Home/NavBar"));

export function capitalizeFirstLetterEachWord(str: string) {
  return str.replace(/\b\w/g, (m) => m.toUpperCase());
}

const MoviePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query: string = location.state?.searchValue ?? "";

  const [search, setSearch] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    (async () => {
      try {
        const res = await fetchSearchMovie(query);
        if (!cancelled) setSearch(res ?? []);
      } catch {
        if (!cancelled) setError("Failed to load results. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Suspense fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}>
        <NavBar />
      </Suspense>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-[#2eade7] to-[#1a8fc7] rounded-full" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-roboto">
            Results for{" "}
            <span className="text-[#2eade7]">"{capitalizeFirstLetterEachWord(query)}"</span>
          </h1>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-roboto text-sm mb-6">
            {error}
          </div>
        )}

        {/* Skeleton or results */}
        {loading ? (
          <SearchResultsSkeleton count={5} />
        ) : search.length === 0 ? (
          <p className="text-white/40 font-roboto text-base mt-12 text-center">
            No results found for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {search.map((item: MovieResult) => (
              <div
                key={item.id}
                onClick={() => {
                  localStorage.setItem("id", item.id.toString());
                  navigate(`/movie/${item.id}`);
                }}
                className="flex gap-3 sm:gap-5 items-start p-3 sm:p-4 rounded-xl bg-[#1a1a22] ring-1 ring-white/8 hover:ring-[#2eade7]/40 hover:bg-[#1e1e2a] transition-all duration-200 cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="w-24 sm:w-36 md:w-44 aspect-[16/10] rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                  <img
                    alt={item.original_title}
                    src={getImagePath(342, item.backdrop_path)}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col gap-1.5 pt-1">
                  <h2 className="text-white font-semibold font-roboto text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#60c8f5] transition-colors">
                    {item.original_title}
                  </h2>
                  <p className="text-white/35 font-roboto text-xs">
                    {item.release_date?.slice(0, 4)}
                    {item.vote_average ? ` · ★ ${Math.round(item.vote_average * 10) / 10}` : ""}
                  </p>
                  <p className="text-white/55 font-roboto text-xs sm:text-sm leading-relaxed line-clamp-3 mt-0.5">
                    {item.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
