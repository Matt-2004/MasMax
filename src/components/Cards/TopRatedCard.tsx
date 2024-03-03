import { MovieResult } from "@/Utils/Interfaces";
import { getImagePath } from "@/Utils/GetImagePath";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieCard = () => {
  const navigate = useNavigate();
  const [rated, setRated] = useState([]);

  function naviAndSetItem() {
    navigate(`/seemore/page/${1}`);
  }

  useEffect(() => {
    const fetching = async () => {
      const { fetchTopRatedMovie } = await import("@/Utils/FetchAPI");
      const rate = await fetchTopRatedMovie();
      setRated(rate);
    };
    fetching();
  }, []);

  return (
    <div className='w-[100%] mt-16 max-sm:mt-1 flex justify-center'>
      <div className='flex flex-col'>
        <div className='flex justify-between mx-2'>
          <div className='mb-8  font-bold  md:text-2xl sm:text-xl max-sm:text-xl text-[#2eade7]'>
            Top Rated
          </div>
          <div
            className='cursor-pointer text-md underline text-white'
            onClick={() => naviAndSetItem()}
          >
            see more
            <span className='max-sm:text-md'>
              <div /> // arrowRightAlt
            </span>
          </div>
        </div>
        <div className='flex flex-wrap gap-4 cursor-pointer  lg:w-[62.5rem] md:w-[48.12rem] sm:w-[40rem] justify-between max-sm:justify-evenly'>
          {rated.slice(0, 4).map((p: MovieResult) => (
            <div key={p.id} className='relative'>
              <div
                onClick={() => {
                  localStorage.setItem("id", p.id.toString()),
                    navigate(`/movie/${p.id}`);
                }}
              >
                <img
                  src={getImagePath(300, p.poster_path)}
                  alt={p.title}
                  loading='lazy'
                  className='rounded-sm hover:scale-110 transition-all duration-300 lg:w-[14.37rem] md:w-[11.25rem] sm:w-[8.75rem] max-sm:w-[9.3rem]'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
