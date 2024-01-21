import { PropsMovies } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "@/Utils/useLocalStorage";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ pm, movieTabTitle }: PropsMovies) => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage("id");

  function naviAndSetItem() {
    navigate(`/seemore/page/${1}`);
    localStorage.setItem("title", movieTabTitle);
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
                  className='rounded-md hover:scale-110 transition-all duration-300 lg:w-[230px] md:w-[180px] sm:w-[140px]'
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
