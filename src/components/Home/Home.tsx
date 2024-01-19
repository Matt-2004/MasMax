import { useEffect, useState } from "react";
import {
  fetchUpComingMoive,
  fetchPopularMovie,
  fetchTopRatedMovie,
} from "../../Utils/FetchAPI";
import MovieCards from "../Cards/MovieCards";
import Footer from "./Footer";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const [upComing, setUpComing] = useState([]);
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);

  const queryClient = useQueryClient()

  useEffect(() => {
    const fetching = async () => {
      const upcoming = await fetchUpComingMoive();
      const popu = await fetchPopularMovie();
      const rate = await fetchTopRatedMovie();
      setPopular(upcoming);
      setUpComing(popu);
      setRated(rate);
    };
    fetching();
  }, []);

  return (
    <div className='bg-[#26262e] '>
      <MovieCards upComing={upComing} popular={popular} rated={rated} />
      <Footer />
    </div>
  );
};

export default Home;
