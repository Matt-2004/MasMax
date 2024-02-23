import getImagePath from "@/Utils/GetImagePath";
import getVideoPath from "@/Utils/GetVideoPath";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BackDropPath({ backdrop_path }: any) {
  return (
    <section className='relative'>
      <img
        src={getImagePath(backdrop_path)}
        className='flex lg:h-[37.5rem] w-[100%] object-cover object-top brightness-50'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/40 to-[#1A1C29]/80' />
    </section>
  );
}

export function RightInfoContainer({ children }: any) {
  return <div className='pl-[1.25rem]'>{children}</div>;
}

export function LanguageAndVoteContainer({ children }: any) {
  return <div className='flex gap-3'>{children}</div>;
}

export function Poster_path({ poster_path }: { poster_path: string }) {
  return (
    <img
      src={getImagePath(poster_path)}
      className='rounded-md md:static sm:absolute max-sm:absolute sm:top-[3%] sm:left-[37%] max-sm:top-[1%] max-sm:left-[34%] lg:h-[25rem] sm:h-[18rem] max-sm:h-[15.62rem] md:h-[20rem] '
    />
  );
}

export function Title({ title, release_date }: any) {
  return (
    <span className='lg:text-4xl md:text-3xl sm:text-2xl max-sm:text-2xl font-semibold text-slate-200'>
      {title} ({release_date.slice(0, 4)})
    </span>
  );
}

export function Genres({ genres }: any) {
  return (
    <div className='text-slate-300 mt-2  flex xl:text-lg md:text-md'>
      {genres.map((genre: any, index: any) => (
        <div key={genre.key} className='hover:text-slate-400'>
          {genre.name}
          {index !== genres.length - 1 ? " ," : " "}
        </div>
      ))}
    </div>
  );
}

export function Status({ status }: any) {
  return (
    <div className='ml-1 lg:text-xl md:text-lg lg:font-bold md:font-semibold mt-2 text-white'>
      Status : <span className='font-semibold'> {status}</span>
    </div>
  );
}

export function OverView({ overview }: any) {
  return (
    <div className='lg:text-3xl  sm:text-2xl max-sm:text-xl text-white overflow-hidden md:font-bold sm:font-semibold max-sm:font-semibold mt-3'>
      Overview
      <div className='text-white block overflow-scroll mt-3 no-scrollbar font-normal leading-loose sm:leading-6 max-sm:leading-6 md:text-[1rem] sm:text-[0.9rem] max-sm:text-[0.9rem] font-roboto lg:w-[37.5rem] md:w-[25rem]'>
        {overview}
      </div>
    </div>
  );
}

export function OriginalLanguage({ original_language }: any) {
  return (
    <div className='text-white py-1 text-center bg-gray-700 rounded-md opacity-85 w-10 '>
      {original_language.toUpperCase()}
    </div>
  );
}

export function VoteAverage({ vote_average }: any) {
  function roundNumber(number: number) {
    return Math.round(number * 10) / 10;
  }

  return (
    <div className='text-white w-20 text-center py-1 bg-black rounded-md'>
      <span className='text-md'>{roundNumber(vote_average)}</span>
      <FontAwesomeIcon icon={faStar} className='text-yellow-400 ml-1' />
    </div>
  );
}

export function Videos({ videos }: any) {
  console.log("Videos", videos);
  return (
    <>
      {videos ? (
        <div className='ml-[10rem] mt-[2rem]'>
          <h2 className='text-2xl font-semibold text-slate-300 font-roboto'>
            Movie Videos
          </h2>
          <ul className='flex w-[100%] overflow-hidden pt-10 '>
            <div className='flex overflow-x-scroll'>
              {videos.map((video: any) => (
                <li key={video.id}>
                  <iframe
                    title={video.name}
                    width={560}
                    height={315}
                    src={getVideoPath(video.key)}
                    allowFullScreen
                  />
                </li>
              ))}
            </div>
          </ul>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}
