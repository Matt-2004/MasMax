import { fetchPopularMovie, fetchTopRatedMovie } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { useLocalStorage } from "@/Utils/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
// This got error in laptop

const SeeMore = ({ title }: { title: string }) => {
  const btn = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const { setItem } = useLocalStorage("id");
  const [initPage, setInitPage] = useState([1, 2, 3, 4]);

  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");
  const array = Array.from({ length: 20 }, (_, index) => index + 1);

  useEffect(() => {
    if (pages > 20) {
      btn.current?.setAttribute("disabled", "true");
      setError(`Can't go pages of ${pages}, have to type within 20`);
    } else {
      btn.current?.removeAttribute("disabled");
      setError("");
    }
  }, [pages]);

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
    queryKey: ["querys", initPage],
    enabled: !!initPage,
  });

  function next() {
    initPage[3] < 21
      ? setInitPage((prev) => prev.map((x) => x + 1))
      : console.log("blarBlar");
    refetch();
    setIsLoaded(false);
  }

  function previous() {
    initPage[0] !== 1
      ? setInitPage((prev) => prev.map((x) => x - 1))
      : console.log("Can't Go");
    refetch();
    setIsLoaded(false);
  }
  function pagesCheck(pages: number) {
    // this function prevent btn value not to pass 20

    if (pages >= 16 && initPage[0] <= 15) {
      let value = pages - 16;
      setInitPage((init: any) =>
        init.map((inits: any) => inits + pages - 1 - value)
      );
    } else if (pages >= 16) {
      setInitPage((init: any) =>
        init.map((inits: any) => inits + pages - pages + 1)
      );
    } else {
      setInitPage((init: any) =>
        init.map((inits: any) => inits + pages - init[0])
      );
      7;
    }
  }

  function handlePageBtn(e: any) {
    let value = e.currentTarget.innerHTML;
    pagesCheck(parseInt(value));
    navigate(`/seemore/page/${value}`);
  }

  function exitAndHandleLoader(pages: number) {
    setIsLoaded(false);
    pagesCheck(pages);
    navigate(`/seemore/page/${pages}`);
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
  };

  return (
    <div className='w-[75%] h-[100%] '>
      <div
        id='title'
        className='flex justify-start text-3xl font-bold my-7 text-[#ffffff]'
      >
        {title}
      </div>
      <div className='relative'>
        <div className=''>
          <div
            style={{ opacity: isLoaded ? 0 : 1 }}
            className='flex flex-wrap gap-10 justify-center mt-6 mb-4 text-white absolute top-0'
          >
            {array.map(() => (
              // <Loader />
              <div className='w-[250px] h-[370px] rounded-md bg-gray-600 animate-pulse' />
            ))}
          </div>
          <div className='flex flex-wrap gap-10 justify-center mt-6 mb-4 text-white absolute top-0'>
            {isSuccess
              ? data.map((datas: any) => (
                  <div className='cursor-pointer hover:scale-110 transition-all duration-300'>
                    <img
                      onClick={() => setItem(datas.id.toString())}
                      src={getImagePath(datas.poster_path)}
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
                ))
              : console.log("Error!!")}
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
                  onClick={(e) => handlePageBtn(e)}
                  className='bg-[#26262e] text-[#2eade7]
            hover:text-[#26262e]
            hover:bg-[#2eade7]  border rounded-md  border-gray-600 py-1 px-5'
                >
                  {num}
                </button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <button className='px-4 py-2 border text-lg text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] border-gray-600 hover:bg-[#2eade7] rounded-md'>
                    ...
                  </button>
                </DialogTrigger>
                <DialogContent className='w-[400px]'>
                  <DialogHeader>
                    <DialogTitle>Pages</DialogTitle>
                    <DialogDescription>
                      You can go within 20 pages.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='text-white'>
                    <input
                      type='number'
                      max='2'
                      min='1'
                      onChange={(e) => setPages(parseInt(e.target.value))}
                      className='outline-none text-black px-3 py-1 rounded-md mr-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    />
                    <span>/ 20</span>
                  </div>
                  <div className='text-red-600'>{error}</div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type='submit'
                        onClick={() => exitAndHandleLoader(pages)}
                        ref={btn}
                      >
                        Go
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
        </div>
      </div>
    </div>
  );
};

export default SeeMore;
