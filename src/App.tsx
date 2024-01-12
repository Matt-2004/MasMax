import Home from "./components/UI/Home/Home";
import NavBar from "./components/UI/Home/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MovieDetils from "./components/UI/Home/MovieDetils";
const MoviePage = lazy(() => import('./components/UI/Home/MoviePage'))

function App() {


  return (
    <BrowserRouter>
      <div className="bg-[#26262e] ">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchId" element={
        <Suspense fallback={<div>Loading...</div>}>
          <MoviePage />
        </Suspense>
        } />
        <Route path="movie/:movieId" element={<MovieDetils />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
