import { useEffect, useState } from "react";
import ImageUI, { ImageUIContainer } from "@/components/Cards/ImageUI";
import { ImageTitleContainer } from "@/components/Cards/ImageUI";

const Trending = () => {
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const { fetchTrendMovie } = await import("@/Utils/FetchAPI");
      const trending = await fetchTrendMovie();
      setTrend(trending);
    };
    fetching();
  }, []);

  return (
    <>
      {trend ? (
        <ImageUIContainer>
          <ImageTitleContainer titleName={"Trending"} />
          <ImageUI data={trend} />
        </ImageUIContainer>
      ) : (
        <div className='text-xl text-white'>Loading...</div>
      )}
    </>
  );
};

export default Trending;
