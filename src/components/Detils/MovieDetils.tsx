import { fetchMovieDetils, fetchVideo } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import { DetilsResult } from "@/Utils/Interfaces";
import "@/index.css";
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
      const res = await fetchVideo(valueFromGetItem);
      if (response && res) {
        setDetils(response);
        setVideos(res);
      } else {
        fetchDetils();
      }
    }
    fetchDetils();
  }, []);

  return (
    <>
      {detils ? (
        <div className='relative h-[100%] w-[100%] bg-[#26262e]'>
          <BackDropPath backdrop_path={detils.backdrop_path} />
          <div className='md:absolute  top-[9%] left-[15%] sm:left-[10%] flex'>
            <section className='flex lg:w-[56.25rem] md:w-[37.5rem] sm:w-[31.25rem] max-sm:w-[25rem] justify-evenly '>
              <Poster_path poster_path={detils.poster_path} />
              <div className='max-sm:w-[20rem] md:w-[100%] sm:w-[27rem] sm:flex sm:justify-center sm:mt-3 max-sm:mt-4 max-sm:flex max-sm:justify-center'>
                <RightInfoContainer>
                  <Title
                    title={detils.title}
                    release_date={detils.release_date}
                  />
                  <Genres genres={detils.genres} />
                  <Status status={detils.status} />
                  <OverView overview={detils.overview} />

                  <LanguageAndVoteContainer>
                    <OriginalLanguage />
                    <VoteAverage vote_average={detils.vote_average} />
                  </LanguageAndVoteContainer>
                </RightInfoContainer>
              </div>
            </section>
          </div>
          <Videos videos={videos} />
        </div>
      ) : (
        <div className='progress'>
          <div className='runner'></div>
        </div>
      )}
    </>
  );
};

export default MovieDetils;
