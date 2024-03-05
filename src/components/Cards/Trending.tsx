import { useEffect, useState } from "react";
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined";
import ImageUI from "@/components/Cards/ImageUI";
import FilterUI from "./FilterUI";

const Trending = () => {
  const [trend, setTrend] = useState([]);

  const [select, setSelect] = useState("day");
  const timeType = [
    {
      label: "day",
      id: 1,
    },
    {
      label: "week",
      id: 2,
    },
  ];

  useEffect(() => {
    const fetching = async () => {
      const { fetchTrendMovie } = await import("@/Utils/FetchAPI");
      const trending = await fetchTrendMovie(select);
      setTrend(trending);
    };
    fetching();
  }, [select]);

  return (
    <>
      {trend ? (
        <div className='w-[100%] mt-16 mb-8 max-sm:mt-1 flex justify-center'>
          <div className='flex flex-col'>
            <div className='flex justify-between mx-2'>
              <div className='mb-8 lg:text-3xl font-bold  md:text-2xl sm:text-xl max-sm:text-xl text-[#2eade7]'>
                Trending
              </div>
              <FilterUI
                FilterType={timeType}
                icon={<CaretDownOutlined />}
                select={select}
                setSelect={setSelect}
              />
            </div>
            <ImageUI display={trend} />
          </div>
        </div>
      ) : (
        <div className='text-xl text-white'>Loading...</div>
      )}
    </>
  );
};

export default Trending;
