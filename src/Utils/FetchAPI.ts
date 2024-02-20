export class MovieAPI {
  private async fetchFromTMDB(url: URL) {
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
  }

  public async MovieGenres() {
    const url = new URL(
      "https://api.themoviedb.org/3/genre/movie/list?language=en"
    );
    const response = await this.fetchFromTMDB(url);
    return response.genres;
  }

  public async UpComingMovie() {
    const url = new URL(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1c"
    );
    const response = await this.fetchFromTMDB(url);
    return response.results;
  }

  public async PopularMovie(page?: number) {
    const url = new URL(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${
        page || 1
      }`
    );
    const response = await this.fetchFromTMDB(url);
    return response.results;
  }

  public async TopRatedMovie(page?: number) {
    const url = new URL(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${
        page || 1
      }`
    );
    const response = await this.fetchFromTMDB(url);
    return response.results;
  }

  public async SearchMovie(term: string, page?: string) {
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.set("query", term);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", page || "1");
    const response = await this.fetchFromTMDB(url);
    return response.results;
  }

  public async MovieDetils(id: number) {
    const url = new URL(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    const response = await this.fetchFromTMDB(url);
    return response;
  }
}
