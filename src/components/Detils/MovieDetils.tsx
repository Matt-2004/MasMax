import { fetchMovieDetils, fetchVideo } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import { DetilsResult } from "@/Utils/Interfaces";
import "@/index.css";
import {
  BackDropPath,
  FavouriteAndWatchlistContainer,
  FavouriteBtn,
  Genres,
  LanguageAndVoteContainer,
  OverView,
  Poster_path,
  RightInfoContainer,
  Title,
  Videos,
  VoteAverage,
} from "./DetilsComponents";

const MovieDetils = () => {
  const [detils, setDetils] = useState<DetilsResult>();
  const [videos, setVideos] = useState();

  useEffect(() => {
    const Id: any = localStorage.getItem("id");
    async function fetchDetils() {
      const response = await fetchMovieDetils(Id);
      const res = await fetchVideo(Id);
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
        <div className='relative h-[100%] w-[100%] bg-[#26262e] dark:bg-[#dff2fa]'>
          <BackDropPath backdrop_path={detils.backdrop_path} />
          <div className='md:absolute  top-[9%] left-[15%] sm:left-[10%] flex'>
            <section className='flex lg:w-[56.25rem] md:w-[37.5rem] sm:w-[31.25rem] max-sm:w-[25rem] justify-evenly '>
              <div className=' sm:absolute max-sm:absolute sm:top-[3%] sm:left-[37%] max-sm:top-[1%]  '>
                <Poster_path
                  poster_path={detils.poster_path}
                  width={25}
                  movie_id={detils.id.toString()}
                />
              </div>
              <div className='max-sm:w-[20rem] md:w-[100%] sm:w-[27rem] sm:flex sm:justify-center sm:mt-3 max-sm:mt-4 max-sm:flex max-sm:justify-center'>
                <RightInfoContainer>
                  <Title
                    title={detils.title}
                    release_date={detils.release_date}
                  />
                  <Genres genres={detils.genres} />

                  <LanguageAndVoteContainer>
                    <VoteAverage vote_average={detils.vote_average} />
                  </LanguageAndVoteContainer>
                  <FavouriteAndWatchlistContainer>
                    <FavouriteBtn
                      hover_color='bg-[#5799ef]'
                      color='bg-[#2eade7]'
                      text='Add to WatchList'
                      width='0'
                    />
                  </FavouriteAndWatchlistContainer>
                </RightInfoContainer>
              </div>
            </section>
          </div>
          <OverView overview={detils.overview} />
          <Videos videos={videos} />
        </div>
      ) : (
        <div className='bg-[#26262e] dark:bg-[#dff2fa] min-h-screen cursor-wait'>
          <div className='progress '>
            <div className='runner'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetils;
