import { fetchMovieGenres } from "@/Utils/FetchAPI";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Genre {
    id: number;
    name: string;
}

const GenreRail = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const data = await fetchMovieGenres();
                if (!cancelled) setGenres(data ?? []);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    function handleGenreClick(genre: Genre) {
        navigate(`/genres/${genre.id}`, {
            state: { searchValue: genre.name },
        });
    }

    // Horizontal drag-scroll
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        let isDown = false, startX = 0, scrollLeft = 0;
        const onDown = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
        const onUp = () => { isDown = false; };
        const onMove = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
        el.addEventListener("mousedown", onDown);
        el.addEventListener("mouseup", onUp);
        el.addEventListener("mouseleave", onUp);
        el.addEventListener("mousemove", onMove);
        return () => { el.removeEventListener("mousedown", onDown); el.removeEventListener("mouseup", onUp); el.removeEventListener("mouseleave", onUp); el.removeEventListener("mousemove", onMove); };
    }, []);

    if (loading) {
        return (
            <div className="w-full py-5 sm:py-6">
                <div className="max-w-[90rem] mx-auto px-3 sm:px-5 lg:px-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4">
                        <div className="w-1 h-7 sm:h-8 bg-white/10 rounded-full flex-shrink-0 animate-pulse" />
                        <div className="h-6 sm:h-7 w-40 sm:w-52 rounded-lg bg-white/8 animate-pulse" />
                    </div>
                    <div className="flex gap-2 sm:gap-3 overflow-hidden">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="h-8 sm:h-9 w-20 sm:w-24 flex-shrink-0 rounded-full bg-white/8 animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!genres.length) return null;

    return (
        <div className="w-full py-5 sm:py-6">
            <div className="max-w-[90rem] mx-auto px-3 sm:px-5 lg:px-8">
                {/* Section label */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                    <div className="w-1 h-7 sm:h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent-dark))" }} />
                    <span className="text-xl sm:text-2xl font-bold text-white font-roboto">Browse by Genre</span>
                </div>

                {/* Scrollable pill row */}
                <div
                    ref={scrollRef}
                    className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-2"
                    style={{ touchAction: "pan-x" }}
                >
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => handleGenreClick(genre)}
                            className="flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/12 bg-white/5 hover:bg-[var(--accent)]/15 hover:border-[var(--accent)]/50 text-white/65 hover:text-[var(--accent-light)] font-roboto text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap active:scale-95"
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenreRail;
