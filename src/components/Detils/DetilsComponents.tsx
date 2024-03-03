import { getImagePath, getLargeImagePath } from "@/Utils/GetImagePath";
import getVideoPath from "@/Utils/GetVideoPath";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import { useNavigate } from "react-router-dom";

export function BackDropPath({ backdrop_path }: any) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate("/")}
        className='absolute z-40 cursor-pointer top-[3%] left-[2%] text-[#2eade7] bg-[#26262e] bg-opacity-70 py-2 px-3 opacity-80 rounded-sm hover:bg-opacity-100 hover:opaicty-100'
      >
        <ArrowLeftOutlined className='text-xl ' />
      </div>

      <section className='relative'>
        <img
          src={getLargeImagePath(backdrop_path)}
          className='flex lg:h-[37.5rem] max-sm:h-[19rem] w-[100%] object-cover object-top brightness-50'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/40 to-[#1A1C29]/80' />
      </section>
    </>
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
      src={getImagePath(300, poster_path)}
      className='rounded-md md:static sm:absolute max-sm:absolute sm:top-[3%] sm:left-[37%] max-sm:top-[1%]  lg:h-[25rem] sm:h-[18rem] max-sm:h-[15.62rem] md:h-[20rem] '
    />
  );
}

export function Title({ title, release_date }: any) {
  return (
    <span className='lg:text-4xl md:text-3xl sm:text-2xl max-sm:text-2xl font-roboto font-semibold text-slate-200'>
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
    <div className='lg:text-3xl  sm:text-2xl max-sm:text-xl font-roboto text-white overflow-hidden md:font-bold sm:font-semibold max-sm:font-semibold mt-4'>
      Overview
      <div className='text-white block overflow-scroll mt-1 no-scrollbar font-normal font-titillium leading-loose sm:leading-6 max-sm:leading-6 md:text-[1rem] sm:text-[0.9rem] max-sm:text-[0.9rem]  lg:w-[37.5rem] md:w-[25rem] max-sm:w-[19rem]'>
        {overview}
      </div>
    </div>
  );
}

export function OriginalLanguage() {
  return <div className='text-white py-2 text-center font-roboto'>Rating</div>;
}

export function VoteAverage({ vote_average }: any) {
  function roundNumber(number: number) {
    return Math.round(number * 10) / 10;
  }

  return (
    <div className='text-[#181816] flex flex-col justify-center items-center px-7 text-center font-bold font-titillium bg-white rounded-sm'>
      <span className='text-lg'>{roundNumber(vote_average)}</span>
    </div>
  );
}

export function Videos({ videos }: any) {
  function HeaderContainer({ children }: any) {
    return <div className='flex justify-between w-[90%]'>{children}</div>;
  }

  return (
    <>
      {videos ? (
        <section className='mt-10 w-[100%] sm:flex justify-center  max-sm:flex max-sm:justify-center'>
          <div className='max-sm:flex max-sm:w-[95%] sm:w-[80%]  max-sm:flex-col max-sm:justify-center '>
            <HeaderContainer>
              <h2 className='text-2xl font-medium text-white font-roboto'>
                Trailer
              </h2>
              <span className='text-lg hover:underline font-medium text-white font-titillium'>
                More {"->"}
              </span>
            </HeaderContainer>
            <ul className='flex w-[90%] sm:overflow-hidden pt-5 '>
              <div className='flex overflow-x-scroll no-scrollbar gap-3'>
                {videos.map((video: any) => (
                  <li key={video.id}>
                    <iframe
                      className='xl:w-[35rem] rounded-md lg:w-[28rem] md:w-[24rem] max-sm:w-[23rem]  xl:h-[18.7rem] lg:h-[16rem] md:h-[14rem] max-sm:h-[14rem]'
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
        </section>
      ) : (
        <span className='text-white'>Loading</span>
      )}
    </>
  );
}
