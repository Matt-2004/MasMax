import { useEffect, useRef, useState } from "react";
import { getImagePath, getLargeImagePath } from "../../Utils/GetImagePath";
import { fetchUpComingMoive } from "@/Utils/FetchAPI";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";

const SliderMovie = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWidth = imageRef.current?.offsetWidth || 0;
  const [x, setX] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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

  function handleLoad() {
    setIsLoaded(true);
  }

  return (
    <div className="cursor-pointer w-[100%] h-[40rem] max-sm:h-[22rem]  overflow-hidden">
      <div className="relative" style={{ opacity: isLoaded ? 0 : 1 }}>
        <div className="flex absolute left-[9%] mt-[14rem] lg:w-[46rem] md:w-[37rem] sm:w-[27rem]  justify-between">
          <div className="xl:w-[16rem] lg:w-[14rem] md:w-[12rem] sm:w-[10rem] xl:h-[25rem] lg:h-[23.12rem] md:h-[20.6rem] sm:h-[15rem] rounded-md bg-gray-600 animate-pulse" />
          <div className="flex flex-col h-[9.37rem] justify-between">
            <div className="md:w-[15.6rem] sm:w-[11rem] md:h-[1.87rem] sm:h-[1.5rem] rounded-md bg-gray-600  " />
            <div className="lg:w-[28rem] md:w-[23rem] sm:w-[15rem] h-[1.5rem]   bg-gray-600  rounded-md " />
            <div className="lg:w-[28rem]  md:w-[23rem] sm:w-[15rem] h-[1.5rem]   bg-gray-600 rounded-md " />
            <div className="lg:w-[28rem] md:w-[23rem] sm:w-[15rem] h-[1.5rem]   bg-gray-600 rounded-md " />
          </div>
        </div>
      </div>

      <div
        className="flex transition-transform ease-in-out duration-1000"
        style={{
          transform: `translateX(-${imageWidth * x}px)`,
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 z-40 h-full w-full bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
        {upComing?.map((upcome: any) => (
          <div key={upcome.id} className="flex-full">
            <img
              ref={imageRef}
              alt="img"
              rel="preload"
              loading="lazy"
              className=" brightness-50 object-cover object-top w-[100%] max-sm:h-[21rem]"
              onLoad={handleLoad}
              src={getLargeImagePath(upcome.backdrop_path)}
            />
            <div className="absolute top-[14%] h-[27.5rem] max-sm:top-[10%] max-sm:ml-3 w-[100%] xl:pl-[8.75rem] lg:pl-[6.25rem] sm:pl-[4.37rem] text-white">
              <div className="flex ">
                <div>
                  <img
                    rel="preload"
                    alt={upcome.title}
                    src={getImagePath(400, upcome.poster_path)}
                    className="xl:w-72   lg:w-64 md:w-56 sm:w-44 max-sm:w-[10rem] rounded-md"
                  />
                </div>
                <div className="relative">
                  <h2 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl max-sm:text-xl font-bold font-roboto max-sm:font-semibold pb-4 pl-3">
                    {upcome.original_title}
                  </h2>
                  <span className="absolute text-xl max-sm:text-sm max-sm:line-clamp-1 no-scrollbar max-sm:w-[10rem] max-sm:h-[12rem] max-sm:overflow-scroll  xl:w-[37.5rem] lg:w-[29.37rem] sm:w-[23.75rem] pl-3">
                    {upcome.overview}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute flex w-[100%] z-50 justify-between top-[43%] max-sm:top-[26%]">
        <span
          onClick={() => prev()}
          className="bg-[#26262e] opacity-85 max-sm:opacity-50 hover:opacity-100  w-10 h-10 items-center mx-3 text-center pt-1 text-[#2eade7]"
        >
          <ArrowLeftOutlined className="text-xl max-sm:text-lg" />
        </span>
        <span
          onClick={() => next()}
          className=" bg-[#26262e] opacity-85 max-sm:opacity-50 hover:opacity-100 w-10 h-10 items-center mx-3 text-center pt-1 text-[#2eade7]"
        >
          <ArrowRightOutlined className="text-xl max-sm:text-lg" />
        </span>
      </div>
    </div>
  );
};

export default SliderMovie;
