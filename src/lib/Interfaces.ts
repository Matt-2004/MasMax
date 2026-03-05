export type MovieResult = {
  adult: boolean;
  backdrop_path?: string | undefined;
  genre_ids: [number[]];
  id: string;
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

export type TVResult = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
};

export type TVDetilsResult = {
  adult: boolean;
  backdrop_path: string;
  created_by: { id: number; name: string; profile_path: string | null }[];
  episode_run_time: number[];
  first_air_date: string;
  last_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  networks: { id: number; name: string; logo_path: string | null }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  seasons: {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    episode_count: number;
    air_date: string | null;
    vote_average: number;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  aggregate_credits?: {
    cast: {
      id: number;
      name: string;
      profile_path: string | null;
      roles: { character: string; episode_count: number }[];
    }[];
  };
};

export type DetilsResult = {
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
