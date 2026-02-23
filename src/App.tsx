import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Utils/ThemeContext";
import { UserProvider } from "./Utils/UserContext";
import Home from "./components/Home/Home";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 10 } },
});

const Register = lazy(() => import("./components/Register&Login/Register"));
const Login = lazy(() => import("./components/Register&Login/Login"));
const MovieDetils = lazy(() => import("./components/Detils/MovieDetils"));
const MoviePage = lazy(() => import("./components/Search/SearchPage"));
const GenrePage = lazy(() => import("./components/Genres/GenrePage"));
const SeriesPage = lazy(() => import("./components/Series/SeriesPage"));

const elements = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/search/:searchId", element: <MoviePage /> },
  { path: "movie/:movieId", element: <MovieDetils /> },
  { path: "/genres/:genreId", element: <GenrePage /> },
  { path: "/series", element: <SeriesPage /> },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <BrowserRouter>
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
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
} export default App;
