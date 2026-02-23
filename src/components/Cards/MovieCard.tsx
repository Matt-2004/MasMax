import ImageUI, { ImageUIContainer } from "@/components/Cards/ImageUI";
import { CardGridSkeleton } from "@/components/Skeletons";
import { useTheme } from "@/Utils/ThemeContext";
import { useEffect, useState } from "react";

const movieType = [
  { label: "Popular", id: 1 },
  { label: "Top rated", id: 2 },
];

const MovieCard = () => {
  const [display, setDisplay] = useState<any[]>([]);
  const [select, setSelect] = useState("Popular");
  const [loading, setLoading] = useState(true);
  useTheme(); // subscribe so CSS vars re-render on theme change

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const { fetchPopularMovie, fetchTopRatedMovie } = await import("@/Utils/FetchAPI");
        const res = select.toLowerCase() === "popular"
          ? await fetchPopularMovie(1)
          : await fetchTopRatedMovie(1);
        if (!cancelled) setDisplay(res ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [select]);

  return (
    <ImageUIContainer>
      {/* Header row — always visible so filter buttons don't disappear during load */}
      <div className='flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <div className='w-1 h-7 sm:h-8 rounded-full flex-shrink-0' style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent-dark))" }} />
          <div className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>Movies</div>
        </div>
        <div className='flex gap-2 flex-wrap'>
          {movieType.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelect(type.label)}
              disabled={loading}
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
      {/* Grid or skeleton */}
      {loading ? <CardGridSkeleton count={8} /> : <ImageUI data={display} />}
    </ImageUIContainer>
  );
};

export default MovieCard;
