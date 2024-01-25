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

const SeeMore = ({ title }: { title: string }) => {
  const btn = useRef<HTMLButtonElement>(null);

  // ToDo:
  // when input change the btn of initpage have to change

  // Have to do navigate

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

  useEffect(() => {}, []);

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
      setInitPage(
        (init: any) => init.map((inits: any) => inits + pages - 1 - value) // 1 + 18 = 19 - 3 16
        // 16 + 18 = 34 - 18 = 16
      );
      console.log(initPage);
    } else if (pages >= 16) {
      setInitPage((init: any) =>
        init.map((inits: any) => inits + pages - pages + 1)
      );
    } else {
      setInitPage((init: any) =>
        init.map((inits: any) => inits + pages - init[0])
      );
      console.log(initPage);
    }
  }

  function handlePageBtn(e: any) {
    let value = e.currentTarget.innerHTML;
    console.log(typeof value);
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
      <div className='flex justify-start text-3xl font-bold my-7 text-[#ffffff]'>
        {title}
      </div>
      <div className='relative'>
        {/* Give same position with absolute -> Load opac: 1 -> Image opac: 0 */}
        {/* After Images downloaded -> Load opac: 0 -> Load opac: 1*/}
        <div className='h-[105rem]'>
          <div
            style={{ opacity: isLoaded ? 0 : 1 }}
            className='flex flex-wrap gap-10 justify-center mt-6 mb-4 text-white absolute top-0'
          >
            {array.map(() => (
              <Loader />
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
          </div>
        </div>
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
              <DialogDescription>You can go within 20 pages.</DialogDescription>
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
  );
};

function Loader() {
  return (
    <div
      role='status'
      className='w-[250px] h-[375px] border rounded-md items-center flex flex-wrap justify-center gap-10'
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
