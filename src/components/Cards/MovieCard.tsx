import { PropsMovies } from "@/Utils/Interfaces";
import { getImagePath } from "@/Utils/GetImagePath";

import { useNavigate } from "react-router-dom";

const MovieCard = ({ pm, movieTabTitle }: PropsMovies) => {
  const navigate = useNavigate();

  function naviAndSetItem() {
    navigate(`/seemore/page/${1}`);
    localStorage.setItem("title", movieTabTitle);
  }

  return (
    <div className="w-[100%] mt-16 flex justify-center">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="mb-8  font-bold  md:text-2xl sm:text-xl text-[#2eade7]">
            {movieTabTitle}
          </div>
          <div
            className="cursor-pointer text-md underline text-white"
            onClick={() => naviAndSetItem()}
          >
            see more
          </div>
        </div>
        <div className="flex cursor-pointer lg:w-[62.5rem] md:w-[48.12rem] sm:w-[40rem] justify-between">
          {pm.slice(0, 4).map((p) => (
            <div key={p.id} className="relative">
              <div
                onClick={() => {
                  localStorage.setItem("id", p.id.toString()),
                    navigate(`/movie/${p.id}`);
                }}
              >
                <img
                  src={getImagePath(p.poster_path)}
                  alt={p.title}
                  loading="lazy"
                  className="rounded-md hover:scale-110 transition-all duration-300 lg:w-[14.37rem] md:w-[11.25rem] sm:w-[8.75rem]"
                  width={230}
                  height={520}
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
