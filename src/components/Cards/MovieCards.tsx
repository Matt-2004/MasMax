import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MobileCard from "./MobileCard";
import Carousels from "../Carousel/Carousels";

const MovieCards = () => {
  const [upComingSizeChange, setUpComingSizeChange] = useState(false);
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const { fetchPopularMovie, fetchTopRatedMovie } = await import(
        "@/Utils/FetchAPI"
      );
      const popu = await fetchPopularMovie();
      const rate = await fetchTopRatedMovie();
      setPopular(popu);
      setRated(rate);
    };
    fetching();
  }, []);

  function handleUpComingSize() {
    if (window.innerWidth <= 640) {
      setUpComingSizeChange(true);
    } else {
      setUpComingSizeChange(false);
    }
  }

  useEffect(() => {
    handleUpComingSize();
    window.addEventListener("resize", handleUpComingSize);
  }, [window.innerWidth]);

  return (
    <div>
      {upComingSizeChange ? (
        <>
          <MobileCard pm={popular} movieTabTitle='Popular' />
          <MobileCard pm={rated} movieTabTitle='Top Rated' />
        </>
      ) : (
        <>
          <Carousels />
          <MovieCard pm={popular} movieTabTitle='Popular' />
          <MovieCard pm={rated} movieTabTitle='Top Rated' />
        </>
      )}
    </div>
  );
};

export default MovieCards;
