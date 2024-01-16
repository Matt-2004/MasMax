import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const SeeMoreComs = lazy(() => import("./components/SeeMore/SeeMoreComs"));
const MovieDetils = lazy(() => import("./components/SeeMore/MovieDetils"));
const MoviePage = lazy(() => import("./components/NavBar/MoviePage"));

function App() {
  return (
    <BrowserRouter>
      <div className='bg-[#26262e] '>
        <NavBar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/search/:searchId'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MoviePage />
            </Suspense>
          }
        />
        <Route
          path='movie/:movieId'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetils />
            </Suspense>
          }
        />
        <Route
          path='/seemore/page/:id'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SeeMoreComs />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
