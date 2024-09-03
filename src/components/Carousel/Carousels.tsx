import { AngleRightIcon, PlayIcon, StarIcon } from "@/icons/icons";
import { getImagePath, getLargeImagePath } from "@/Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";

const Carousels = ({ carouselData }: { carouselData: MovieResult[] }) => {
  return (
    <section className='w-full h-full  overflow-x-scroll snap-x snap-mandatory bg-black'>
      <div className='flex w-full h-auto '>
        {carouselData.map((data, i) => (
          <div
            key={i}
            id={data.id}
            className='relative w-full inline-block snap-center flex-shrink-0'
          >
            <img
              loading='lazy'
              src={getLargeImagePath(data.backdrop_path)}
              className='w-full h-auto'
            />
            <div className='absolute inset-0 flex z-30  items-center justify-center'>
              <button className='rounded-full w-[3.3rem] flex justify-center p-4 items-center bg-opacity-50 border-2 hover:bg-[#2eade7]'>
                <PlayIcon />
              </button>
            </div>
            <div className='flex gap-2 absolute z-30 left-[3%] bottom-2'>
              <img
                alt={data.title}
                src={getImagePath(200, data.poster_path)}
                className='h-32'
              />
              <h2 className='text-white z-30 flex flex-col justify-end'>
                <span className='font-semibold  font-roboto '>
                  {data.original_title}
                </span>
                <div className='h-7 items-center flex  justify-start'>
                  <span className='font-roboto  text-sm inline-flex gap-1 z-30 text-gray-400 font-semibold'>
                    <StarIcon /> {data.vote_average}
                  </span>
                  <span className='text-sm font-roboto  text-gray-400 ml-1  '>
                    ({data.vote_count})
                  </span>
                </div>
              </h2>
            </div>
            <div className='w-full  inset-0 absolute bg-gradient-to-b from-black/10 to-black/70' />
          </div>
        ))}
      </div>
      <h1 className='text-white  items-center flex gap-2 z-30 absolute h-[2.5rem] shadow-white w-full bg-black  font-roboto text-lg pl-3 font-semibold'>
        Broswer trailers <AngleRightIcon />
      </h1>
    </section>
  );
};

export default Carousels;
