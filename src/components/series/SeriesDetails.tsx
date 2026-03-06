import { fetchTVDetails, fetchTVVideos } from "@/lib/FetchAPI";
import {
  getBackdropSrcSet,
  getImagePath,
  getLargeImagePath,
  getPosterSrcSet,
  BACKDROP_SIZES,
} from "@/lib/GetImagePath";
import getVideoPath from "@/lib/GetVideoPath";
import { TVDetilsResult } from "@/lib/Interfaces";
import { StarIcon } from "@/lib/icons/icons";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NavBar = lazy(() => import("../layout/NavBar"));
const Footer = lazy(() => import("../layout/Footer"));

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SeriesDetilsSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Suspense
        fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}
      >
        <NavBar />
      </Suspense>
      <div className="animate-pulse">
        <div className="w-full h-[45vw] max-h-[520px] bg-white/5" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 -mt-28 sm:-mt-36 relative z-10">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-36 sm:w-48 lg:w-60 flex-shrink-0 aspect-[2/3] rounded-2xl bg-white/10 self-start mx-auto sm:mx-0" />
            <div className="flex-1 space-y-4 pt-2 sm:pt-10">
              <div className="h-8 bg-white/10 rounded-lg w-3/4" />
              <div className="h-4 bg-white/8 rounded w-1/2" />
              <div className="flex gap-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-7 w-20 bg-white/8 rounded-full" />
                ))}
              </div>
              <div className="h-20 bg-white/5 rounded-xl mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Genre pills ───────────────────────────────────────────────────────────────
