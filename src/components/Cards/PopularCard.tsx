import { getImagePath } from "@/Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwapRightOutlined from "@ant-design/icons/SwapRightOutlined";

const MovieCard = () => {
  const navigate = useNavigate();
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const { fetchPopularMovie } = await import("@/Utils/FetchAPI");
      const popu = await fetchPopularMovie();
      setPopular(popu);
    };
    fetching();
  }, []);

  function naviAndSetItem() {
    navigate(`/seemore/page/${1}`);
  }

  return (
    <>
      {popular ? (
        <div className='w-[100%] mt-16 max-sm:mt-1 flex justify-center'>
          <div className='flex flex-col'>
            <div className='flex justify-between mx-2'>
              <div className='mb-8  font-bold  md:text-2xl sm:text-xl max-sm:text-xl text-[#2eade7]'>
                Popular
              </div>
              <div
                className='cursor-pointer text-md hover:underline text-white'
                onClick={() => naviAndSetItem()}
              >
                see more
                <span className='max-sm:text-md text-xl'>
                  <SwapRightOutlined />
                </span>
              </div>
            </div>
            <div className='flex flex-wrap gap-4 cursor-pointer mb-3 lg:w-[62.5rem] md:w-[48.12rem] sm:w-[40rem] justify-between max-sm:justify-evenly'>
              {popular.slice(0, 4).map((p: MovieResult) => (
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
      ) : (
        <div className='text-xl text-white'>Loading...</div>
      )}
    </>
  );
};

export default MovieCard;
