import { getImagePath } from "@/Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined";

const MovieCard = () => {
  const navigate = useNavigate();
  const [dispaly, setDisplay] = useState([]);
  const dropDownRef = useRef<HTMLUListElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [select, setSelect] = useState("popular");
  const movieType = [
    {
      label: "popular",
      id: 1,
    },
    {
      label: "top rated",
      id: 2,
    },
  ];

  useEffect(() => {
    const fetching = async () => {
      const { fetchPopularMovie, fetchTopRatedMovie } = await import(
        "@/Utils/FetchAPI"
      );
      if (select === "popular") {
        const res = await fetchPopularMovie(1);
        setDisplay(res);
      } else {
        const res = await fetchTopRatedMovie(1);
        setDisplay(res);
      }
    };
    fetching();
  }, [select]);

  const triggerRef = useRef(false);
  function handleDropDown() {
    triggerRef.current = !triggerRef.current;
    const select = triggerRef.current;

    if (dropDownRef.current) {
      dropDownRef.current.style.position = select ? "absolute" : "";
      dropDownRef.current.style.display = select ? "block" : "none";
    }
  }

  return (
    <>
      {dispaly ? (
        <div className='w-[100%] mt-16 max-sm:mt-1 flex justify-center'>
          <div className='flex flex-col'>
            <div className='flex justify-between mx-2'>
              <div className='mb-8 lg:text-3xl font-bold  md:text-2xl sm:text-xl max-sm:text-xl text-[#2eade7]'>
                Movies
              </div>
              <section
                className='w-[9rem] relative'
                onMouseEnter={() => handleDropDown()}
                onMouseLeave={() => handleDropDown()}
              >
                <div className='text-white border border-slate-500 text-lg h-[2.5rem] items-center cursor-pointer flex justify-between   font-roboto px-6   hover:bg-[#858588]  hover:bg-opacity-30 py-2 rounded-md'>
                  <div>{select}</div>
                  <span className='mb-[5px]'>
                    <CaretDownOutlined />
                  </span>
                </div>
                <ul
                  ref={dropDownRef}
                  className='text-white hidden font-roboto bg-white bg-opacity-40 shadow-lg w-[10rem] z-20 top-[80%] left-[-10%]  px-1 text-center'
                >
                  {movieType.map((types) => (
                    <li
                      onClick={(e) => setSelect(e.currentTarget.innerHTML)}
                      className='py-2 bg-[#2EADE7] rounded-md my-1 hover:text-[#2EADE7] hover:bg-white px-4'
                    >
                      {types.label}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <div className='flex flex-wrap gap-4 cursor-pointer mb-3 lg:w-[62.5rem] md:w-[48.12rem] sm:w-[40rem] justify-between max-sm:justify-evenly'>
              {dispaly.slice(0, 8).map((p: MovieResult) => (
                <div key={p.id} className='relative'>
                  <div
                    onClick={() => {
                      localStorage.setItem("id", p.id.toString()),
                        navigate(`/movie/${p.id}`);
                    }}
                  >
                    <img
                      ref={imgRef}
                      src={getImagePath(300, p.poster_path)}
                      alt={p.title}
                      loading='lazy'
                      className='rounded-sm hover:scale-105 transition-all duration-200 lg:w-[14.37rem] md:w-[11.25rem] sm:w-[8.75rem] max-sm:w-[9.3rem]'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='text-xl text-white'>Loading...</div>
      )}
    </>
  );
};

export default MovieCard;
