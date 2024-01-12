import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MovieResult, fetchSearchMovie } from "../../Utils/FetchAPI";
import getImagePath from "../../Utils/GetImagePath";
import { useLocalStorage } from "../../Utils/useLocalStorage";

const MoviePage = () => {
  const location = useLocation();
  const { setItem } = useLocalStorage("id");
  const [term, setTerm] = useState("");
  const [capTerm, setCapTerm] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const fullPathname = location.pathname;
    const pathnameSegments = fullPathname.split("/");
    // Get the last segment
    // Split the pathname into segments using "/"
    const lastPathSegment = pathnameSegments[pathnameSegments.length - 1];
    setTerm(decodeURI(lastPathSegment));
  }, [location]);

  function capitalizeFirstLetterEachWord(str: string) {
    return str.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  useEffect(() => {
    async function fetching() {
      const searchMovie = await fetchSearchMovie(term);
      setSearch(searchMovie);
    }
    fetching();
    const cap = capitalizeFirstLetterEachWord(term);
    setCapTerm(cap);
  }, [term]);

  return (
    <div className="bg-[#26262e]">
      <h1 className="text-3xl font-semibold ml-[10%] py-[2%] text-[#2eade7]">
        Result for {capTerm}
      </h1>
      <div className="">
        {search.map((searchs: MovieResult) => (
          <div
            onClick={() => setItem(searchs.id.toString())}
            className="pt-10  flex max-sm:flex-col sm:justify-center "
          >
            <div className="flex justify-center items-center">
              <img
                alt={searchs.original_title}
                src={getImagePath(searchs.backdrop_path)}
                className=" max-sm:w-[300px] sm:w-[450px] h-fit"
              />
            </div>
            <div className="pt-4 pl-5 sm:w-[400px]  flex flex-col overflow-hidden overflow-ellipsis">
              <h1 className="sm:text-2xl max-sm:text-xl text-white pb-4">
                {searchs.original_title}
              </h1>
              <span className="text-white max-sm:text-md">
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
