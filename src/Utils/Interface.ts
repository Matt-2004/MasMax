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
