import { PropsMovies } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faStar } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "@/Utils/useLocalStorage";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ pm, movieTabTitle }: PropsMovies) => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage("id");

  function naviAndSetItem() {
    navigate(`/seemore/page/${1}`);
    localStorage.setItem("title", movieTabTitle);
  }

  function roundNumber(number: number, decimal_digit: number) {
    let powerOften = Math.pow(10, decimal_digit);
    let result = Math.round(number * powerOften) / powerOften;
    return result;
  }

  return (
    <div className='w-[100%] mt-16 flex justify-center'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='mb-8  font-bold text-lg text-[#2eade7]'>
            {movieTabTitle}
          </div>
          <div
            className='cursor-pointer text-md underline text-white'
            onClick={() => naviAndSetItem()}
          >
            see more
            <FontAwesomeIcon icon={faArrowRightLong} className='ml-1' />
          </div>
        </div>
        <div className='flex cursor-pointer lg:w-[1000px] md:w-[770px] sm:w-[640px] justify-between'>
          {pm.slice(0, 4).map((p) => (
            <div key={p.id} className='relative'>
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
                <span className='lg:text-[17px] md:text-[14px] text-[#2eade7] sm:text-[10px] bg-[#26262e] px-2 py-[6px] rounded-md'>
                  {roundNumber(p.vote_average, 1)}{" "}
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
