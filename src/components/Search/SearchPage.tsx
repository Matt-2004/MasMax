import { useLocation } from "react-router-dom";
import { getImagePath } from "../../Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";
export function capitalizeFirstLetterEachWord(str: string) {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

const MoviePage = () => {
  const location = useLocation();

  return (
    <div className='bg-[#26262e]'>
      <h1 className='text-3xl font-semibold ml-[10%] py-[2%] text-[#2eade7]'>
        Result for {capitalizeFirstLetterEachWord(location.state.searchValue)}
      </h1>
      <div className=''>
        {location.state.search.map((searchs: MovieResult) => (
          <div
            onClick={() => localStorage.set("id", searchs.id.toString())}
            className='pt-10  flex max-sm:flex-col sm:justify-center '
          >
            <div className='flex justify-center items-center'>
              <img
                alt={searchs.original_title}
                src={getImagePath(400, searchs.backdrop_path)}
                className=' max-sm:w-[18.75rem] rounded-sm hover:translate-x-[-40px] transition-transform duration-300 sm:w-[28.1rem] h-fit'
              />
            </div>
            <div className='pt-4 pl-5 sm:w-[25rem]  flex flex-col overflow-hidden overflow-ellipsis'>
              <h1 className='sm:text-2xl max-sm:text-xl text-white pb-4'>
                {searchs.original_title}
              </h1>
              <span className='text-white max-sm:text-md h-[200px] overflow-scroll no-scrollbar'>
                {searchs.overview}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
