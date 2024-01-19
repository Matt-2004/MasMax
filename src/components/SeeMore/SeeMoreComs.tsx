import { Suspense, useEffect, useState } from "react";
import SeeMore from "./SeeMore";
import { fetchPopularMovie, fetchTopRatedMovie } from "@/Utils/FetchAPI";
import { useLastGetLocation } from "@/Utils/useLastGetLocation";

const SeeMoreComs = () => {
  const [isPopular, setIsPopular] = useState(false);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const lastPathSegement = useLastGetLocation();
  const title = localStorage.getItem("title");

  useEffect(() => {
    async function fetching() {
      if (title === "Popular") {
        const popu = await fetchPopularMovie(parseInt(lastPathSegement));
        setPopular(await popu);
        setIsPopular(true);
      } else {
        const topRate = await fetchTopRatedMovie(parseInt(lastPathSegement));
        setTopRated(await topRate);
        setIsPopular(false);
      }
    }
    fetching();
  }, [lastPathSegement]);

  return (
    <div className='w-[100%] bg-[#26262e] h-[10%] flex justify-center'>
      {/* If titleCheck value is popular, then show popular tag*/}
      <Suspense fallback={<span>Loading...</span>}>
        {isPopular ? (
          <SeeMore data={popular} title='Popular' />
        ) : (
          <SeeMore data={topRated} title='Top Rated' />
        )}
      </Suspense>
    </div>
  );
};

export default SeeMoreComs;
