import { SeeMoreResult } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import DialogTag from "./DialogTag";
import { useLastGetLocation } from "@/Utils/useLastGetLocation";
import { useLocalStorage } from "@/Utils/useLocalStorage";

const SeeMore = ({ data, title }: SeeMoreResult) => {
  // ToDo: When click right and left btn, initpage value have to change +1 or -1;
  // That change indicate the page url and then fetch from api with url last

  const navigate = useNavigate();
  const lastPathSegement = useLastGetLocation();
  const { setItem } = useLocalStorage("id");

  const [initPage, setInitPage] = useState([1, 2, 3, 4]);

  const [pagesValid, setPageValid] = useState(false);

  function setPageValidToTrue() {
    setTimeout(() => {
      setPageValid(true);
    }, 2000);
  }

  useEffect(() => {
    setPageValid(false);
    setPageValidToTrue();
  }, [lastPathSegement, initPage]);

  function handlePages(e: string) {
    if (e === "increase") {
      navigate(`/seemore/page/${initPage[1]}`);
      if (initPage[3] !== 20) {
        setPageValid(false);
        setInitPage((prev) => prev.map((p) => p + 1));
      }
    } else {
      navigate(`/seemore/page/${initPage[0]}`);
      if (initPage[0] !== 1) {
        setInitPage((prev) => prev.map((p) => p - 1));
        setPageValid(false);
      }
    }
  }

  return (
    <div className='w-[75%] h-[100%] '>
      <div className='flex justify-start text-3xl font-bold my-7 text-[#ffffff]'>
        {title}
      </div>
      <div className='flex flex-wrap justify-center gap-10'>
        {data ? (
          data.map((datas) =>
            pagesValid ? (
              <div className='cursor-pointer'>
                <img
                  onClick={() => setItem(datas.id.toString())}
                  src={getImagePath(datas.poster_path)}
                  alt={datas.title}
                  width={250}
                  className='rounded-md'
                />
              </div>
            ) : (
              // Loader
              <Loader />
            )
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className='flex justify-center mt-6 mb-4 text-white'>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={() => handlePages("decrease")}
          className='py-4 px-4 mr-3 border rounded-md  text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] border-gray-600 hover:bg-[#2eade7]'
        />
        {initPage.map((num) => (
          <button
            key={num}
            onClick={(e) =>
              navigate(`/seemore/page/${e.currentTarget.innerHTML}`)
            }
            className='w-14 border text-lg text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] border-gray-600 hover:bg-[#2eade7] rounded-md mr-3'
          >
            {num}
          </button>
        ))}
        <DialogTag />
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => handlePages("increase")}
          className='py-4 px-4 ml-3 border border-gray-600 rounded-md  text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] hover:bg-[#2eade7]'
        />
      </div>
    </div>
  );
};

function Loader() {
  return (
    <div
      role='status'
      className='w-[240px] h-[330px] border rounded-md animate-pulse  items-center flex flex-wrap justify-center gap-10'
    >
      <svg
        aria-hidden='true'
        className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export default SeeMore;
