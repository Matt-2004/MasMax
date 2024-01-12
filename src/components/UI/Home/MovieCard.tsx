import { PropsMovies } from "@/components/Utils/FetchAPI";
import getImagePath from "@/components/Utils/GetImagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "@/components/Utils/useLocalStorage";

const MovieCard = ({ pm, movieTabTitle }: PropsMovies) => {
  const { setItem } = useLocalStorage("id");
  return (
    <div className='w-[100%] mt-16 flex justify-center'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='mb-8  font-bold text-lg text-[#2eade7]'>
            {movieTabTitle}
          </div>
          <div className=' text-md underline text-white'>
            see More
            <FontAwesomeIcon icon={faArrowRightLong} className='ml-1' />
          </div>
        </div>
        <div className='flex cursor-pointer lg:w-[1000px] md:w-[770px] sm:w-[640px] justify-between'>
          {pm.slice(0, 4).map((p) => (
            <div className='relative'>
              <div onClick={() => setItem(p.id.toString())}>
                <img
                  src={getImagePath(p.poster_path)}
                  alt={p.title}
                  className='brightness-75 lg:w-[230px] md:w-[180px] sm:w-[140px]'
                />
              </div>
              <div className='absolute top-[78%] left-[5%] text-white '>
                <div className='lg:text-[20px] md:text-[16px] sm:text-[12px] lg:w-[200px] md:w-[150px] sm:w-[110px] mb-[3px] whitespace-nowrap overflow-hidden overflow-ellipsis'>
                  {p.title}
                </div>
                <span className='lg:text-[18px] md:text-[14px] sm:text-[10px] border border-gray-600 bg-gray-600 px-2 py-1 rounded-md opacity-85'>
                  {p.vote_average}{" "}
                  <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
