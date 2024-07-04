import { lazy, Suspense } from "react";

const MovieCards = lazy(() => import("../Cards/MovieCards"));

const Home = () => {
  return (
    <div className='bg-[#26262e] dark:bg-[#dff2fa] '>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieCards />
      </Suspense>
    </div>
  );
};

export default Home;
