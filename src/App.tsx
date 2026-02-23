import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Utils/ThemeContext";
import { UserProvider } from "./Utils/UserContext";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 10 } },
});

// Every route is a separate chunk — none of this code parses on initial load
const Home = lazy(() => import("./components/Home/Home"));
const Register = lazy(() => import("./components/Register&Login/Register"));
const Login = lazy(() => import("./components/Register&Login/Login"));
const MovieDetils = lazy(() => import("./components/Detils/MovieDetils"));
const MoviePage = lazy(() => import("./components/Search/SearchPage"));
const GenrePage = lazy(() => import("./components/Genres/GenrePage"));
const SeriesPage = lazy(() => import("./components/Series/SeriesPage"));
const SeriesDetils = lazy(() => import("./components/Series/SeriesDetils"));

const PageLoader = () => (
  <div className='progress'><div className='runner' /></div>
);

const elements = [
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/search/:searchId", element: <MoviePage /> },
  { path: "movie/:movieId", element: <MovieDetils /> },
  { path: "/genres/:genreId", element: <GenrePage /> },
  { path: "/series", element: <SeriesPage /> },
  { path: "/series/:seriesId", element: <SeriesDetils /> },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              {elements.map((ele, i) => (
                <Route
                  key={i}
                  path={ele.path}
                  element={
                    <Suspense fallback={<PageLoader />}>
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
