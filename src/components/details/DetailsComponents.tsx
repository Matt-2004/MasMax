import { StarIcon } from "@/lib/icons/icons";
import {
  getBackdropSrcSet,
  getImagePath,
  getLargeImagePath,
  getPosterSrcSet,
  BACKDROP_SIZES,
} from "@/lib/GetImagePath";
import getVideoPath from "@/lib/GetVideoPath";
import { useNavigate } from "react-router-dom";

/* ── Backdrop hero ─────────────────────────────────────────── */
interface BackdropHeroProps {
  backdrop_path: string;
  title: string;
}
export function BackdropHero({ backdrop_path, title }: BackdropHeroProps) {
  return (
    <div className="relative w-full h-[40vw] min-h-[180px] max-h-[520px] overflow-hidden">
      <img
        src={getLargeImagePath(backdrop_path)}
        srcSet={getBackdropSrcSet(backdrop_path)}
        sizes={BACKDROP_SIZES}
        alt={title}
        width="1280"
        height="720"
        loading="eager"
        decoding="async"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchpriority="high"
        className="w-full h-full object-cover object-center"
      />
      {/* multi-stop gradient: transparent top → heavy dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111115]/40 to-transparent" />
    </div>
  );
}

/* ── Poster card ───────────────────────────────────────────── */
interface PosterCardProps {
  poster_path: string;
  movie_id: string;
  title: string;
}
export function PosterCard({ poster_path, movie_id, title }: PosterCardProps) {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/movie/${movie_id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${movie_id}`)}
      aria-label={`View details for ${title}`}
      className="group relative w-36 sm:w-48 lg:w-60 aspect-[2/3] rounded-2xl overflow-hidden ring-2 ring-white/10 hover:ring-[#2eade7]/60 transition-all duration-300 cursor-pointer shadow-2xl shadow-black/60 flex-shrink-0"
    >
      <img
        src={getImagePath(185, poster_path)}
        srcSet={getPosterSrcSet(poster_path)}
        // w-36 = 144px, w-48 = 192px, w-60 = 240px
        sizes="(max-width: 639px) 144px, (max-width: 1023px) 192px, 240px"
        alt={title}
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#2eade7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="w-10 h-10 rounded-full bg-[#2eade7]/80 flex items-center justify-center">
          <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 384 512">
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ── Genre pills ───────────────────────────────────────────── */
export function GenreList({ genres }: { genres: any[] }) {
  const navigate = useNavigate();
  if (!Array.isArray(genres) || !genres.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre: any) => (
        <button
          key={genre.id ?? genre.name}
          onClick={() =>
            navigate(`/genres/${genre.id}`, {
              state: { searchValue: genre.name },
            })
          }
          aria-label={`Browse ${genre.name} genre`}
          className="px-3 py-1 text-xs font-semibold font-roboto text-[#60c8f5] border border-[#2eade7]/30 bg-[#2eade7]/8 rounded-full cursor-pointer transition-all duration-150 hover:bg-[#2eade7]/20 hover:border-[#2eade7]/60 active:scale-95"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

/* ── Rating badge ──────────────────────────────────────────── */
export function RatingBadge({
  vote_average,
  vote_count,
}: {
  vote_average: number;
  vote_count?: number;
}) {
  const score = Math.round(vote_average * 10) / 10;
  const pct = (vote_average / 10) * 100;

  return (
    <div
      className="flex items-center gap-3"
      aria-label={`Rating: ${score} out of 10`}
    >
      {/* Circular progress */}
      <div className="relative w-12 h-12 flex-shrink-0">
        <svg
          aria-hidden="true"
          className="w-full h-full -rotate-90"
          viewBox="0 0 40 40"
        >
          <circle
            cx="20"
            cy="20"
            r="16"
            strokeWidth="3.5"
            className="stroke-white/10 fill-none"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="fill-none"
            stroke={pct >= 70 ? "#22c55e" : pct >= 45 ? "#eab308" : "#ef4444"}
            strokeDasharray={`${(pct / 100) * 100.53} 100.53`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white font-roboto">
          {score}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <StarIcon />
          <span className="text-white font-semibold font-roboto text-lg">
            {score}
          </span>
          <span className="text-white/60 font-roboto text-sm">/10</span>
        </div>
        {vote_count !== undefined && (
          <p className="text-white/60 font-roboto text-xs mt-0.5">
            {vote_count.toLocaleString()} votes
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Watchlist button ──────────────────────────────────────── */
export function WatchlistButton({ movie_id }: { movie_id: string }) {
  return (
    <button
      onClick={() => console.log("watchlist", movie_id)}
      aria-label="Add to watchlist"
      className="self-start flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2eade7] to-[#1a8fc7] hover:from-[#3bbef5] hover:to-[#2eade7] rounded-xl font-roboto font-semibold text-sm text-white transition-all duration-200 active:scale-95"
    >
      <svg className="w-4 h-4 fill-white" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
      </svg>
      Add to Watchlist
    </button>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
export function OverviewSection({ overview }: { overview: string }) {
  return (
    <div>
      <p className="text-white/65 font-roboto text-sm font-semibold uppercase tracking-widest mb-2">
        Overview
      </p>
      <p className="text-white/75 font-roboto text-base leading-relaxed">
        {overview}
      </p>
    </div>
  );
}

/* ── Videos / trailers ─────────────────────────────────────── */
export function VideosSection({ videos }: { videos: any[] }) {
  if (!Array.isArray(videos) || !videos.length) return null;

  // Prioritise official trailers
  const sorted = [...videos].sort((a, b) => {
    const score = (v: any) =>
      v.type === "Trailer" && v.official ? 2 : v.type === "Trailer" ? 1 : 0;
    return score(b) - score(a);
  });

  return (
    <section aria-label="Trailers and videos" className="mt-12">
      <h2 className="text-xl font-bold font-roboto text-white mb-5">
        Trailers &amp; Videos
        <span className="text-white/55 font-normal text-base ml-2">
          ({sorted.length})
        </span>
      </h2>
      <div
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2"
        style={{ touchAction: "pan-x" }}
      >
        {sorted.map((video: any) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-[85vw] sm:w-[min(70vw,420px)] md:w-[min(55vw,480px)]"
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10">
              <iframe
                title={video.name}
                src={getVideoPath(video.key)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="mt-2 text-white/55 font-roboto text-xs truncate px-1">
              {video.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Legacy exports (keep other pages building) ──────────────── */
export const BackDropPath = BackdropHero;
export const Poster_path = PosterCard;
export const Genres = GenreList;
export const VoteAverage = RatingBadge;
export const OverView = OverviewSection;
export const Videos = VideosSection;
export {};
