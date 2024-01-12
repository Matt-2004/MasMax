import { useEffect, useState } from "react";
import {
  fetchUpComingMoive,
  fetchPopularMovie,
  fetchTopRatedMovie,
} from "../../Utils/FetchAPI";
import MovieCards from "./MovieCards";
import Footer from "./Footer";

const Home = () => {
  const [upComing, setUpComing] = useState([]);
  const [upComingFinish, setUpComingFinish] = useState(false);
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);

  useEffect(() => {
    async function fetching() {
      const upcoming = await fetchUpComingMoive();
      setUpComingFinish(true);
      const popu = await fetchPopularMovie();
      const rate = await fetchTopRatedMovie();
      setPopular(upcoming);
      setUpComing(popu);
      setRated(rate);
    }

    fetching();
  }, []);

  return (
    <div className="bg-[#26262e] ">
      <MovieCards
        upComing={upComing}
        upComingFinish={upComingFinish}
        popular={popular}
        rated={rated}
      />
      <Footer />
    </div>
  );
};

export default Home;
