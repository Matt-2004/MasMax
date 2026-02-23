/* ─────────────────────────────────────────────────────────────
   Shared skeleton primitives
   Usage:  <CardGridSkeleton count={8} />
           <CarouselSkeleton />
           <SearchResultsSkeleton count={5} />
   ───────────────────────────────────────────────────────────── */

const pulse = "animate-pulse bg-white/8 rounded";

/* Single movie-card skeleton (poster 2:3 + 2-line info) */
export function MovieCardSkeleton() {
    return (
        <div className="flex flex-col rounded-xl overflow-hidden ring-1 ring-white/8 bg-[#1e1e26]">
            <div className={`w-full aspect-[2/3] ${pulse}`} />
            <div className="px-2 sm:px-3 pt-2 pb-3 bg-gradient-to-b from-[#252530] to-[#1a1a22] flex flex-col gap-2">
                <div className={`h-3.5 w-4/5 rounded ${pulse}`} />
                <div className={`h-3 w-3/5 rounded ${pulse}`} />
                <div className="flex justify-between mt-1">
                    <div className={`h-3 w-10 rounded ${pulse}`} />
                    <div className={`h-3 w-14 rounded ${pulse}`} />
                </div>
            </div>
        </div>
    );
}

/* Responsive card-grid skeleton — matches ImageUI breakpoints */
export function CardGridSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4 w-full mb-3">
            {Array.from({ length: count }).map((_, i) => (
                <MovieCardSkeleton key={i} />
            ))}
        </div>
    );
}

/* Section header skeleton (accent bar + title) */
export function SectionTitleSkeleton() {
    return (
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-1 h-8 bg-[#2eade7]/30 rounded-full flex-shrink-0" />
            <div className={`h-7 w-36 rounded-lg ${pulse}`} />
        </div>
    );
}

/* Full section skeleton (title + grid) */
export function SectionSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="w-full mt-8 sm:mt-12 mb-8 sm:mb-10">
            <div className="max-w-[90rem] mx-auto px-3 sm:px-5 lg:px-8 flex flex-col">
                <SectionTitleSkeleton />
                <CardGridSkeleton count={count} />
            </div>
        </div>
    );
}

/* Carousel hero skeleton */
export function CarouselSkeleton() {
    return (
        <div className="w-full h-[42vw] min-h-[180px] max-h-[480px] bg-[#1a1a22] animate-pulse relative overflow-hidden">
            {/* fake backdrop shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/3 to-white/5" />
            {/* fake bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-9 bg-[#1a1a22]/80" />
            {/* fake play button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/8" />
            </div>
            {/* fake info at bottom-left */}
            <div className="absolute bottom-14 left-6 flex items-end gap-3">
                <div className="w-20 h-28 rounded-lg bg-white/8" />
                <div className="flex flex-col gap-2 pb-1">
                    <div className="h-4 w-40 rounded bg-white/8" />
                    <div className="h-3 w-24 rounded bg-white/8" />
                </div>
            </div>
        </div>
    );
}

/* Single search/genre result row skeleton */
export function SearchResultSkeleton() {
    return (
        <div className="flex gap-4 sm:gap-6 items-start p-4 rounded-xl bg-[#1a1a22] ring-1 ring-white/8 animate-pulse">
            <div className="w-32 sm:w-44 aspect-[16/10] rounded-lg bg-white/8 flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-3 pt-1">
                <div className="h-5 w-3/4 rounded-lg bg-white/8" />
                <div className="h-3 w-full rounded bg-white/8" />
                <div className="h-3 w-5/6 rounded bg-white/8" />
                <div className="h-3 w-2/3 rounded bg-white/8" />
            </div>
        </div>
    );
}

export function SearchResultsSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, i) => (
                <SearchResultSkeleton key={i} />
            ))}
        </div>
    );
}
