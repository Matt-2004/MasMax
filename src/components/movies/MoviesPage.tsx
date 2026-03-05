/**
 * MoviesPage — /movies
 *
 * Features:
 *  • Filter panel: sort-by, genre (multi-select), release year range, min rating
 *  • Infinite scroll via useInfiniteQuery — fetches next page when sentinel enters viewport
 *  • @tanstack/react-virtual row virtualizer — only the visible card rows are in the DOM
 *  • All filters are URL search-params so links are shareable / back-navigable
 */

import { fetchDiscoverMoviesPage, fetchMovieGenres } from "@/lib/FetchAPI";
import {
  getImagePath,
  getPosterSrcSet,
  getTinyPosterPath,
} from "@/lib/GetImagePath";
import { MovieResult } from "@/lib/Interfaces";
import { PlusIcon, StarIcon } from "@/lib/icons/icons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const NavBar = lazy(() => import("../layout/NavBar"));
const Footer = lazy(() => import("../layout/Footer"));

// ── Constants ──────────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popularity.desc" },
  { label: "Top Rated", value: "vote_average.desc" },
  { label: "Newest First", value: "primary_release_date.desc" },
  { label: "Oldest First", value: "primary_release_date.asc" },
  { label: "Revenue", value: "revenue.desc" },
  { label: "A–Z", value: "original_title.asc" },
];

const RATING_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "6+", value: 6 },
  { label: "7+", value: 7 },
  { label: "7.5+", value: 7.5 },
  { label: "8+", value: 8 },
  { label: "9+", value: 9 },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from(
  { length: CURRENT_YEAR - 1899 },
  (_, i) => CURRENT_YEAR - i,
);

// Responsive columns: how many cards per row at each Tailwind breakpoint.
// We measure container width at runtime and pick the column count.
function useColumns(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [cols, setCols] = useState(0); // 0 = not yet measured, prevents stale-column flash
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w < 360) setCols(2);
      else if (w < 560) setCols(3);
      else if (w < 800) setCols(4);
      else if (w < 1100) setCols(5);
      else setCols(6);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);
  return cols;
}

// ── Single movie card ──────────────────────────────────────────────────────────

const MovieCardItem = memo(function MovieCardItem({
  movie,
}: {
  movie: MovieResult;
}) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    localStorage.setItem("id", movie.id.toString());
    navigate(`/movie/${movie.id}`);
  }, [movie.id, navigate]);

  const title = movie.original_title || movie.title || "Unknown";

  return (
    <div
      className="group flex flex-col rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-[var(--accent)]/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Poster */}
      <div
        className="relative w-full aspect-[2/3] overflow-hidden flex-shrink-0"
        onClick={handleNavigate}
      >
        <img
          src={getImagePath(185, movie.poster_path)}
          srcSet={getPosterSrcSet(movie.poster_path)}
          sizes="(max-width: 479px) 45vw, (max-width: 639px) 30vw, (max-width: 899px) 22vw, (max-width: 1199px) 18vw, 15vw"
          alt={title}
          loading="lazy"
          decoding="async"
          style={{
            backgroundImage: `url(${getTinyPosterPath(movie.poster_path)})`,
            backgroundSize: "cover",
          }}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/60 border border-white/20 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "var(--accent)";
            b.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(0,0,0,0.6)";
            b.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          title="Add to watchlist"
        >
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white">
            <PlusIcon />
          </span>
        </button>
        {/* Year badge */}
        {movie.release_date && (
          <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold font-roboto px-1.5 py-0.5 rounded-md text-white/80 bg-black/60 backdrop-blur-sm">
            {movie.release_date.slice(0, 4)}
          </span>
        )}
      </div>

      {/* Info */}
      <section
        className="flex flex-col justify-between flex-1 px-2 sm:px-3 pt-2 pb-3"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-surface-2), var(--bg-surface))",
        }}
        onClick={handleNavigate}
      >
        <p className="font-semibold text-white text-xs sm:text-sm leading-snug line-clamp-2 mb-2 font-roboto">
          {title}
        </p>
        <div className="flex items-center justify-between gap-1 mt-auto">
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="text-yellow-400 text-xs sm:text-sm font-semibold font-roboto">
              {Math.round(movie.vote_average * 10) / 10}
            </span>
            <span className="text-white/30 text-xs hidden sm:inline font-roboto">
              /10
            </span>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold font-roboto transition-colors duration-150 px-2 py-1 rounded-md"
            style={{ color: "var(--accent-light)" }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.color = "#fff";
              b.style.background =
                "color-mix(in srgb, var(--accent) 15%, transparent)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.color = "var(--accent-light)";
              b.style.background = "transparent";
            }}
          >
            <span className="w-3 h-3 fill-current">
              <PlusIcon />
            </span>
            <span className="hidden sm:inline">Watchlist</span>
          </button>
        </div>
      </section>
    </div>
  );
});

