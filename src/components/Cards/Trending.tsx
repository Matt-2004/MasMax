import ImageUI, { ImageTitleContainer, ImageUIContainer } from "@/components/Cards/ImageUI";
import { SectionSkeleton } from "@/components/Skeletons";
import { useEffect, useState } from "react";

const Trending = () => {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { fetchTrendMovie } = await import("@/Utils/FetchAPI");
        const trending = await fetchTrendMovie();
        if (!cancelled) setTrend(trending ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <SectionSkeleton count={8} />;

  return (
    <ImageUIContainer>
      <ImageTitleContainer titleName="Trending" />
      <ImageUI data={trend} />
    </ImageUIContainer>
  );
};

export default Trending;
