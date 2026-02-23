import { AngleRightIcon, PlayIcon, StarIcon } from "@/icons/icons";
import { getImagePath, getLargeImagePath } from "@/Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";
import { useEffect, useState } from "react";

const Carousels = ({ carouselData }: { carouselData: MovieResult[] }) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className='w-full relative overflow-x-scroll snap-x snap-mandatory bg-black scrollbar-hide'>
      <div className='flex w-full'>
        {carouselData.map((data, i) => (
          <div
            key={i}
            id={data.id}
            className='relative w-full flex-shrink-0 snap-center group h-[42vw] min-h-[180px] max-h-[480px]'
          >
            <img
              loading='lazy'
              src={
                width < 450
                  ? getImagePath(400, data.backdrop_path)
                  : getLargeImagePath(data.backdrop_path)
              }
              className='w-full h-full object-cover object-center'
            />
            {/* Play button */}
            <div className='absolute inset-0 flex z-30 items-center justify-center'>
              <button className='rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex justify-center items-center bg-white/10 border-2 border-white/60 hover:bg-[#2eade7] hover:border-[#2eade7] backdrop-blur-sm transition-all duration-300 group-hover:scale-110'>
                <PlayIcon />
              </button>
            </div>
            {/* Bottom info */}
            <div className='flex gap-2 sm:gap-3 absolute z-30 left-[3%] sm:left-[4%] bottom-10 sm:bottom-11 items-end max-w-[85%]'>
              <img
                src={getImagePath(200, data.poster_path)}
                className='h-20 sm:h-28 md:h-32 lg:h-36 rounded-md sm:rounded-lg ring-1 sm:ring-2 ring-white/20 flex-shrink-0'
              />
              <h2 className='text-white z-30 flex flex-col justify-end pb-1 min-w-0'>
                <span className='font-semibold font-roboto text-sm sm:text-base md:text-lg leading-tight drop-shadow-lg line-clamp-2'>
                  {data.original_title}
                </span>
                <div className='items-center flex justify-start gap-1 mt-1 flex-wrap'>
                  <span className='font-roboto text-xs sm:text-sm inline-flex items-center gap-1 z-30 text-yellow-400 font-semibold'>
                    <StarIcon /> {data.vote_average}
                  </span>
                  <span className='text-xs sm:text-sm font-roboto text-white/50 hidden xs:inline'>
                    ({data.vote_count} votes)
                  </span>
                </div>
              </h2>
            </div>
            {/* Gradient overlay */}
            <div className='w-full inset-0 absolute bg-gradient-to-b from-black/5 via-transparent to-black/80' />
          </div>
        ))}
      </div>
      <div className='text-white items-center flex gap-2 z-30 absolute bottom-0 h-9 sm:h-10 w-full bg-gradient-to-r from-[#1a1a22]/90 to-[#2eade7]/10 font-roboto text-xs sm:text-sm px-3 sm:px-5 font-semibold cursor-pointer hover:from-[#2eade7]/20 transition-colors duration-300 backdrop-blur-sm'>
        <span className='opacity-70'>Browse trailers</span>
        <AngleRightIcon />
      </div>
    </section>
  );
};

export default Carousels;
