import { lazy, Suspense } from "react";
import NavBar from "./NavBar";

const MovieCards = lazy(() => import("../Cards/MovieCards"));

const Home = () => {
  return (
    <div className='bg-[#26262e] dark:bg-[#dff2fa] '>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <MovieCards />
      </Suspense>
    </div>
  );
};

export default Home;
