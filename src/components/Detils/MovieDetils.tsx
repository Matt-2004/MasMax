import { fetchMovieDetils, fetchVideo } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import { DetilsResult } from "@/Utils/Interfaces";
import {
  BackDropPath,
  Genres,
  LanguageAndVoteContainer,
  OriginalLanguage,
  OverView,
  Poster_path,
  RightInfoContainer,
  Status,
  Title,
  Videos,
  VoteAverage,
} from "./DetilsComponents";

const MovieDetils = () => {
  const [detils, setDetils] = useState<DetilsResult>();
  const [videos, setVideos] = useState();

  useEffect(() => {
    const valueFromGetItem: any = localStorage.getItem("id");
    async function fetchDetils() {
      const response = await fetchMovieDetils(valueFromGetItem);
      if (response) {
        setDetils(response);
      } else {
        fetchDetils();
      }
    }

    async function fetchingVideo() {
      const response = await fetchVideo(valueFromGetItem);
      if (response) {
        setVideos(response);
      } else {
        fetchingVideo();
      }
    }
    fetchDetils();
    fetchingVideo();
  }, []);

  return (
    <>
      {detils ? (
        <div className='relative h-[100%] w-[100%] bg-[#26262e]'>
          <BackDropPath backdrop_path={detils.backdrop_path} />
          <div className='absolute top-[9%] left-[15%] sm:left-[10%] flex'>
            <section className='flex lg:w-[56.25rem] md:w-[37.5rem] sm:w-[31.25rem] max-sm:w-[25rem] justify-evenly '>
              <Poster_path poster_path={detils.poster_path} />
              <RightInfoContainer>
                <Title
                  title={detils.title}
                  release_date={detils.release_date}
                />
                <Genres genres={detils.genres} />
                <Status status={detils.status} />
                <OverView overview={detils.overview} />

                <LanguageAndVoteContainer>
                  <OriginalLanguage
                    original_language={detils.original_language}
                  />
                  <VoteAverage vote_average={detils.vote_average} />
                </LanguageAndVoteContainer>
              </RightInfoContainer>
            </section>
          </div>
          <Videos videos={videos} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MovieDetils;
