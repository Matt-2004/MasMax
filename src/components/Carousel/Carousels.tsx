import { useEffect, useRef, useState } from "react";
import { getImagePath, getLargeImagePath } from "../../Utils/GetImagePath";
import { fetchUpComingMoive } from "@/Utils/FetchAPI";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";

const SliderMovie = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWidth = imageRef.current?.offsetWidth || 0;
  const [x, setX] = useState(0);
  const [upComing, setUpComing] = useState([]);

  const fetching = async () => {
    const upcoming = await fetchUpComingMoive();
    setUpComing(upcoming);
  };

  useEffect(() => {
    fetching();
  }, []);

  function next() {
    if (x !== upComing.length - 1) setX((x) => x + 1);
  }

  function prev() {
    if (x !== 0) {
      setX((x) => x - 1);
    }
  }

  return (
    <div className='cursor-pointer w-[100%] xl:h-[40rem] lg:h-[35rem] md:h-[30rem] max-sm:h-[22rem]  overflow-hidden'>
      <div
        className='flex transition-transform ease-in-out duration-1000'
        style={{
          transform: `translateX(-${imageWidth * x}px)`,
        }}
      >
        <div className='absolute inset-0 z-40 h-full w-full bg-gradient-to-t from-gray-900/90 via-transparent to-transparent' />
        {upComing?.map((upcome: any) => (
          <div key={upcome.id} className='flex-full'>
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
                <div>
                  <img
                    rel='preload'
                    alt={upcome.title}
                    src={getImagePath(400, upcome.poster_path)}
                    className='xl:w-72   lg:w-64 md:w-56 sm:w-44 max-sm:w-[10rem] rounded-md'
                  />
                </div>
                <div className='relative'>
                  <h2 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl max-sm:text-xl font-bold font-roboto max-sm:font-semibold pb-4 pl-3'>
                    {upcome.original_title}
                  </h2>
                  <span className='absolute md:text-xl sm:text-md max-sm:text-sm max-sm:line-clamp-1 no-scrollbar max-sm:w-[10rem] max-sm:h-[12rem] max-sm:overflow-scroll  xl:w-[37.5rem] lg:w-[29.37rem] sm:w-[23.75rem] pl-3'>
                    {upcome.overview}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute flex w-[100%] z-50 justify-between xl:top-[43%] lg:top-[38%] md:top-[30%] sm:top-[25%]  max-sm:top-[26%]'>
        <span
          onClick={() => prev()}
          className='bg-[#26262e] opacity-85 max-sm:opacity-50 hover:opacity-100  w-10 h-10 items-center mx-3 text-center pt-1 text-[#2eade7]'
        >
          <ArrowLeftOutlined className='text-xl max-sm:text-lg' />
        </span>
        <span
          onClick={() => next()}
          className=' bg-[#26262e] opacity-85 max-sm:opacity-50 hover:opacity-100 w-10 h-10 items-center mx-3 text-center pt-1 text-[#2eade7]'
        >
          <ArrowRightOutlined className='text-xl max-sm:text-lg' />
        </span>
      </div>
    </div>
  );
};

export default SliderMovie;
