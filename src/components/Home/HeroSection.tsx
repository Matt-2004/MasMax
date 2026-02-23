import { PlayIcon, StarIcon } from "@/icons/icons";
import { getImagePath, getLargeImagePath } from "@/Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";
import { useTheme } from "@/Utils/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
    movies: MovieResult[];
    loading: boolean;
}

const HeroSection = ({ movies, loading }: HeroSectionProps) => {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const navigate = useNavigate();
    useTheme(); // subscribe to theme changes so CSS vars re-render

    const featured = movies.slice(0, 5);

    // Auto-cycle every 6s
    useEffect(() => {
        if (!featured.length) return;
        intervalRef.current = setInterval(() => advance(1), 6000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [featured.length, current]);

    function advance(dir: 1 | -1) {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent((c) => (c + dir + featured.length) % featured.length);
            setAnimating(false);
        }, 300);
    }

    function goTo(i: number) {
        if (i === current || animating) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setAnimating(true);
        setTimeout(() => { setCurrent(i); setAnimating(false); }, 300);
    }

    function handleWatchNow(movie: MovieResult) {
        localStorage.setItem("id", movie.id.toString());
        navigate(`/movie/${movie.id}`);
    }

    // ── Skeleton ──────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="relative w-full h-[55vw] min-h-[260px] max-h-[660px] bg-[#0e0e12] overflow-hidden">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/4 via-white/2 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/30 to-transparent" />
                <div className="absolute bottom-10 sm:bottom-14 left-4 sm:left-10 lg:left-16 flex flex-col gap-2 sm:gap-3 w-[min(85%,520px)]">
                    <div className="h-5 w-28 sm:w-36 rounded-full bg-white/8 animate-pulse" />
                    <div className="h-7 sm:h-10 w-full rounded-xl bg-white/8 animate-pulse" />
                    <div className="h-4 w-3/4 rounded-lg bg-white/6 animate-pulse" />
                    <div className="flex gap-2 sm:gap-3 mt-1">
                        <div className="h-8 sm:h-10 w-24 sm:w-32 rounded-xl bg-white/8 animate-pulse" />
                        <div className="h-8 sm:h-10 w-20 sm:w-28 rounded-xl bg-white/5 animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (!featured.length) return null;

    const movie = featured[current];

    return (
        <div className="relative w-full h-[55vw] min-h-[260px] max-h-[660px] overflow-hidden bg-[#0e0e12] select-none">
            {/* ── Backdrop images (crossfade) ─────────────────────── */}
            {featured.map((m, i) => (
                <img
                    key={m.id}
                    src={getLargeImagePath(m.backdrop_path)}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}

            {/* ── Gradient layers ─────────────────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/55 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111115]/80 via-[#111115]/20 to-transparent pointer-events-none" />

            {/* ── Content ─────────────────────────────────────────── */}
            <div
                className={`absolute bottom-10 sm:bottom-14 md:bottom-18 left-4 sm:left-10 lg:left-16 max-w-[min(88%,560px)] transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                    }`}
            >
                {/* Badge */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold font-roboto rounded-full text-white tracking-wide uppercase" style={{ background: "var(--accent)" }}>
                        Featured
                    </span>
                    <span className="hidden xs:flex items-center gap-1 text-yellow-400 text-xs font-semibold font-roboto">
                        <StarIcon />
                        {Math.round((movie.vote_average ?? 0) * 10) / 10}
                    </span>
                    {movie.release_date && (
                        <span className="text-white/40 text-xs font-roboto">
                            {movie.release_date.slice(0, 4)}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-white font-bold font-roboto text-lg sm:text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-xl mb-1.5 sm:mb-3 line-clamp-2">
                    {movie.original_title}
                </h1>

                {/* Overview — hidden on very small screens to save space */}
                <p className="hidden sm:block text-white/60 font-roboto text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-5 max-w-[480px]">
                    {movie.overview}
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                    <button
                        onClick={() => handleWatchNow(movie)}
                        className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-white font-semibold font-roboto text-xs sm:text-sm rounded-xl transition-all duration-200 active:scale-95"
                        style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}
                    >
                        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4"><PlayIcon /></span>
                        Watch Now
                    </button>
                    <button
                        onClick={() => handleWatchNow(movie)}
                        className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold font-roboto text-xs sm:text-sm rounded-xl backdrop-blur-sm border border-white/15 transition-all duration-200 active:scale-95"
                    >
                        More Info
                    </button>
                </div>
            </div>

            {/* ── Dot + thumbnail navigation ──────────────────────── */}
            <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-10 lg:left-16 flex items-center gap-1.5 sm:gap-2">
                {featured.map((m, i) => (
                    <button
                        key={m.id}
                        onClick={() => goTo(i)}
                        className={`transition-all duration-300 rounded-full flex-shrink-0 ${i === current
                            ? "w-6 h-2"
                            : "w-2 h-2 bg-white/30 hover:bg-white/60"
                            }`}
                        style={i === current ? { background: "var(--accent)" } : {}}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* ── Right: poster strip ─────────────────────────────── */}
            <div className="hidden lg:flex absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 flex-col gap-2.5">
                {featured.map((m, i) => (
                    <button
                        key={m.id}
                        onClick={() => goTo(i)}
                        className={`relative w-14 xl:w-16 aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300 ${i === current
                            ? "scale-105 opacity-100"
                            : "ring-1 ring-white/15 opacity-45 hover:opacity-75"
                            }`}
                        style={i === current ? { boxShadow: "0 0 0 2px var(--accent)" } : {}}
                    >
                        <img
                            src={getImagePath(92, m.poster_path)}
                            alt={m.original_title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* ── Prev / Next arrows ──────────────────────────────── */}
            <button
                onClick={() => advance(-1)}
                aria-label="Previous"
                className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/15 backdrop-blur-sm transition-all duration-200 text-white"
            >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </button>
            <button
                onClick={() => advance(1)}
                aria-label="Next"
                className="hidden sm:flex absolute right-4 lg:right-28 xl:right-32 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/15 backdrop-blur-sm transition-all duration-200 text-white"
            >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
            </button>
        </div>
    );
};

export default HeroSection;
