import { fetchPopularMovie, fetchTopRatedMovie } from "@/Utils/FetchAPI";
import { useEffect, useState } from "react";
import { Btn, Cards, SkeletonLoad } from "./components";
import { useNavigate } from "react-router-dom";

const SeeMore = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetching = async () => {
    if (title === "Popular") {
      const popu = await fetchPopularMovie(page);
      setData(popu);
    } else {
      const topRate = await fetchTopRatedMovie(page);
      setData(topRate);
    }
  };

  useEffect(() => {
    navigate(`/seemore/page/1`);
  }, []);

  useEffect(() => {
    fetching();
    handleImageLoad();
  }, [count]);

  function next() {
    setCount((prev) => prev + 1);
    setPage((prev) => prev + 1);
    setIsLoaded(false);
    navigate(`/seemore/page/${page + 1}`);
  }
  function previous() {
    setCount((prev) => prev - 1);
    setPage((prev) => prev - 1);
    setIsLoaded(false);
    navigate(`/seemore/page/${page - 1}`);
  }

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 700);
  };

  function handlePageBtn(e: any) {
    setIsLoaded(false);
    let value = e.currentTarget.innerHTML;
    setCount(value);
    setPage(value);
    navigate(`/seemore/page/${value}`);
  }

  return (
    <div className='w-[75%] h-[100%] '>
      <div
        id='title'
        className='flex justify-start text-3xl font-bold my-7 text-[#ffffff]'
      >
        <span
          onClick={() => navigate("/")}
          className='cursor-pointer opacity-75 hover:opacity-100 pb-2 px-2 '
        >
          <div /> // icon
        </span>
        {title}
      </div>
      <div className='relative'>
        <SkeletonLoad isLoaded={isLoaded} />
        <div className='flex flex-wrap gap-10 justify-center mt-6 mb-4 text-white absolute top-0'>
          <Cards
            handleImageLoad={handleImageLoad}
            isLoaded={isLoaded}
            data={data}
          />
          <Btn
            next={next}
            previous={previous}
            handlePageBtn={handlePageBtn}
            isLoaded={isLoaded}
          />
        </div>
      </div>
    </div>
  );
};

export default SeeMore;