// ── Filter sidebar ─────────────────────────────────────────────────────────────

interface FilterState {
  sortBy: string;
  genreIds: number[];
  yearFrom: number | undefined;
  yearTo: number | undefined;
  minRating: number;
}

interface FilterPanelProps {
  filters: FilterState;
  genres: { id: number; name: string }[];
  onChange: (f: FilterState) => void;
  onReset: () => void;
  open: boolean;
  onClose: () => void;
}

function FilterPanel({
  filters,
  genres,
  onChange,
  onReset,
  open,
  onClose,
}: FilterPanelProps) {
  const f = filters;

  function toggleGenre(id: number) {
    const next = f.genreIds.includes(id)
      ? f.genreIds.filter((g) => g !== id)
      : [...f.genreIds, id];
    onChange({ ...f, genreIds: next });
  }

  const panelContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3.5 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="font-roboto font-bold text-white text-base">
          Filters
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="font-roboto text-xs text-white/40 hover:text-white/80 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
          >
            Reset all
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Close filters"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Sort by */}
        <div>
          <p className="font-roboto text-xs font-semibold uppercase tracking-widest text-white/40 mb-2.5">
            Sort by
          </p>
          <div className="space-y-1">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...f, sortBy: opt.value })}
                className="w-full text-left px-3 py-2 rounded-lg font-roboto text-sm transition-all duration-150"
                style={{
                  color:
                    f.sortBy === opt.value ? "#fff" : "rgba(255,255,255,0.5)",
                  background:
                    f.sortBy === opt.value
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                      : "transparent",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Min rating */}
        <div>
          <p className="font-roboto text-xs font-semibold uppercase tracking-widest text-white/40 mb-2.5">
            Min Rating
          </p>
          <div className="flex flex-wrap gap-1.5">
            {RATING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...f, minRating: opt.value })}
                className="px-3 py-1 rounded-full font-roboto text-xs font-semibold transition-all duration-150"
                style={
                  f.minRating === opt.value
                    ? {
                        background: "var(--accent)",
                        color: "#fff",
                      }
                    : {
                        background: "var(--bg-surface-2)",
                        color: "rgba(255,255,255,0.5)",
                      }
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Release year */}
        <div>
          <p className="font-roboto text-xs font-semibold uppercase tracking-widest text-white/40 mb-2.5">
            Release Year
          </p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={f.yearFrom ?? ""}
                onChange={(e) =>
                  onChange({
                    ...f,
                    yearFrom: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="w-full appearance-none px-2 py-1.5 pr-6 rounded-lg font-roboto text-xs text-white border outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-surface-2)",
                  color: "var(--text-muted)",
                }}
              >
                <option
                  value=""
                  style={{ background: "var(--bg-surface-2)", color: "#fff" }}
                >
                  From
                </option>
                {YEAR_OPTIONS.map((y) => (
                  <option
                    key={y}
                    value={y}
                    style={{ background: "var(--bg-surface-2)", color: "#fff" }}
                  >
                    {y}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 fill-current text-white/30"
                viewBox="0 0 320 512"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301 192 288 192H32c-12.9 0-24.6 7.8-29.6 19.8S-.3 237.3 8.9 246.6l128 128z" />
              </svg>
            </div>
            <span className="text-white/25 text-xs font-roboto flex-shrink-0">
              –
            </span>
            <div className="relative flex-1">
              <select
                value={f.yearTo ?? ""}
                onChange={(e) =>
                  onChange({
                    ...f,
                    yearTo: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full appearance-none px-2 py-1.5 pr-6 rounded-lg font-roboto text-xs text-white border outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-surface-2)",
                  color: "var(--text-muted)",
                }}
              >
                <option
                  value=""
                  style={{ background: "var(--bg-surface-2)", color: "#fff" }}
                >
                  To
                </option>
                {YEAR_OPTIONS.map((y) => (
                  <option
                    key={y}
                    value={y}
                    style={{ background: "var(--bg-surface-2)", color: "#fff" }}
                  >
                    {y}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 fill-current text-white/30"
                viewBox="0 0 320 512"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301 192 288 192H32c-12.9 0-24.6 7.8-29.6 19.8S-.3 237.3 8.9 246.6l128 128z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div>
          <p className="font-roboto text-xs font-semibold uppercase tracking-widest text-white/40 mb-2.5">
            Genres
          </p>
          <div className="flex flex-wrap gap-1.5">
            {genres.map((g) => {
              const active = f.genreIds.includes(g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => toggleGenre(g.id)}
                  className="px-3 py-1 rounded-full font-roboto text-xs font-semibold transition-all duration-150 border"
                  style={
                    active
                      ? {
                          background: "var(--accent)",
                          borderColor: "var(--accent)",
                          color: "#fff",
                        }
                      : {
                          background: "transparent",
                          borderColor:
                            "color-mix(in srgb, var(--accent) 25%, transparent)",
                          color: "var(--accent-light)",
                        }
                  }
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar (always visible ≥ lg) ── */}
      <aside
        className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 rounded-2xl overflow-hidden sticky top-20 max-h-[calc(100vh-6rem)]"
        style={{
          background: "var(--bg-surface)",
          boxShadow: "0 0 0 1px var(--border)",
        }}
      >
        {panelContent}
      </aside>

      {/* ── Mobile drawer ── */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <aside
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-[80vw] max-w-[320px] flex flex-col"
            style={{
              background: "var(--bg-surface)",
              boxShadow: "0 0 0 1px var(--border)",
            }}
          >
            {panelContent}
          </aside>
        </>
      )}
    </>
  );
}

// ── Active filter chips ────────────────────────────────────────────────────────

function ActiveFilters({
  filters,
  genres,
  onChange,
}: {
  filters: FilterState;
  genres: { id: number; name: string }[];
  onChange: (f: FilterState) => void;
}) {
  const chips: { label: string; remove: () => void }[] = [];

  const sortLabel = SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label;
  if (filters.sortBy !== "popularity.desc" && sortLabel) {
    chips.push({
      label: sortLabel,
      remove: () => onChange({ ...filters, sortBy: "popularity.desc" }),
    });
  }
  if (filters.minRating > 0) {
    chips.push({
      label: `${filters.minRating}+ ★`,
      remove: () => onChange({ ...filters, minRating: 0 }),
    });
  }
  if (filters.yearFrom) {
    chips.push({
      label: `From ${filters.yearFrom}`,
      remove: () => onChange({ ...filters, yearFrom: undefined }),
    });
  }
  if (filters.yearTo) {
    chips.push({
      label: `To ${filters.yearTo}`,
      remove: () => onChange({ ...filters, yearTo: undefined }),
    });
  }
  filters.genreIds.forEach((id) => {
    const name = genres.find((g) => g.id === id)?.name;
    if (name) {
      chips.push({
        label: name,
        remove: () =>
          onChange({
            ...filters,
            genreIds: filters.genreIds.filter((g) => g !== id),
          }),
      });
    }
  });

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-roboto text-xs font-semibold"
          style={{
            background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            color: "var(--accent-light)",
            border:
              "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
          }}
        >
          {chip.label}
          <button
            onClick={chip.remove}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label={`Remove ${chip.label} filter`}
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}

// ── Default filters ────────────────────────────────────────────────────────────

const DEFAULT_FILTERS: FilterState = {
  sortBy: "popularity.desc",
  genreIds: [],
  yearFrom: undefined,
  yearTo: undefined,
  minRating: 0,
};

// Encode/decode filters to/from URL search params
function filtersToParams(f: FilterState): Record<string, string> {
  const p: Record<string, string> = {};
  if (f.sortBy !== DEFAULT_FILTERS.sortBy) p.sort = f.sortBy;
  if (f.genreIds.length) p.genres = f.genreIds.join(",");
  if (f.yearFrom) p.from = String(f.yearFrom);
  if (f.yearTo) p.to = String(f.yearTo);
  if (f.minRating) p.rating = String(f.minRating);
  return p;
}

function paramsToFilters(sp: URLSearchParams): FilterState {
  return {
    sortBy: sp.get("sort") ?? DEFAULT_FILTERS.sortBy,
    genreIds: sp.get("genres") ? sp.get("genres")!.split(",").map(Number) : [],
    yearFrom: sp.get("from") ? Number(sp.get("from")) : undefined,
    yearTo: sp.get("to") ? Number(sp.get("to")) : undefined,
    minRating: sp.get("rating") ? Number(sp.get("rating")) : 0,
  };
}

// ── Virtualized grid ───────────────────────────────────────────────────────────

/**
 * Splits a flat array of movies into rows of `cols` items each.
 * The virtualizer works on rows (not individual items) so the DOM
 * only contains the visible rows at any given scroll position.
 */
function VirtualGrid({
  movies,
  cols,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
}: {
  movies: MovieResult[];
  cols: number;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  // Split flat list into rows
  const rows = useMemo(() => {
    const r: MovieResult[][] = [];
    for (let i = 0; i < movies.length; i += cols) {
      r.push(movies.slice(i, i + cols));
    }
    return r;
  }, [movies, cols]);

  // Row height: card = aspect-ratio 2/3 + info (~80px). We approximate based on container.
  // useVirtualizer will measure actual heights dynamically.
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => {
      if (!parentRef.current) return 360;
      const cardW = (parentRef.current.clientWidth - (cols - 1) * 12) / cols;
      return Math.round((cardW * 3) / 2) + 80; // poster height + info panel
    }, [cols]),
    overscan: 3, // render 3 extra rows above/below viewport for smooth scroll
  });

  // Sentinel: when the last row enters viewport, load more
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    // Outer scroll container — full height, no scrollbar
    <div
      ref={parentRef}
      className="w-full overflow-y-auto no-scrollbar"
      style={{ height: "100%", contain: "strict" }}
    >
      {/* Inner container sized to total virtual height */}
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualRows.map((virtualRow) => {
          const rowMovies = rows[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
                paddingBottom: "12px",
              }}
            >
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {rowMovies.map((movie) => (
                  <MovieCardItem key={movie.id} movie={movie} />
                ))}
                {/* Fill empty slots in last row so grid stays aligned */}
                {Array.from({ length: cols - rowMovies.length }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sentinel + spinner */}
      <div ref={sentinelRef} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <span
            className="w-8 h-8 rounded-full border-2 border-white/10 animate-spin"
            style={{ borderTopColor: "var(--accent)" }}
          />
        )}
        {!hasNextPage && movies.length > 0 && (
          <p className="text-white/25 font-roboto text-sm">
            You've reached the end · {movies.length.toLocaleString()} movies
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filters live in URL so they survive back/forward navigation
  const filters = useMemo(() => paramsToFilters(searchParams), [searchParams]);

  function setFilters(next: FilterState) {
    setSearchParams(filtersToParams(next), { replace: true });
  }

  function resetFilters() {
    setSearchParams({}, { replace: true });
  }

  // Genres list (cached)
  const { data: genres = [] } = useQuery<{ id: number; name: string }[]>({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 10,
  });

  // Infinite query — key includes all filter params so a filter change resets pages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["movies-discover", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchDiscoverMoviesPage({
        page: pageParam as number,
        sortBy: filters.sortBy,
        genreIds: filters.genreIds,
        yearFrom: filters.yearFrom,
        yearTo: filters.yearTo,
        minRating: filters.minRating || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < Math.min(lastPage.total_pages, 500)
        ? lastPage.page + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });

  // Flatten all pages into one array
  const movies = useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data],
  );
  const totalResults = data?.pages[0]?.total_results ?? 0;

  // Container ref for column measurement
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const cols = useColumns(gridContainerRef);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-base)" }}
    >
      <Suspense
        fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}
      >
        <NavBar />
      </Suspense>

      <div className="flex-1 max-w-[90rem] mx-auto w-full px-3 sm:px-5 lg:px-8 py-6">
        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-8 rounded-full flex-shrink-0"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), var(--accent-dark))",
              }}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-roboto">
                Movies
              </h1>
              {!isLoading && totalResults > 0 && (
                <p className="text-white/35 font-roboto text-xs mt-0.5">
                  {totalResults.toLocaleString()} results
                </p>
              )}
            </div>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl font-roboto text-sm font-semibold transition-all duration-200 active:scale-95"
            style={{
              background: "var(--bg-surface)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid var(--border)",
            }}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
              <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-48C253 51.7 224.8 32 192 32s-61 19.7-73.3 48L32 80C14.3 80 0 94.3 0 112s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 144c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 80z" />
            </svg>
            Filters
            {filters.genreIds.length ||
            filters.minRating ||
            filters.yearFrom ||
            filters.yearTo ||
            filters.sortBy !== "popularity.desc" ? (
              <span
                className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: "var(--accent)" }}
              >
                {[
                  filters.genreIds.length,
                  filters.minRating ? 1 : 0,
                  filters.yearFrom ? 1 : 0,
                  filters.yearTo ? 1 : 0,
                  filters.sortBy !== "popularity.desc" ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}
              </span>
            ) : null}
          </button>
        </div>

        {/* ── Body: sidebar + grid ── */}
        <div className="flex gap-5 xl:gap-6 items-start">
          <FilterPanel
            filters={filters}
            genres={genres}
            onChange={setFilters}
            onReset={resetFilters}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />

          {/* ── Right: active chips + grid ── */}
          <div
            ref={gridContainerRef}
            className="flex-1 min-w-0 flex flex-col"
            style={{ height: "calc(100vh - 10rem)" }}
          >
            <ActiveFilters
              filters={filters}
              genres={genres}
              onChange={setFilters}
            />

            {isError && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-white/40 font-roboto">
                  Failed to load movies. Try again.
                </p>
              </div>
            )}

            {isLoading && cols > 0 && (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: cols * 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-xl overflow-hidden"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div className="w-full aspect-[2/3] bg-white/5" />
                    <div className="px-3 py-3 space-y-2">
                      <div className="h-3 bg-white/8 rounded w-4/5" />
                      <div className="h-3 bg-white/5 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && !isError && movies.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
                <svg
                  className="w-12 h-12 text-white/15 fill-current"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
                <p className="text-white/35 font-roboto text-sm">
                  No movies match these filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="font-roboto text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  Reset Filters
                </button>
              </div>
            )}

            {!isLoading && movies.length > 0 && cols > 0 && (
              <div className="flex-1 min-h-0">
                <VirtualGrid
                  movies={movies}
                  cols={cols}
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={!!hasNextPage}
                  onLoadMore={fetchNextPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MoviesPage;
