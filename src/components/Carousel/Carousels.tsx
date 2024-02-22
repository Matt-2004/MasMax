import { useRef, useState } from "react";
import { PropsMovies } from "../../Utils/FetchAPI";
import getImagePath from "../../Utils/GetImagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SliderMovie = ({ pm }: PropsMovies) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWidth = imageRef.current?.offsetWidth || 0;
  const [x, setX] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  function next() {
    if (x !== pm.length - 1) setX((x) => x + 1);
  }

  function prev() {
    if (x !== 0) {
      setX((x) => x - 1);
    }
  }

  function handleLoad() {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }

  return (
    <div className='cursor-pointer w-[100%] h-[44rem]  overflow-hidden'>
      <div className='relative' style={{ opacity: isLoaded ? 0 : 1 }}>
        <div className='flex absolute left-[9%] mt-[14rem] lg:w-[44rem] md:w-[40rem] sm:w-[32rem] justify-between'>
          <div className='xl:w-[16rem] lg:w-[14rem] md:w-[12rem] sm:w-[10rem] xl:h-[25rem] lg:h-[23.12rem] md:h-[20.6rem] sm:h-[18.12rem] rounded-md bg-gray-600 animate-pulse' />
          <div className='flex flex-col h-[9.37rem] justify-between'>
            <div className='md:w-[15.6rem] sm:w-[12.5rem] md:h-[1.87rem] sm:h-[1.5rem] rounded-md bg-gray-600  ' />
            <div className='md:w-[25rem] sm:w-[20rem] h-[1.5rem]   bg-gray-600  rounded-md ' />
            <div className='md:w-[25rem] sm:w-[20rem] h-[1.5rem]   bg-gray-600 rounded-md ' />
            <div className='md:w-[25rem] sm:w-[20rem] h-[1.5rem]   bg-gray-600 rounded-md ' />
          </div>
        </div>
      </div>

      <div
        className='flex transition-transform ease-in-out duration-1000'
        style={{
          transform: `translateX(-${imageWidth * x}px)`,
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <div className='absolute inset-0 z-40 h-full w-full bg-gradient-to-t from-gray-900/90 via-transparent to-transparent' />
        {pm?.map((upcome) => (
          <div key={upcome.id} className='flex-full'>
            <img
              ref={imageRef}
              alt='img'
              rel='preload'
              loading='lazy'
              className=' brightness-50 object-cover object-top w-[100%] h-[800px]'
              width={1980}
              height={960}
              onLoad={handleLoad}
              src={getImagePath(upcome.backdrop_path)}
            />
            <div className='absolute  top-[27%] h-[27.5rem] w-[100%] xl:pl-[8.75rem] lg:pl-[6.25rem] sm:pl-[4.37rem] text-white'>
              <div className='flex '>
                <div>
                  <img
                    rel='preload'
                    alt={upcome.title}
                    loading='lazy'
                    src={getImagePath(upcome.poster_path)}
                    className='xl:w-72   lg:w-64 md:w-56 sm:w-44 rounded-md'
                    width={256}
                    height={300}
                  />
                </div>
                <div className='relative'>
                  <h2 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold pb-4 pl-3'>
                    {upcome.original_title}
                  </h2>
                  <span className='absolute text-lg xl:w-[37.5rem] lg:w-[29.37rem] sm:w-[23.75rem] pl-3'>
                    {upcome.overview}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute flex w-[100%] z-50 justify-between top-[50%]'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => prev()}
          className='bg-[#26262e] opacity-70 hover:opacity-100 text-[#2eade7]  mx-3 rounded-md px-3 py-3 '
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => next()}
          className=' bg-[#26262e] opacity-70 hover:opacity-100  mx-3 rounded-md px-3 py-3 text-[#2eade7]'
        />
      </div>
    </div>
  );
};

export default SliderMovie;
