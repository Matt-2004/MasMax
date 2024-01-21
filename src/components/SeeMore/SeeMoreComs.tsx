import { Suspense, useEffect, useState } from "react";
import SeeMore from "./SeeMore";

const SeeMoreComs = () => {
  const [isPopular, setIsPopular] = useState(false);
  const title = localStorage.getItem("title");

  useEffect(() => {
    title === "Popular" ? setIsPopular(true) : setIsPopular(false);
  }, []);

  return (
    <div className='w-[100%] bg-[#26262e] h-[10%] flex justify-center'>
      <Suspense fallback={<span>Loading...</span>}>
        {isPopular ? (
          <SeeMore title='Popular' />
        ) : (
          <SeeMore title='Top Rated' />
        )}
      </Suspense>
    </div>
  );
};

export default SeeMoreComs;
