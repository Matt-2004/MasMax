import { useLocalStorage } from "../../Utils/useLocalStorage";
import { fetchMovieDetils } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import getImagePath from "../../Utils/GetImagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type DetilsResult = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: [] | null;
  budget: number;
  genres: [id: number, name: string];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const MovieDetils = () => {
  const [detils, setDetils] = useState<DetilsResult>();
  const { getItem } = useLocalStorage("id");

  useEffect(() => {
    async function fetchDetils() {
      const valueFromGetItem = await getItem();
      const response = await fetchMovieDetils(valueFromGetItem);
      setDetils(response);
    }
    fetchDetils();
  }, []);

  function roundNumber(number: number) {
    return Math.round(number * 10) / 10;
  }

  return (
    <>
      {detils ? (
        <div className='relative h-[100%] w-[100%] bg-[#26262e]'>
          <section className='relative'>
            <img
              src={getImagePath(detils.backdrop_path)}
              className='flex lg:h-[600px] w-[100%] object-cover object-top brightness-50'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/40 to-[#1A1C29]/80' />
          </section>
          <div className='absolute top-[9%] left-[15%] sm:left-[10%] flex'>
            <section className='flex lg:w-[900px] md:w-[600px] sm:w-[500px] max-sm:w-[400px] justify-evenly '>
              <img
                src={getImagePath(detils.poster_path)}
                className='rounded-md lg:h-[500px] sm:h-[300px] max-sm:h-[250px] md:h-[400px] '
              />
              <div className='pl-[20px]'>
                <span className='lg:text-4xl md:text-3xl sm:text-2xl font-semibold text-slate-200'>
                  {detils.title} ({detils.release_date.slice(0, 4)})
                </span>
                <div className='text-slate-300 mt-2  flex text-lg'>
                  {detils.genres.map((genre: any) => (
                    <div key={genre.key} className='hover:text-slate-400'>
                      {genre.name} ,
                    </div>
                  ))}
                </div>
                <div className='ml-1 text-xl font-bold mt-2 text-white'>
                  Status :{" "}
                  <span className='font-semibold'> {detils.status}</span>
                </div>
                <div className='text-3xl text-white overflow-hidden font-bold mt-3'>
                  Overview
                  <div className='text-white block h-[150px] overflow-scroll no-scrollbar font-thin leading-loose text-lg w-[600px]'>
                    {detils.overview}
                  </div>
                </div>
                <div className='flex gap-3'>
                  <div className='text-white py-1 text-center bg-gray-700 rounded-md opacity-85 w-10 '>
                    {detils.original_language.toUpperCase()}
                  </div>
                  <div className='text-white w-20 text-center py-1 bg-black rounded-md'>
                    <span className='text-md'>
                      {roundNumber(detils.vote_average)}
                    </span>
                    <FontAwesomeIcon
                      icon={faStar}
                      className='text-yellow-400 ml-1'
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MovieDetils;
