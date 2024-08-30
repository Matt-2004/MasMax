import { useEffect, useState } from "react";
import ImageUI, { ImageUIContainer } from "@/components/Cards/ImageUI";
import FilterUI from "./FilterUI";

const MovieCard = () => {
  // to store a data from fetch
  const [display, setDisplay] = useState([]);

  // to store a type of filter as Paramater
  const [select, setSelect] = useState("Popular");

  // types for filter
  const movieType = [
    {
      label: "Popular",
      id: 1,
    },
    {
      label: "Top rated",
      id: 2,
    },
  ];

  useEffect(() => {
    const fetching = async () => {
      const { fetchPopularMovie, fetchTopRatedMovie } = await import(
        "@/Utils/FetchAPI"
      );
      if (select.toLowerCase() === "popular") {
        const res = await fetchPopularMovie(1);
        setDisplay(res);
      } else {
        const res = await fetchTopRatedMovie(1);
        setDisplay(res);
      }
    };
    fetching();
  }, [select]);

  return (
    <>
      {display ? (
        <ImageUIContainer>
          <div className='flex justify-between mx-2'>
            <div className='mb-8 lg:text-3xl font-bold  md:text-2xl sm:text-xl max-sm:text-3xl text-[#2eade7]'>
              Movies
            </div>
          </div>
          <ImageUI data={display} />
        </ImageUIContainer>
      ) : (
        <div className='text-xl text-white'>Loading...</div>
      )}
    </>
  );
};

export default MovieCard;
