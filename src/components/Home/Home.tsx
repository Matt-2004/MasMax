import { useEffect, useState } from "react";
import {
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchUpComingMoive,
} from "../../Utils/FetchAPI";
import MovieCards from "../Cards/MovieCards";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import NavBar from "./NavBar";

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [rated, setRated] = useState([]);

  const upComing = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => fetchUpComingMoive(),
  });

  useEffect(() => {
    const fetching = async () => {
      const popu = await fetchPopularMovie();
      const rate = await fetchTopRatedMovie();
      setPopular(popu);
      setRated(rate);
    };
    fetching();
  }, []);

  return (
    <div className="bg-[#26262e] ">
      <NavBar />
      <MovieCards upComing={upComing.data} popular={popular} rated={rated} />
      <Footer />
    </div>
  );
};

export default Home;
