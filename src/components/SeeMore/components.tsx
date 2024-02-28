import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { getImagePath } from "@/Utils/GetImagePath";

export const Cards = ({ data, handleImageLoad, isLoaded }: any) => {
  const navigate = useNavigate();
  return (
    <>
      {data.map((datas: any) => (
        <div className='cursor-pointer hover:scale-110 transition-all duration-300'>
          <img
            onClick={() => {
              localStorage.setItem("id", datas.id.toString());
              navigate(`/movie/${datas.id}`);
            }}
            src={getImagePath(300, datas.poster_path)}
            alt={datas.title}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.5s",
            }}
            loading='lazy'
            height={375}
            width={250}
            onLoad={handleImageLoad}
            className='rounded-md '
          />
        </div>
      ))}
    </>
  );
};

export const Btn = ({ next, previous, handlePageBtn }: any) => {
  const [initPage, setInitPage] = useState([1, 2, 3, 4]);

  function Next() {
    setInitPage((prev) => prev.map((x) => x + 1));
    next();
  }

  function Previous() {
    setInitPage((prev) => prev.map((x) => x - 1));
    previous();
  }

  return (
    <>
      <div className='flex justify-center gap-2'>
        <div
          onClick={Previous}
          className='bg-[#26262e] text-[#2eade7]
          hover:text-[#26262e]
          hover:bg-[#2eade7] border rounded-md border-gray-600  items-center py-3 px-3'
        >
          <ArrowBackIosIcon style={{ paddingLeft: "3px" }} />
        </div>

        {initPage.map((num) => (
          <button
            key={num}
            onClick={(e) => handlePageBtn(e)}
            className='bg-[#26262e] text-[#2eade7]
                hover:text-[#26262e]
                hover:bg-[#2eade7] text-lg  border rounded-md  border-gray-600 py-3 px-5'
          >
            {num}
          </button>
        ))}
        <div
          onClick={Next}
          className='bg-[#26262e] text-[#2eade7]
          hover:text-[#26262e]
          hover:bg-[#2eade7] border rounded-md border-gray-600 items-center py-3 px-3'
        >
          <ArrowForwardIosIcon style={{ padding: "2px" }} />
        </div>
      </div>
    </>
  );
};

export const SkeletonLoad = ({ isLoaded }: { isLoaded: boolean }) => {
  const array = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <div
      style={{ opacity: isLoaded ? 0 : 1 }}
      className='flex flex-wrap gap-10 justify-center mt-6 mb-4 text-white absolute top-0'
    >
      {array.map(() => (
        // <Loader />
        <div className='w-[15.62rem] h-[23.4rem] rounded-md bg-gray-600 animate-pulse' />
      ))}
    </div>
  );
};
