import { fetchPopularMovie, fetchTopRatedMovie } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DialogTag from "./DialogTag";
import { useLocalStorage } from "@/Utils/useLocalStorage";
import { useQuery } from "@tanstack/react-query";

const SeeMore = ({ title }: { title: string }) => {
  // Have to do navigate

  const navigate = useNavigate();
  const { setItem } = useLocalStorage("id");
  const [initPage, setInitPage] = useState([1, 2, 3, 4]);
  const [isloading, setLoading] = useState(true);

  async function fetching(page: number) {
    if (title === "Popular") {
      const popu = await fetchPopularMovie(page);
      return popu;
    } else {
      const topRate = await fetchTopRatedMovie(page);
      return topRate;
    }
  }

  const { data, isSuccess, refetch } = useQuery({
    queryFn: () => fetching(initPage[0]),
    queryKey: ["querys"],
    enabled: !!initPage,
  });

  function loaderToTrue() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  useEffect(() => {
    loaderToTrue();
  }, []);

  function next() {
    initPage[3] < 21
      ? setInitPage((prev) => prev.map((x) => x + 1))
      : console.log("blarBlar");
    loaderToTrue();
    refetch();
  }

  function previous() {
    initPage[0] !== 0
      ? setInitPage((prev) => prev.map((x) => x - 1))
      : console.log("Can't Go");
    loaderToTrue();
    refetch();
  }

  return (
    <div className='w-[75%] h-[100%] '>
      <div className='flex justify-start text-3xl font-bold my-7 text-[#ffffff]'>
        {title}
      </div>
      <div className='flex flex-wrap gap-10 justify-center mt-6 mb-4 text-white'>
        {isSuccess
          ? data.map((datas: any) =>
              isloading ? (
                <Loader />
              ) : (
                <div className='cursor-pointer'>
                  <img
                    onClick={() => setItem(datas.id.toString())}
                    src={getImagePath(datas.poster_path)}
                    alt={datas.title}
                    loading='lazy'
                    width={250}
                    className='rounded-md'
                  />
                </div>
              )
            )
          : console.log("Error!!")}
      </div>
      <div className='flex justify-center gap-2'>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={() => {
            previous();
          }}
          className='bg-[#26262e] text-[#2eade7]
          hover:text-[#26262e]
          hover:bg-[#2eade7] border rounded-md border-gray-600  py-4 px-5'
        />
        {initPage.map((num) => (
          <button
            key={num}
            onClick={(e) =>
              navigate(`/seemore/page/${e.currentTarget.innerHTML}`)
            }
            className='bg-[#26262e] text-[#2eade7]
            hover:text-[#26262e]
            hover:bg-[#2eade7]  border rounded-md  border-gray-600 py-1 px-5'
          >
            {num}
          </button>
        ))}
        <DialogTag />
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => {
            next();
          }}
          className='bg-[#26262e] text-[#2eade7]
          hover:text-[#26262e]
          hover:bg-[#2eade7] border rounded-md border-gray-600  py-4 px-5'
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
