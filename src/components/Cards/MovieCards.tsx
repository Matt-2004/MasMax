import { useEffect, useState } from "react";
import { Movies } from "../../Utils/FetchAPI";

import MovieCard from "./MovieCard";
import MobileCard from "./MobileCard";
import Carousels from "../Carousel/Carousels";

const MovieCards = ({ upComing, popular, rated }: Movies) => {
  const [upComingSizeChange, setUpComingSizeChange] = useState(false);

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
          <MobileCard pm={upComing} movieTabTitle='UpComing' />
          <MobileCard pm={popular} movieTabTitle='Popular' />
          <MobileCard pm={rated} movieTabTitle='Top Rated' />
        </>
      ) : (
        <>
          <Carousels pm={upComing} movieTabTitle='UpComing' />
          <MovieCard pm={popular} movieTabTitle='Popular' />
          <MovieCard pm={rated} movieTabTitle='Top Rated' />
        </>
      )}
    </div>
  );
};

export default MovieCards;
