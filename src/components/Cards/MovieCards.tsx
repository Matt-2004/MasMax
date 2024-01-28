import { useEffect, useState } from "react";
import { Movies } from "../../Utils/FetchAPI";
import { lazy, Suspense } from "react";

const MovieCard = lazy(() => import("./MovieCard"));
const MobileCard = lazy(() => import("./MobileCard"));
const SliderMovie = lazy(() => import("../Slide/SliderMovie"));

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
      <Suspense fallback={<div>Loading...</div>}>
        {upComingSizeChange ? (
          <>
            <MobileCard pm={upComing} movieTabTitle='UpComing' />
            <MobileCard pm={popular} movieTabTitle='Popular' />
            <MobileCard pm={rated} movieTabTitle='Top Rated' />
          </>
        ) : (
          <>
            <SliderMovie pm={upComing} movieTabTitle='UpComing' />
            <MovieCard pm={popular} movieTabTitle='Popular' />
            <MovieCard pm={rated} movieTabTitle='Top Rated' />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default MovieCards;
