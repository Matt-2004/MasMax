import { CardGridSkeleton } from "@/components/Skeletons";
import { PlusIcon, StarIcon } from "@/icons/icons";
import {
    fetchOnAirTV,
    fetchPopularTV,
    fetchTopRatedTV,
    fetchTrendingTV,
} from "@/Utils/FetchAPI";
import { getImagePath, getPosterSrcSet, getTinyPosterPath } from "@/Utils/GetImagePath";
import { TVResult } from "@/Utils/Interfaces";
import { useTheme } from "@/Utils/ThemeContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// NavBar and Footer are lazy — they don't affect the series grid render
const NavBar = lazy(() => import("../Home/NavBar"));
const Footer = lazy(() => import("../Home/Footer"));

// ── Constants ────────────────────────────────────────────────────────────────

const SERIES_TYPES = [
    { label: "Popular", id: 1 },
    { label: "Top Rated", id: 2 },
    { label: "Trending", id: 3 },
    { label: "On Air", id: 4 },
];

// ── Fetcher ──────────────────────────────────────────────────────────────────

async function fetchSeriesPage(tab: string, page: number): Promise<TVResult[]> {
    switch (tab) {
        case "Top Rated": return fetchTopRatedTV(page);
        case "Trending": return fetchTrendingTV("day");
        case "On Air": return fetchOnAirTV(page);
        default: return fetchPopularTV(page);
    }
}

// ── Card ─────────────────────────────────────────────────────────────────────

function SeriesCard({ item }: { item: TVResult }) {
    const navigate = useNavigate();
    const title = item.original_name || item.name || "Unknown";

    return (
        <div
            className="group flex flex-col rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-[var(--accent)]/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ background: "var(--bg-card)" }}
            onClick={() => { localStorage.setItem("id", item.id.toString()); navigate(`/series/${item.id}`); }}
        >
            <div className="relative w-full aspect-[2/3] overflow-hidden flex-shrink-0">
                <img
                    src={getImagePath(342, item.poster_path)}
                    srcSet={getPosterSrcSet(item.poster_path)}
                    sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, 18vw"
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    style={{ backgroundImage: `url(${getTinyPosterPath(item.poster_path)})`, backgroundSize: "cover" }}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/60 border border-white/20 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                    onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "var(--accent)"; b.style.borderColor = "var(--accent)"; }}
                    onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(0,0,0,0.6)"; b.style.borderColor = "rgba(255,255,255,0.2)"; }}
                    title="Add to watchlist"
                >
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white"><PlusIcon /></span>
                </button>
            </div>

            <section
                className="flex flex-col justify-between flex-1 px-2 sm:px-3 pt-2 pb-3"
                style={{ background: "linear-gradient(to bottom, var(--bg-surface-2), var(--bg-surface))" }}
            >
                <p className="font-semibold text-white text-xs sm:text-sm leading-snug line-clamp-2 mb-2 font-roboto">{title}</p>
                <div className="flex items-center justify-between gap-1 mt-auto">
                    <div className="flex items-center gap-1">
                        <StarIcon />
                        <span className="text-yellow-400 text-xs sm:text-sm font-semibold font-roboto">
                            {Math.round(item.vote_average * 10) / 10}
                        </span>
                        <span className="text-white/30 text-xs hidden sm:inline font-roboto">/10</span>
                    </div>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs font-semibold font-roboto transition-colors duration-150 px-2 py-1 rounded-md"
                        style={{ color: "var(--accent-light)" }}
                        onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = "#fff"; b.style.background = "color-mix(in srgb, var(--accent) 15%, transparent)"; }}
                        onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = "var(--accent-light)"; b.style.background = "transparent"; }}
                    >
                        <span className="w-3 h-3 fill-current"><PlusIcon /></span>
                        <span className="hidden sm:inline">Watchlist</span>
                    </button>
                </div>
            </section>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const SeriesPage = () => {
    const [select, setSelect] = useState("Popular");
    useTheme();

    const sentinelRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["series", select],
        queryFn: ({ pageParam }) => fetchSeriesPage(select, pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (select === "Trending") return undefined;
            if (!lastPage || lastPage.length < 20) return undefined;
            return allPages.length + 1;
        },
    });

    const allItems: TVResult[] = data?.pages.flat() ?? [];

    // Window-scroll sentinel — fires when user nears the bottom of the page
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: "600px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg-base)" }}>
            <Suspense fallback={<div style={{ height: 64, background: "var(--bg-nav)" }} />}>
                <NavBar />
            </Suspense>

            <div className="w-full mt-8 sm:mt-12 mb-8 sm:mb-10">
                <div className="max-w-[90rem] mx-auto px-3 sm:px-5 lg:px-8">

                    {/* ── Header ── */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div
                                className="w-1 h-7 sm:h-8 rounded-full flex-shrink-0"
                                style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent-dark))" }}
                            />
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-roboto">Series</h1>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {SERIES_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelect(type.label)}
                                    disabled={isLoading}
                                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold font-roboto transition-all duration-200 disabled:opacity-60 ${select === type.label
                                        ? "text-white"
                                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                                        }`}
                                    style={select === type.label ? { background: "var(--accent)" } : {}}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Initial skeleton ── */}
                    {isLoading && <CardGridSkeleton count={10} />}

                    {/* ── Responsive CSS grid — all loaded cards ── */}
                    {!isLoading && allItems.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4 w-full">
                            {allItems.map((item) => (
                                <SeriesCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}

                    {/* ── Fetch-next skeleton (appended below existing cards) ── */}
                    {isFetchingNextPage && (
                        <div className="mt-2.5 sm:mt-3 lg:mt-4">
                            <CardGridSkeleton count={5} />
                        </div>
                    )}

                    {/* ── Window-scroll sentinel ── */}
                    <div ref={sentinelRef} className="h-4" />

                    {/* ── End of list ── */}
                    {!hasNextPage && !isLoading && allItems.length > 0 && (
                        <p className="text-center text-white/30 text-sm font-roboto py-8">
                            You've reached the end ✦
                        </p>
                    )}

                </div>
            </div>

            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default SeriesPage;