function GenrePills({ genres }: { genres: { id: number; name: string }[] }) {
  const navigate = useNavigate();
  if (!genres?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() =>
            navigate(`/genres/${g.id}`, { state: { searchValue: g.name } })
          }
          className="px-3 py-1 text-xs font-semibold font-roboto rounded-full cursor-pointer transition-all duration-150 active:scale-95"
          style={{
            color: "var(--accent-light)",
            border:
              "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            background: "color-mix(in srgb, var(--accent) 8%, transparent)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "color-mix(in srgb, var(--accent) 20%, transparent)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "color-mix(in srgb, var(--accent) 60%, transparent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "color-mix(in srgb, var(--accent) 8%, transparent)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "color-mix(in srgb, var(--accent) 30%, transparent)";
          }}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}

// ── Rating ring ───────────────────────────────────────────────────────────────
function RatingRing({
  vote_average,
  vote_count,
}: {
  vote_average: number;
  vote_count?: number;
}) {
  const score = Math.round(vote_average * 10) / 10;
  const pct = (vote_average / 10) * 100;
  const color = pct >= 70 ? "#22c55e" : pct >= 45 ? "#eab308" : "#ef4444";

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
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
            stroke={color}
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

// ── Seasons grid ──────────────────────────────────────────────────────────────
function SeasonsGrid({ seasons }: { seasons: TVDetilsResult["seasons"] }) {
  const visible = seasons.filter((s) => s.season_number > 0);
  if (!visible.length) return null;

  return (
    <section className="mt-10 sm:mt-14">
      <h2 className="text-xl font-bold font-roboto text-white mb-5">
        Seasons
        <span className="text-white/55 font-normal text-base ml-2">
          ({visible.length})
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {visible.map((s) => (
          <div
            key={s.id}
            className="flex flex-col rounded-xl overflow-hidden ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-1 hover:ring-[var(--accent)]/50"
            style={{ background: "var(--bg-card)" }}
          >
            {/* Poster */}
            <div className="relative w-full aspect-[2/3] overflow-hidden flex-shrink-0 bg-white/5">
              {s.poster_path ? (
                <img
                  src={getImagePath(185, s.poster_path)}
                  srcSet={getPosterSrcSet(s.poster_path)}
                  sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, 18vw"
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/40 text-4xl font-bold font-roboto">
                    {s.season_number}
                  </span>
                </div>
              )}
              {/* Episode count badge */}
              <span
                className="absolute bottom-1.5 right-1.5 text-[10px] font-bold font-roboto px-1.5 py-0.5 rounded-md text-white"
                style={{
                  background: "color-mix(in srgb, var(--accent) 80%, black)",
                }}
              >
                {s.episode_count} eps
              </span>
            </div>
            {/* Info */}
            <div className="px-2 pt-2 pb-3">
              <p className="text-white text-xs font-semibold font-roboto line-clamp-1">
                {s.name}
              </p>
              {s.air_date && (
                <p className="text-white/35 text-[10px] font-roboto mt-0.5">
                  {s.air_date.slice(0, 4)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Videos carousel ───────────────────────────────────────────────────────────
function VideosCarousel({ videos }: { videos: any[] }) {
  if (!videos?.length) return null;

  const sorted = [...videos].sort((a, b) => {
    const score = (v: any) =>
      v.type === "Trailer" && v.official ? 2 : v.type === "Trailer" ? 1 : 0;
    return score(b) - score(a);
  });

  return (
    <section className="mt-12">
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

// ── Cast row ──────────────────────────────────────────────────────────────────
function CastRow({ cast }: { cast: any[] }) {
  if (!cast?.length) return null;
  const top = cast.slice(0, 12);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold font-roboto text-white mb-5">
        Top Cast
      </h2>
      <div
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2"
        style={{ touchAction: "pan-x" }}
      >
        {top.map((person: any) => (
          <div
            key={person.id}
            className="flex-shrink-0 w-24 sm:w-28 text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto ring-2 ring-white/10 bg-white/5">
              {person.profile_path ? (
                <img
                  src={getImagePath(185, person.profile_path)}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 text-2xl font-bold">
                  {person.name?.[0] ?? "?"}
                </div>
              )}
            </div>
            <p className="mt-2 text-white text-xs font-semibold font-roboto line-clamp-2 leading-snug">
              {person.name}
            </p>
            {person.roles?.[0]?.character && (
              <p className="text-white/60 text-[10px] font-roboto line-clamp-1 mt-0.5">
                {person.roles[0].character}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Info table ────────────────────────────────────────────────────────────────
function InfoTable({ show }: { show: TVDetilsResult }) {
  const rows: { label: string; value: string }[] = [
    { label: "Status", value: show.status },
    { label: "Type", value: show.type },
    { label: "First Aired", value: show.first_air_date?.slice(0, 10) ?? "—" },
    { label: "Last Aired", value: show.last_air_date?.slice(0, 10) ?? "—" },
    { label: "Episodes", value: String(show.number_of_episodes) },
    { label: "Seasons", value: String(show.number_of_seasons) },
    {
      label: "Network",
      value: show.networks?.map((n) => n.name).join(", ") || "—",
    },
    {
      label: "Created by",
      value: show.created_by?.map((c) => c.name).join(", ") || "—",
    },
  ].filter((r) => r.value && r.value !== "0" && r.value !== "undefined");

  return (
    <section className="mt-10 sm:mt-14">
      <h2 className="text-xl font-bold font-roboto text-white mb-4">Details</h2>
      <div
        className="rounded-2xl overflow-hidden ring-1 ring-white/8"
        style={{ background: "var(--bg-surface)" }}
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex gap-4 px-4 sm:px-6 py-3 text-sm font-roboto ${
              i < rows.length - 1 ? "border-b border-white/6" : ""
            }`}
          >
            <span className="text-white/65 w-28 flex-shrink-0">
              {row.label}
            </span>
            <span className="text-white/85">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const SeriesDetils = () => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const navigate = useNavigate();
  const id = Number(seriesId ?? localStorage.getItem("series_id") ?? "0");

  const [show, setShow] = useState<TVDetilsResult | null>(null);
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
    setShow(null);
    setVideos([]);
    localStorage.setItem("series_id", String(id));

    (async () => {
      try {
        const [details, vids] = await Promise.all([
          fetchTVDetails(id),
          fetchTVVideos(id),
        ]);
        if (controller.signal.aborted) return;
        setShow(details ?? null);
        setVideos(Array.isArray(vids) ? vids : []);
      } catch {
        // ignore aborted
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  if (loading) return <SeriesDetilsSkeleton />;

  if (!show) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-base)" }}
      >
        <Suspense fallback={null}>
          <NavBar />
        </Suspense>
        <p className="text-white/65 font-roboto text-lg">Series not found.</p>
      </div>
    );
  }

  const title = show.name || show.original_name;
  const cast: any[] = show.aggregate_credits?.cast ?? [];

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "var(--bg-base)" }}
    >
      <Suspense
        fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}
      >
        <NavBar />
      </Suspense>

      {/* ── Backdrop ── */}
      <div className="relative w-full h-[45vw] min-h-[200px] max-h-[540px] overflow-hidden">
        <img
          src={getLargeImagePath(show.backdrop_path)}
          srcSet={getBackdropSrcSet(show.backdrop_path)}
          sizes={BACKDROP_SIZES}
          alt={title}
          loading="eager"
          decoding="async"
          // @ts-ignore
          fetchpriority="high"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[color-mix(in_srgb,var(--bg-base)_55%,transparent)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,var(--bg-base)_40%,transparent)] to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-10">
        {/* Poster + info row — poster overlaps backdrop */}
        <div className="flex flex-col sm:flex-row gap-5 lg:gap-10 -mt-24 sm:-mt-36 lg:-mt-48 relative z-10">
          {/* Poster */}
          <div className="flex-shrink-0 self-start mx-auto sm:mx-0">
            <div
              className="group relative w-36 sm:w-48 lg:w-60 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 ring-2 ring-white/10"
              style={{ cursor: "default" }}
            >
              <img
                src={getImagePath(342, show.poster_path)}
                srcSet={getPosterSrcSet(show.poster_path)}
                sizes="(max-width: 639px) 144px, (max-width: 1023px) 192px, 240px"
                alt={title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-4 pt-2 sm:pt-10 lg:pt-14 min-w-0">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="self-start flex items-center gap-1.5 text-white/65 hover:text-white transition-colors text-xs font-roboto mb-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 320 512">
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              Back
            </button>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-roboto text-white leading-tight">
                {title}
              </h1>
              {show.original_name !== title && (
                <p className="text-white/35 font-roboto text-sm mt-0.5 italic">
                  {show.original_name}
                </p>
              )}
              <p className="text-white/65 font-roboto text-sm mt-1">
                {show.first_air_date?.slice(0, 4)}
                {show.number_of_seasons
                  ? ` · ${show.number_of_seasons} Season${show.number_of_seasons > 1 ? "s" : ""}`
                  : ""}
                {show.number_of_episodes
                  ? ` · ${show.number_of_episodes} Episodes`
                  : ""}
                {show.status ? ` · ${show.status}` : ""}
              </p>
              {show.tagline && (
                <p className="text-white/55 font-roboto text-sm italic mt-1">
                  &ldquo;{show.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Genres */}
            <GenrePills genres={show.genres} />

            {/* Rating */}
            <RatingRing
              vote_average={show.vote_average}
              vote_count={show.vote_count}
            />

            {/* Watchlist */}
            <button
              className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl font-roboto font-semibold text-sm text-white transition-all duration-200 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              }}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
              Add to Watchlist
            </button>

            {/* Overview — desktop inline */}
            <div className="hidden sm:block mt-1">
              <p className="text-white/65 font-roboto text-xs font-semibold uppercase tracking-widest mb-2">
                Overview
              </p>
              <p className="text-white/75 font-roboto text-base leading-relaxed">
                {show.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Overview — mobile */}
        {show.overview && (
          <div className="sm:hidden mt-6">
            <p className="text-white/45 font-roboto text-xs font-semibold uppercase tracking-widest mb-2">
              Overview
            </p>
            <p className="text-white/75 font-roboto text-sm leading-relaxed">
              {show.overview}
            </p>
          </div>
        )}

        {/* Cast */}
        <CastRow cast={cast} />

        {/* Seasons */}
        <SeasonsGrid seasons={show.seasons ?? []} />

        {/* Videos */}
        <VideosCarousel videos={videos} />

        {/* Info table */}
        <InfoTable show={show} />

        <div className="h-16" />
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default SeriesDetils;
