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
        <div>
          <img src={getImagePath(detils.poster_path)} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MovieDetils;
