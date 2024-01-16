import { useRef, useState } from "react";
import { PropsMovies } from "../../Utils/FetchAPI";
import getImagePath from "../../Utils/GetImagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SliderMovie = ({ pm }: PropsMovies) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWidth = imageRef.current?.offsetWidth || 0;
  const [x, setX] = useState(0);

  const translater = {
    transform: `translateX(-${imageWidth * x}px)`,
  };

  function next() {
    if (x !== pm.length - 1) setX((x) => x + 1);
  }

  function prev() {
    if (x !== 0) setX((x) => x - 1);
  }

  // Problem

  /* 
  
  Want to do rating star tag that depend on vote_average from API
  But the data is too late to reach this function
  So I got empty array 

  */

  // const [star, setStar] =  useState([]);
  // function starRate(rate: number, index: number) {
  //   let count = 0;
  //   let arr: any = new Array(5);
  //   for(let i = 0 ; i < 5 ; i++) {
  //     if(rate > 1) {
  //       arr.push(2);
  //     } else if(rate === 1){
  //       arr.push(1);
  //     } else {
  //       arr.push(0);
  //     }
  //     count = rate - 2;
  //     rate = count;
  //   }
  //   setStar({...arr, [index]: arr});
  // }

  /* 
        PROBLEM
        
        Interval is continously running even reaching limit and 
        it does not clear even using clearInterval
  */

  // useEffect(() => {
  //   const int = setInterval(() => {
  //     if(x !== pm.length - 1) {
  //       setX(x => x + 1)
  //     } else {
  //       clearInterval(int);
  //     }
  //     console.log("intervalX" , x)
  //   }, 4000);
  //   return () => clearInterval(int)
  // }, [])

  return (
    <div className='cursor-pointer w-[100%] h-[700px] relative overflow-hidden'>
      <div className='absolute inset-0 z-40 h-full w-full bg-gradient-to-t from-gray-900/90 via-transparent to-transparent' />
      <div
        className='flex transition-transform ease-in-out duration-1000'
        style={translater}
      >
        {pm.map((upcome) => (
          <div key={upcome.id} className='flex-full'>
            <img
              ref={imageRef}
              alt='img'
              className=' brightness-50 object-cover object-top w-[100%] h-[800px]'
              src={getImagePath(upcome.backdrop_path)}
            />
            <div className='absolute top-[27%] h-[440px] w-[700px] pl-[140px] text-white'>
              <div className='relative'>
                <h2 className='text-3xl font-bold pb-4 pl-3'>
                  {upcome.original_title}
                </h2>
                <span className='absolute text-lg pl-3 leading-loose '>
                  {upcome.overview}
                  <div className=''>{upcome.vote_average}</div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute flex w-[100%] z-50 justify-between top-[50%]'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => prev()}
          className='bg-[#26262e] opacity-70 hover:opacity-100 text-[#2eade7]  mx-3 rounded-md px-3 py-3 '
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => next()}
          className=' bg-[#26262e] opacity-70 hover:opacity-100  mx-3 rounded-md px-3 py-3 text-[#2eade7]'
        />
      </div>
    </div>
  );
};

export default SliderMovie;
