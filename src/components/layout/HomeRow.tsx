import {
  getImagePath,
  getPosterSrcSet,
  getTinyPosterPath,
} from "@/lib/GetImagePath";
import { MovieResult, TVResult } from "@/lib/Interfaces";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Shared types ──────────────────────────────────────────────────────────────

type RowItem = MovieResult | TVResult;

function isTV(item: RowItem): item is TVResult {
  return "name" in item && !("title" in item);
}

// ── Arrow button ──────────────────────────────────────────────────────────────

const Arrow = memo(function Arrow({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
      className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-all duration-200 active:scale-90"
      style={{
        background: "var(--bg-surface-2)",
        border: "1px solid var(--border)",
        color: "rgba(255,255,255,0.5)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        (e.currentTarget as HTMLButtonElement).style.background =
          "color-mix(in srgb, var(--accent) 20%, var(--bg-surface-2))";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color =
          "rgba(255,255,255,0.5)";
        (e.currentTarget as HTMLButtonElement).style.background =
          "var(--bg-surface-2)";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "var(--border)";
      }}
    >
      <svg
        className="w-3.5 h-3.5 fill-current"
        viewBox="0 0 320 512"
        style={{ transform: dir === "right" ? "rotate(180deg)" : undefined }}
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
      </svg>
    </button>
  );
});

// ── Single card ───────────────────────────────────────────────────────────────

const RowCard = memo(function RowCard({
  item,
  type,
  priority,
}: {
  item: RowItem;
  type: "movie" | "tv";
  priority?: boolean;
}) {
  const navigate = useNavigate();
  const title = isTV(item) ? item.name : item.title;
  const date = isTV(item) ? item.first_air_date : item.release_date;
  const year = date?.slice(0, 4) ?? "";

  const handleClick = useCallback(() => {
    if (type === "movie") {
      navigate(`/movie/${item.id}`);
    } else {
      navigate(`/series/${item.id}`);
    }
  }, [type, item.id, navigate]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      aria-label={`${title}${year ? ` (${year})` : ""}`}
      className="group flex-shrink-0 w-[120px] sm:w-[140px] md:w-[154px] cursor-pointer"
      style={{ contain: "layout style" }}
    >
      {/* Poster */}
      <div
        className="relative w-full aspect-[2/3] rounded-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
        style={{ boxShadow: "0 0 0 1px var(--border)" }}
      >
        <img
          src={getImagePath(154, item.poster_path)}
          srcSet={getPosterSrcSet(item.poster_path)}
          sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 154px"
          alt={title}
          width="154"
          height="231"
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          // @ts-ignore
          fetchpriority={priority ? "high" : "low"}
          style={{
            backgroundImage: `url(${getTinyPosterPath(item.poster_path)})`,
            backgroundSize: "cover",
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Rating badge — no backdrop-blur (creates a compositor layer per card) */}
        {item.vote_average > 0 && (
          <span
            className="absolute top-1.5 left-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold font-roboto text-white"
            style={{ background: "rgba(0,0,0,0.72)" }}
          >
            <svg
              aria-hidden="true"
              className="w-2.5 h-2.5 fill-yellow-400"
              viewBox="0 0 576 512"
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329l-24.6 145.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7l-143.7-21.2L316.9 18z" />
            </svg>
            {Math.round(item.vote_average * 10) / 10}
          </span>
        )}
      </div>
      {/* Title + year */}
      <div className="mt-2 px-0.5">
        <p className="font-roboto font-semibold text-xs sm:text-sm text-white leading-snug line-clamp-2">
          {title}
        </p>
        {year && (
          <p
            className="font-roboto text-[10px] sm:text-xs mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            {year}
          </p>
        )}
      </div>
    </div>
  );
});

// ── Skeleton card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[120px] sm:w-[140px] md:w-[154px]">
      <div
        className="w-full aspect-[2/3] rounded-xl animate-pulse"
        style={{ background: "var(--bg-surface-2)" }}
      />
      <div className="mt-2 space-y-1.5">
        <div
          className="h-3 rounded w-4/5 animate-pulse"
          style={{ background: "var(--bg-surface-2)" }}
        />
        <div
          className="h-3 rounded w-1/2 animate-pulse"
          style={{ background: "var(--bg-surface-2)" }}
        />
      </div>
    </div>
  );
}

// ── Row component (exported) ──────────────────────────────────────────────────

interface HomeRowProps {
  title: string;
  subtitle?: string;
  items: RowItem[];
  type: "movie" | "tv";
  loading?: boolean;
  viewAllHref?: string;
  /** How many cards to eagerly load (default 0 — only set to ~5 for the first above-fold row) */
  eagerCount?: number;
}

const HomeRow = ({
  title,
  subtitle,
  items,
  type,
  loading = false,
  viewAllHref,
  eagerCount = 0,
}: HomeRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  // Lazy-mount cards: skip rendering until the row enters the viewport.
  // First row (eagerCount > 0) is above the fold — mount immediately.
  const [visible, setVisible] = useState(eagerCount > 0);
  useEffect(() => {
    if (visible) return; // already mounted, no observer needed
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }, // start loading 200px before the row scrolls in
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -480 : 480, behavior: "smooth" });
  }

  const scrollLeft = useCallback(() => scroll("left"), []);
  const scrollRight = useCallback(() => scroll("right"), []);

  return (
    <section ref={sectionRef} aria-label={title} className="py-5 sm:py-7">
      <div className="max-w-[90rem] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-7 sm:h-8 rounded-full flex-shrink-0"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), var(--accent-dark))",
              }}
            />
            <div>
              <h2 className="font-roboto font-bold text-white text-base sm:text-lg leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p
                  className="font-roboto text-xs mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Arrow dir="left" onClick={scrollLeft} />
            <Arrow dir="right" onClick={scrollRight} />
            {viewAllHref && (
              <button
                onClick={() => navigate(viewAllHref)}
                className="hidden sm:flex items-center gap-1 font-roboto text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150"
                style={{ color: "var(--accent-light)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "color-mix(in srgb, var(--accent) 12%, transparent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                View all
                <svg
                  className="w-3 h-3 fill-current"
                  viewBox="0 0 320 512"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Cards — only mount once row enters viewport */}
          {!visible || loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item, idx) => (
                <div key={item.id} style={{ scrollSnapAlign: "start" }}>
                  <RowCard
                    item={item}
                    type={type}
                    priority={idx < eagerCount}
                  />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default HomeRow;
