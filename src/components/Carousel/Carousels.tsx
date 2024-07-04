import { useEffect, useRef, useState } from "react";
import { getImagePath, getLargeImagePath } from "../../Utils/GetImagePath";
import { fetchUpComingMoive } from "@/Utils/FetchAPI";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";

const SliderMovie = () => {
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWidth = imageRef.current?.offsetWidth || 0;
  const [x, setX] = useState(0);
  const [upComing, setUpComing] = useState([]);

  const fetching = async () => {
    const upcoming = await fetchUpComingMoive();
    setUpComing(upcoming);
  };

  // fetching data from api
  useEffect(() => {
    fetching();
  }, []);

  // checker
  useEffect(() => {
    if (upComing) {
      setLoading(false);
    }
  }, [upComing]);

  function next() {
    if (x !== upComing.length - 1) setX((x) => x + 1);
  }

  function prev() {
    if (x !== 0) {
      setX((x) => x - 1);
    }
  }

  function Capitalize(str: string) {
    return str.toUpperCase();
  }

  return (
    <div className='cursor-pointer max-sm:overflow-scroll no-scrollbar max-sm:snap-x max-sm:snap-mandatory  relative w-[100%] xl:h-[40rem] lg:h-[35rem] md:h-[30rem] max-sm:h-[22rem]  overflow-hidden'>
      <div
        className='flex  transition-transform ease-in-out duration-1000'
        style={{
          transform: `translateX(-${imageWidth * x}px)`,
        }}
      >
        <div className='absolute inset-0 z-40 h-full w-full bg-gradient-to-t from-gray-900/90 via-transparent to-transparent' />
        {upComing?.map((upcome: any) => (
          <div key={upcome.id} className='flex-full max-sm:snap-center'>
            <img
              ref={imageRef}
              alt='img'
              rel='preload'
              loading='lazy'
              className=' brightness-50 object-cover object-top w-[100%] max-sm:h-[21rem]'
              src={getLargeImagePath(upcome.backdrop_path)}
            />
            <div className='absolute sm:top-[14%] h-[27.5rem] max-sm:h-[22rem] max-sm:top-0 max-sm:flex  max-sm:justify-center  max-sm:items-center   max-sm:ml-3 w-[100%] xl:pl-[8.75rem] lg:pl-[6.25rem] sm:pl-[4.37rem] text-white'>
              <div className='max-sm:flex max-sm:w-[90%] max-sm:justify-start flex '>
                <img
                  rel='preload'
                  alt={upcome.title}
                  src={getImagePath(400, upcome.poster_path)}
                  className='xl:w-72 mr-3 max-sm:hidden lg:w-64 md:w-56 sm:w-44 max-sm:w-[10rem] rounded-md'
                />
                <div className='relative'>
                  <h2 className='xl:text-5xl italic lg:text-4xl md:text-3xl sm:text-2xl max-sm:text-6xl font-bold font-roboto max-sm:font-semibold pb-4 pl-3'>
                    {Capitalize(upcome.original_title)}
                  </h2>
                  <span className='sm:absolute max-sm:hidden md:text-xl sm:text-lg max-sm:text-sm max-sm:line-clamp-1 no-scrollbar max-sm:w-[10rem] max-sm:h-[12rem] max-sm:overflow-scroll  xl:w-[37.5rem] lg:w-[29.37rem] sm:w-[23.75rem] pl-3'>
                    {upcome.overview}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute max-sm:hidden flex w-[100%] h-[10rem] sm:left-[45%] z-50 items-center sm:top-[70%] '>
        <span
          onClick={() => prev()}
          className='bg-[#26262e] rounded-md border border-[#2eade7] w-11 h-11 mx-5  text-center pt-[0.65rem] text-[#2eade7]'
        >
          <ArrowLeftOutlined className='text-xl max-sm:text-lg' />
        </span>
        <span
          onClick={() => next()}
          className=' bg-[#26262e] rounded-md border border-[#2eade7]  w-11 h-11 mx-5 text-center pt-[0.65rem] text-[#2eade7]'
        >
          <ArrowRightOutlined className='text-xl max-sm:text-lg' />
        </span>
      </div>
    </div>
  );
};

export default SliderMovie;
