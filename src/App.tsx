import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./index.css";
import NavBar from "./components/Home/NavBar";

const Register = lazy(() => import("./components/Register&Login/Register"));
const Login = lazy(() => import("./components/Register&Login/Login"));
const MovieDetils = lazy(() => import("./components/Detils/MovieDetils"));
const MoviePage = lazy(() => import("./components/Search/SearchPage"));
const GenrePage = lazy(() => import("./components/Genres/GenrePage"));
const Buy = lazy(() => import("./components/Tickets/Buy"));
const Settings = lazy(() => import("./components/Tickets/Settings"));
const Checkout = lazy(() => import("./components/Tickets/Checkout"));

const elements = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/search/:searchId", element: <MoviePage /> },
  { path: "movie/:movieId", element: <MovieDetils /> },
  { path: "/genres/:genreId", element: <GenrePage /> },
  { path: "/buy/:buyID", element: <Buy /> },
  { path: "/seat_settings", element: <Settings /> },
  { path: "/checkout", element: <Checkout /> },
];

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        {elements.map((ele, i) => (
          <Route
            key={i}
            path={ele.path}
            element={
              <Suspense
                fallback={
                  <div className='progress'>
                    <div className='runner'></div>
                  </div>
                }
              >
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
