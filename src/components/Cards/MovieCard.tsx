import { useEffect, useState } from "react";
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined";
import ImageUI from "@/components/Cards/ImageUI";
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
        <div className='w-[100%] mt-16 max-sm:mt-1 flex justify-center'>
          <div className='flex flex-col'>
            <div className='flex justify-between mx-2'>
              <div className='mb-8 lg:text-3xl font-bold  md:text-2xl sm:text-xl max-sm:text-xl text-[#2eade7]'>
                Movies
              </div>
              <FilterUI
                FilterType={movieType}
                icon={<CaretDownOutlined />}
                select={select}
                setSelect={setSelect}
              />
            </div>
            <ImageUI display={display} />
          </div>
        </div>
      ) : (
        <div className='text-xl text-white'>Loading...</div>
      )}
    </>
  );
};

export default MovieCard;
