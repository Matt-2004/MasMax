import { getImagePath, getLargeImagePath } from "@/Utils/GetImagePath";
import getVideoPath from "@/Utils/GetVideoPath";
import StarFilled from "@ant-design/icons/StarFilled";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import React from "react";
import { useNavigate } from "react-router-dom";

export function BackDropPath({ backdrop_path }: any) {
  return (
    <>
      <section className='relative'>
        <img
          src={getLargeImagePath(backdrop_path)}
          className='flex lg:h-[37.5rem] blur-lg max-sm:h-[19rem] w-[100%] object-cover object-top '
        />
        <div className='absolute inset-0 bg-gradient-to-t from-gray-200/0 via-gray-900/40 to-[#1A1C29]/80' />
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

interface PosterProps {
  poster_path: string;
  width: number;
  movie_id: string;
}

// const addFavourite = async (movie_id: string) => {
//   const user_id = localStorage.getItem("user_Id"); // have to set the user_id
//   const response = await fetch("https://auth-2ngh.onrender.com/addFavID", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       _id: user_id,
//       favID: movie_id,
//     }),
//   });
//   if (!response.ok) {
//     throw new Error("Add Favourite Failed!");
//   }
//   console.log("Add Favourite success!");
// };

export function Poster_path({ poster_path, width, movie_id }: PosterProps) {
  const navigate = useNavigate();
  return (
    <>
      <img
        onClick={() => {
          localStorage.setItem("id", movie_id.toString()),
            navigate(`/movie/${movie_id}`);
        }}
        src={getImagePath(300, poster_path)}
        className={`relative md:static sm:h-[18rem] max-sm:h-[15.62rem] md:h-[20rem] lg:h-[${width}rem] `}
      />
      <span
        className='absolute cursor-pointer top-0 left-0 px-2 py-2 bg-gray-600 opacity-80 hover:opacity-90 text-white'
        onClick={() => console.log(movie_id)}
      >
        <PlusOutlined />
      </span>
    </>
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
    <div className='text-slate-300 mt-4  flex xl:text-lg md:text-md'>
      {genres.map((genre: any) => (
        <div
          key={genre.key}
          className='hover:text-slate-500 px-3 text-[1rem] font-semibold  border border-slate-400 hover:border-slate-500 mr-2 rounded-2xl'
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
}

export function OverView({ overview }: any) {
  return (
    <section className='mt-10 w-[100%] sm:flex justify-center  max-sm:flex max-sm:justify-center'>
      <div className='lg:text-2xl max-sm:w-[95%] sm:w-[80%]  sm:text-2xl max-sm:text-xl font-roboto text-white overflow-hidden  sm:font-semibold max-sm:font-semibold mt-4'>
        Overview
        <div className='text-white  mt-6 no-scrollbar font-normal font-roboto leading-loose sm:leading-6 max-sm:leading-6 text-lg  max-sm:text-[0.9rem] xl:w-[52rem] lg:w-[37.5rem] md:w-[25rem] max-sm:w-[19rem]'>
          {overview}
        </div>
      </div>
    </section>
  );
}

export function roundNumber(number: number) {
  return Math.round(number * 10) / 10;
}

export function VoteAverage({ vote_average }: any) {
  return (
    <div className=' flex flex-col justify-center items-center mt-4  text-center  '>
      <span className='text-lg px-3  '>
        <StarFilled className='text-yellow-400' />{" "}
        <span className='text-2xl font-semibold text-white'>
          {roundNumber(vote_average)}
        </span>
        <span className='text-gray-400'>/10</span>
      </span>
    </div>
  );
}

export function Videos({ videos }: any) {
  function HeaderContainer({ children }: any) {
    return <div className=''>{children}</div>;
  }

  return (
    <>
      {videos ? (
        <section className='mt-10 w-[100%] sm:flex justify-center  max-sm:flex max-sm:justify-center'>
          <div className='max-sm:flex max-sm:w-[95%] sm:w-[80%]  max-sm:flex-col max-sm:justify-center '>
            <HeaderContainer>
              <h2 className='text-2xl font-medium text-white font-roboto dark:text-black'>
                Trailer
              </h2>
            </HeaderContainer>
            <ul className='flex w-[90%] sm:overflow-hidden pt-5 '>
              <div className='flex overflow-x-scroll no-scrollbar gap-3'>
                {videos.map((video: any) => (
                  <li key={video.id}>
                    <iframe
                      className='xl:w-[40rem] rounded-md lg:w-[28rem] md:w-[24rem] max-sm:w-[23rem]  xl:h-[28rem] lg:h-[16rem] md:h-[14rem] max-sm:h-[14rem]'
                      title={video.name}
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

export function FavouriteAndWatchlistContainer({ children }: any) {
  return (
    <div className='text-white flex  font-roboto  rounded-lg mt-3'>
      {children}
    </div>
  );
}

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  width: string;
  icon?: React.SVGAttributes<SVGAElement>;
  color: string;
  hover_color: string;
}

export function FavouriteBtn(props: IButton) {
  const { text, width, icon, color, hover_color } = props;
  // Note: Have to give rem value to width
  return (
    <div
      className={`${color} px-3 items-center hover:${hover_color} w-[${width}rem] flex justify-center py-2 rounded-sm `}
    >
      <div className=' items-center'>
        <div className='flex'>
          {icon}
          <p className='pl-2'>{text}</p>
        </div>
      </div>
    </div>
  );
}
