import { Suspense } from "react";
import SeeMore from "./SeeMore";

const SeeMoreComs = () => {
  const title = localStorage.getItem("title");

  return (
    <div className="w-[100%] bg-[#26262e] h-[10%] flex justify-center">
      <Suspense fallback={<span>Loading...</span>}>
        {title === "Popular" ? (
          <SeeMore title="Popular" />
        ) : (
          <SeeMore title="Top Rated" />
        )}
      </Suspense>
    </div>
  );
};

export default SeeMoreComs;
