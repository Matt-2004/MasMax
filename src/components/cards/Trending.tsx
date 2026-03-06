import ImageUI, { ImageTitleContainer, ImageUIContainer } from "@/components/cards/ImageUI";
import { SectionSkeleton } from "@/components/Skeletons";
import { fetchTrendMovie } from "@/lib/FetchAPI";
import { MovieResult } from "@/lib/Interfaces";
import { useEffect, useState } from "react";

interface TrendingProps {
  prefetchedData?: MovieResult[];
}

const Trending = ({ prefetchedData }: TrendingProps) => {
  const [trend, setTrend] = useState<MovieResult[]>(prefetchedData ?? []);
  const [loading, setLoading] = useState(!prefetchedData);

  useEffect(() => {
    // If data was already passed in from Home, skip the fetch entirely
    if (prefetchedData) {
      setTrend(prefetchedData);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchTrendMovie();
        if (!cancelled) setTrend(data ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [prefetchedData]);

  if (loading) return <SectionSkeleton count={8} />;

  return (
    <ImageUIContainer>
      <ImageTitleContainer titleName="Trending" />
      <ImageUI data={trend} />
    </ImageUIContainer>
  );
};

export default Trending;
