import { getImagePath } from "@/Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";
import { useNavigate } from "react-router-dom";

const ImageUI = ({ display }: any) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-wrap gap-4 cursor-pointer mb-3 lg:w-[62.5rem] md:w-[48.12rem] sm:w-[40rem] max-sm:w-[20rem] justify-between max-sm:justify-evenly'>
      {display.slice(0, 8).map((p: MovieResult) => (
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
              className='rounded-md mb-2  transition-all duration-200 lg:w-[14.37rem] md:w-[11.25rem] sm:w-[8.75rem] max-sm:w-[9.3rem]'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageUI;
