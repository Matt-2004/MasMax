const _cache = new Map<string, Promise<any>>();
const API_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim();

// ── localStorage stale-while-revalidate ──────────────────────────────────────
// For home-page endpoints: serve stale data instantly, refresh in background.
// TTL: 5 minutes. Falls back silently if localStorage is unavailable.
const LS_TTL = 5 * 60 * 1000;

function lsGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw) as { ts: number; data: T };
    if (Date.now() - ts < LS_TTL) return data;
    return null; // expired
  } catch {
    return null;
  }
}

function lsSet(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // quota exceeded or private browsing — ignore
  }
}

export const fetchFromTMDB = async (
  url: URL,
  highPriority = false,
  lsKey?: string,
) => {
  const key = url.toString();
  if (_cache.has(key)) return _cache.get(key)!;

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: "default",
  };
  if (highPriority) (options as any).priority = "high";

  // If a localStorage key is provided, seed the in-memory cache with stale
  // data immediately so callers get a result on the same microtask tick.
  if (lsKey) {
    const stale = lsGet<any>(lsKey);
    if (stale !== null) {
      // Return stale instantly; fire network in background to refresh
      const networkPromise = fetch(url, options)
        .then((res) => res.json())
        .then((fresh) => {
          lsSet(lsKey, fresh);
          _cache.set(key, Promise.resolve(fresh));
          return fresh;
        })
        .catch(() => stale);
      // Don't await — callers get stale, cache refreshes silently
      _cache.set(key, Promise.resolve(stale));
      // Kick off network refresh without blocking
      networkPromise.catch(() => {});
      return stale;
    }
  }

  const promise = fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (lsKey) lsSet(lsKey, data);
      return data;
    })
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
  const response = await fetchFromTMDB(url, false, "tmdb_upcoming");
  return response.results;
};

export const fetchNowPlaying = async () => {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  );
  const response = await fetchFromTMDB(url, false, "tmdb_now_playing");
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
  const lsKey = !page || page === 1 ? "tmdb_top_rated" : undefined;
  const response = await fetchFromTMDB(url, false, lsKey);
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
  const tl = timeLine || "day";
  const url = new URL(
    `https://api.themoviedb.org/3/trending/movie/${tl}?language=en-US`,
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
  // hero fetch gets high network priority; cache keyed by timeline
  const lsKey = `tmdb_trending_${tl}`;
  const respones = await fetchFromTMDB(url, !timeLine /* day = hero */, lsKey);
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
  const tl = timeLine || "day";
  const url = new URL(
    `https://api.themoviedb.org/3/trending/tv/${tl}?language=en-US`,
  );
  const lsKey = `tmdb_trending_tv_${tl}`;
  const response = await fetchFromTMDB(url, false, lsKey);
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

// ── Movies page — discover with filters ──────────────────────────────────────

export interface MovieDiscoverParams {
  page: number;
  sortBy?: string; // e.g. "popularity.desc"
  genreIds?: number[]; // TMDB genre ids
  yearFrom?: number;
  yearTo?: number;
  minRating?: number; // vote_average.gte
  minVotes?: number; // vote_count.gte — filter out obscure titles
}

export interface DiscoverPage {
  results: import("./Interfaces").MovieResult[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchDiscoverMoviesPage = async (
  params: MovieDiscoverParams,
): Promise<DiscoverPage> => {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("page", String(params.page));
  url.searchParams.set("sort_by", params.sortBy ?? "popularity.desc");
  if (params.genreIds?.length)
    url.searchParams.set("with_genres", params.genreIds.join(","));
  if (params.yearFrom)
    url.searchParams.set(
      "primary_release_date.gte",
      `${params.yearFrom}-01-01`,
    );
  if (params.yearTo)
    url.searchParams.set("primary_release_date.lte", `${params.yearTo}-12-31`);
  if (params.minRating)
    url.searchParams.set("vote_average.gte", String(params.minRating));
  url.searchParams.set("vote_count.gte", String(params.minVotes ?? 50));

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: "default",
  };
  const res = await fetch(url, options);
  return res.json();
};
