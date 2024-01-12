import { PropsMovies } from "../../Utils/FetchAPI";
import getImagePath from "../../Utils/GetImagePath";
import { useLocalStorage } from "../../Utils/useLocalStorage";

const MobileCard = ({ pm, movieTabTitle }: PropsMovies) => {
  // pm = propsMovie
  const { setItem } = useLocalStorage("id");

  return (
    <div className='h-[100%] w-[100%]'>
      <div className='flex justify-between items-center ml-3 mr-3'>
        <h1 className='xl:text-2xl md:text-xl z-40 text-[#2eade7] mt-4 mb-2 font-bold'>
          {movieTabTitle}
        </h1>
      </div>
      <div className='w-[100%]'>
        <div className='flex overflow-x-scroll no-scrollbar overflow-y-hidden gap-6 mx-2 pt-4'>
          {pm.slice(0, 10).map((prop) => (
            <div
              onClick={() => setItem(prop.id.toString())}
              className='relative flex-shrink-0 cursor-pointer transfrom hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg'
            >
              <div className='absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-[#1A1C29]/80 z-10' />
              <img
                alt={prop.original_title}
                src={getImagePath(prop.backdrop_path)}
                className='max-sm:w-72 sm:w-80 md:w-96 h-fit object-cover rounded-xl object-center'
              />
              <span className=' w-64 whitespace-nowrap overflow-hidden overflow-ellipsis absolute bottom-3 left-3 text-lg text-white z-20'>
                {prop.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
