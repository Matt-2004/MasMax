// Simple in-memory request cache — deduplicate identical URLs within the same session
const _cache = new Map<string, Promise<any>>();

export const fetchFromTMDB = async (url: URL) => {
  const key = url.toString();
  if (_cache.has(key)) return _cache.get(key)!;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWE1YWI2MjRiZDAxMjhiZGJiMzdjZDNhMmYzNmFhOCIsInN1YiI6IjY1OGFhOThlMzI1YTUxNTc3ZTAzMmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bi_2IPf0bZph00Qj5URE-wIk-9bjrm3mMuDSRVg3K58",
    },
  };

  const promise = fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      _cache.delete(key); // don't cache failures
      console.error("Error while fetching", err);
    });

  _cache.set(key, promise);
  return promise;
};

export const fetchMovieGenres = async () => {
  const url = new URL(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
  );
  const response = await fetchFromTMDB(url);
  return response.genres;
};

export const fetchUpComingMoive = async () => {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchNowPlaying = async () => {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchPopularMovie = async (page?: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${
      page || 1
    }`,
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchTopRatedMovie = async (page?: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${
      page || 1
    }`,
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
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
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

export const fetchVideo = async (movie_id: string) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
  );
  const respones = await fetchFromTMDB(url);
  return respones.results;
};

export const fetchTrendMovie = async (timeLine?: string) => {
  const url = new URL(
    `https://api.themoviedb.org/3/trending/movie/${
      timeLine || "day"
    }?language=en-US`,
  );
  // If the index.html inline script already fired the same request, reuse it
  // to avoid a duplicate network call. Seed lazily so module-parse timing
  // doesn't matter (the inline script always runs before any React code).
  const key = url.toString();
  const earlyPromise = (globalThis as any).__heroPromise as
    | Promise<any[]>
    | undefined;
  if (earlyPromise && !_cache.has(key)) {
    _cache.set(
      key,
      earlyPromise.then((results) => ({ results })),
    );
  }
  const respones = await fetchFromTMDB(url);
  return respones.results;
};

// ── TV Series ────────────────────────────────────────────────────────────────

export const fetchPopularTV = async (page?: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page || 1}`,
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchTopRatedTV = async (page?: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page || 1}`,
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchTrendingTV = async (timeLine?: string) => {
  const url = new URL(
    `https://api.themoviedb.org/3/trending/tv/${timeLine || "day"}?language=en-US`,
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchOnAirTV = async (page?: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page || 1}`,
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};

export const fetchTVGenres = async () => {
  const url = new URL("https://api.themoviedb.org/3/genre/tv/list?language=en");
  const response = await fetchFromTMDB(url);
  return response.genres;
};

export const fetchTVDetails = async (id: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=aggregate_credits`,
  );
  const response = await fetchFromTMDB(url);
  return response;
};

export const fetchTVVideos = async (id: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
  );
  const response = await fetchFromTMDB(url);
  return response.results;
};
