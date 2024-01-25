import { useRef, useState } from "react";
import { PropsMovies } from "../../Utils/FetchAPI";
import getImagePath from "../../Utils/GetImagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SliderMovie = ({ pm }: PropsMovies) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWidth = imageRef.current?.offsetWidth || 0;
  const [x, setX] = useState(0);

  const translater = {
    transform: `translateX(-${imageWidth * x}px)`,
  };

  function next() {
    if (x !== pm.length - 1) setX((x) => x + 1);
  }

  function prev() {
    if (x !== 0) {
      setX((x) => x - 1);
    }
  }

  return (
    <div className='cursor-pointer w-[100%] h-[700px] relative overflow-hidden'>
      <div className='absolute inset-0 z-40 h-full w-full bg-gradient-to-t from-gray-900/90 via-transparent to-transparent' />
      <div
        className='flex transition-transform ease-in-out duration-1000'
        style={translater}
      >
        {pm?.map((upcome) => (
          <div key={upcome.id} className='flex-full'>
            <img
              ref={imageRef}
              alt='img'
              rel='preload'
              loading='lazy'
              className=' brightness-50 object-cover object-top w-[100%] h-[800px]'
              src={getImagePath(upcome.backdrop_path)}
            />
            <div className='absolute  top-[27%] h-[440px] w-[100%] xl:pl-[140px] lg:pl-[100px] sm:pl-[70px] text-white'>
              <div className='flex '>
                <div>
                  <img
                    rel='preload'
                    alt={upcome.title}
                    loading='lazy'
                    src={getImagePath(upcome.poster_path)}
                    className='xl:w-72   lg:w-64 md:w-56 sm:w-44 rounded-md'
                  />
                </div>
                <div className='relative'>
                  <h2 className='text-5xl font-bold pb-4 pl-3'>
                    {upcome.original_title}
                  </h2>
                  <span className='absolute text-lg xl:w-[600px] lg:w-[470px] sm:w-[380px] pl-3'>
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
