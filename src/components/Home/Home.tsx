import { useEffect, useState } from "react";
import Carousels from "../Carousel/Carousels";
import NavBar from "./NavBar";
import { MovieResult } from "@/Utils/Interfaces";
import { fetchUpComingMoive } from "@/Utils/FetchAPI";

const Home = () => {
  const [carouselData, setCarouselData] = useState<MovieResult[]>([]);

  useEffect(() => {
    const Fetching = async () => {
      const upcoming = await fetchUpComingMoive();
      setCarouselData(upcoming);
    };
    Fetching();
  }, []);

  return (
    <div className='bg-[#26262e] dark:bg-[#dff2fa] overflow-hidden'>
      <NavBar />
      <Carousels carouselData={carouselData} />
    </div>
  );
};

export default Home;
