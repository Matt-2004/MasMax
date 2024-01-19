import { useLocalStorage } from "../../Utils/useLocalStorage";
import { fetchMovieDetils } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import getImagePath from "../../Utils/GetImagePath";

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

  return (
    <>
      {detils ? (
        <div className='relative h-[100%] w-[100%] bg-[#26262e]'>
          <section className='relative'>
            <img
              src={getImagePath(detils.backdrop_path)}
              className='flex lg:h-[700px] w-[100%] object-cover object-top'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/40 to-[#1A1C29]/80' />
          </section>
          <div className='absolute top-[50%] left-[15%] sm:left-[10%] flex'>
            <section className='flex lg:w-[900px] md:w-[600px] sm:w-[500px] max-sm:w-[400px] justify-evenly '>
              <img
                src={getImagePath(detils.poster_path)}
                className='rounded-md lg:h-[500px] sm:h-[300px] max-sm:h-[250px] md:h-[400px] '
              />
              <span className='lg:text-5xl md:text-3xl sm:text-2xl font-semibold text-slate-200'>
                {detils.title}
              </span>
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
