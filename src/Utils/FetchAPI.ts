export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};

export type MovieResult = {
  adult: boolean;
  backdrop_path?: string | undefined;
  genre_ids: [number[]];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Movies = {
  upComing: MovieResult[];
  popular: MovieResult[];
  rated: MovieResult[];
  props?: MovieResult[];
};

export type PropsMovies = {
  pm: MovieResult[];
  movieTabTitle: string;
  upComingFinish?: boolean;
};

export const fetchFromTMDB = async (url: URL) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWE1YWI2MjRiZDAxMjhiZGJiMzdjZDNhMmYzNmFhOCIsInN1YiI6IjY1OGFhOThlMzI1YTUxNTc3ZTAzMmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bi_2IPf0bZph00Qj5URE-wIk-9bjrm3mMuDSRVg3K58",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = response.json();
    return data;
  } catch (err) {
    console.error("Error while fetching");
  }
};

export const fetchMovieGenres = async () => {
  const url = new URL(
    "https://api.themoviedb.org/3/genre/movie/list?language=en"
  );
  const response = await fetchFromTMDB(url);
  return response.genres;
};

export const fetchUpComingMoive = async () => {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1c"
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchPopularMovie = async (page?: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${
      page || 1
    }`
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchTopRatedMovie = async (page?: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${
      page || 1
    }`
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchSearchMovie = async (term: string, page?: string) => {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("query", term);
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", page || "1");
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchMovieDetils = async (id: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  );
  const response = await fetchFromTMDB(url);
  return response;
};

export const fetchDiscover = async (genre: string) => {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");
  url.searchParams.set("with_genres", genre);
  const respones = await fetchFromTMDB(url);
  return respones;
};
