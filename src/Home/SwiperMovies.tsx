import { useEffect, useState } from "react";
import axios from "axios";
import { MovieResult, fetchUpComingMoive } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";

const SwiperMovies = () => {
  const [upcoming, setUpComing] = useState([]);

  useEffect(() => {
    const upComingMovies = async () => {
      const movies = await fetchUpComingMoive();
      setUpComing(movies);
    };
    upComingMovies();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="flex w-[80%] snap-mandatory snap-start overflow-hidden overflow-scroll">
        <div className="flex ">
          {upcoming.map((data: MovieResult) => (
            <div className="w-[20rem] h-fit relative">
              <img
                src={getImagePath(data.poster_path)}
                className="rounded-md z-30 hover:z-10 hover:brightness-50"
                width={320}
                height={500}
              />
              <span className=" absolute w-[400px] top-[50%] left-2 z-20 pt-2 text-xl font-medium font-roboto text-white">
                {data.original_title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwiperMovies;
