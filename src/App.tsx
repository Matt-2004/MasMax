import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const SignUp = lazy(() => import("./components/Register&login/SignUp"));
const SignIn = lazy(() => import("./components/Register&login/SignIn"));

const SeeMoreComs = lazy(() => import("./components/SeeMore/SeeMoreComs"));
const MovieDetils = lazy(() => import("./components/Detils/MovieDetils"));
const MoviePage = lazy(() => import("./components/Search/SearchPage"));
const GenrePage = lazy(() => import("./components/Genres/GenrePage"));

const elements = [
  { path: "/search/:searchId", element: <MoviePage /> },
  { path: "movie/:movieId", element: <MovieDetils /> },
  { path: "/seemore/page/:id", element: <SeeMoreComs /> },
  { path: "/genres/:genreId", element: <GenrePage /> },
  { path: "/register", element: <SignUp /> },
  { path: "/login", element: <SignIn /> },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {elements.map((ele) => (
          <Route
            path={ele.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {ele.element}
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
