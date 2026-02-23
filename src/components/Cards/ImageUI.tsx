import { CardGridSkeleton } from "@/components/Skeletons";
import { PlusIcon, StarIcon } from "@/icons/icons";
import { getImagePath, getPosterSrcSet, getTinyPosterPath } from "@/Utils/GetImagePath";
import { MovieResult, TVResult } from "@/Utils/Interfaces";
import { useNavigate } from "react-router-dom";

// Re-export so sibling components can import from one place
export { CardGridSkeleton };

export type MediaItem = (MovieResult | TVResult) & { _mediaType?: "movie" | "tv" };

const ImageUI = ({ data, loading = false, mediaType = "movie" }: { data: MediaItem[]; loading?: boolean; mediaType?: "movie" | "tv" }) => {
  if (loading) return <CardGridSkeleton count={10} />;
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4 w-full mb-3'>
      {data.slice(0, 10).map((p) => (
        <MovieCardItem key={p.id} movie={p} mediaType={p._mediaType ?? mediaType} />
      ))}
    </div>
  );
};

function getDisplayTitle(item: MediaItem): string {
  if ("original_title" in item && item.original_title) return item.original_title;
  if ("original_name" in item && (item as TVResult).original_name) return (item as TVResult).original_name;
  if ("name" in item && (item as TVResult).name) return (item as TVResult).name;
  return "Unknown";
}

function MovieCardItem({ movie: p, mediaType }: { movie: MediaItem; mediaType: "movie" | "tv" }) {
  const navigate = useNavigate();

  function handleNavigate() {
    localStorage.setItem("id", p.id.toString());
    if (mediaType === "tv") {
      navigate(`/series/${p.id}`);
    } else {
      navigate(`/movie/${p.id}`);
    }
  }

  const title = getDisplayTitle(p);

  return (
    <div className='group flex flex-col rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-[var(--accent)]/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer' style={{ background: "var(--bg-card)" }}>
      {/* Poster — fixed 2:3 aspect ratio, always fills the slot */}
      <div
        className='relative w-full aspect-[2/3] overflow-hidden flex-shrink-0'
        onClick={handleNavigate}
      >
        <img
          src={getImagePath(342, p.poster_path)}
          srcSet={getPosterSrcSet(p.poster_path)}
          // Grid is 2 cols on mobile (~45vw), 3 on sm (~30vw), 4 on md (~22vw), 5 on lg (~18vw)
          sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, 18vw"
          alt={title}
          loading='lazy'
          decoding='async'
          // Blur-up: show tiny placeholder colour while real image loads
          style={{ backgroundImage: `url(${getTinyPosterPath(p.poster_path)})`, backgroundSize: "cover" }}
          className='w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
        />
        {/* Dark vignette on hover */}
        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
        {/* Watchlist badge — top-right */}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className='absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/60 border border-white/20 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.6)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
          title='Add to watchlist'
        >
          <span className='w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white'>
            <PlusIcon />
          </span>
        </button>
      </div>

      {/* Info panel — fixed layout, no height variance */}
      <section
        className='flex flex-col justify-between flex-1 px-2 sm:px-3 pt-2 pb-3'
        style={{ background: "linear-gradient(to bottom, var(--bg-surface-2), var(--bg-surface))" }}
        onClick={handleNavigate}
      >
        {/* Title */}
        <p className='font-semibold text-white text-xs sm:text-sm leading-snug line-clamp-2 mb-2 font-roboto'>
          {getDisplayTitle(p)}
        </p>
        {/* Rating + Watchlist row */}
        <div className='flex items-center justify-between gap-1 mt-auto'>
          <div className='flex items-center gap-1'>
            <StarIcon />
            <span className='text-yellow-400 text-xs sm:text-sm font-semibold font-roboto'>
              {Math.round(p.vote_average * 10) / 10}
            </span>
            <span className='text-white/30 text-xs hidden sm:inline font-roboto'>/10</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className='flex items-center gap-1 text-xs font-semibold font-roboto transition-colors duration-150 px-2 py-1 rounded-md'
            style={{ color: "var(--accent-light)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.background = "color-mix(in srgb, var(--accent) 15%, transparent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--accent-light)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <span className='w-3 h-3 fill-current'><PlusIcon /></span>
            <span className='hidden sm:inline'>Watchlist</span>
          </button>
        </div>
      </section>
    </div>
  );
}

interface IImage {
  path: string;
  movie_id: string;
}

export function Image({ path, movie_id }: IImage) {
  const navigate = useNavigate();
  return (
    <img
      src={getImagePath(500, path)}
      onClick={() => {
        localStorage.setItem("id", movie_id);
        navigate(`/movie/${movie_id}`);
      }}
      className='w-full h-full object-cover object-center cursor-pointer'
    />
  );
}

export function ImageUIContainer({ children }: any) {
  return (
    <div className='w-full mt-8 sm:mt-12 mb-8 sm:mb-10'>
      <div className='max-w-[90rem] mx-auto px-3 sm:px-5 lg:px-8 flex flex-col'>{children}</div>
    </div>
  );
}

export function ImageTitleContainer({ titleName }: { titleName: any }) {
  return (
    <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
      <div className='w-1 h-7 sm:h-8 rounded-full flex-shrink-0' style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent-dark))" }} />
      <div className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>
        {titleName}
      </div>
    </div>
  );
}

export default ImageUI;
