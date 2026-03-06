import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./lib/ThemeContext";
import { UserProvider } from "./lib/UserContext";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 10 },
  },
});

// Every route is a separate chunk — none of this code parses on initial load
const Home = lazy(() => import("./components/layout/Home"));
const Register = lazy(() => import("./components/auth/Register"));
const Login = lazy(() => import("./components/auth/Login"));
const MovieDetails = lazy(() => import("./components/details/MovieDetails"));
const MoviePage = lazy(() => import("./components/search/SearchPage"));
const GenrePage = lazy(() => import("./components/genres/GenrePage"));
const SeriesPage = lazy(() => import("./components/series/SeriesPage"));
const SeriesDetails = lazy(() => import("./components/series/SeriesDetails"));
const MoviesPage = lazy(() => import("./components/movies/MoviesPage"));

const PageLoader = () => (
  <div className="progress">
    <div className="runner" />
  </div>
);

const elements = [
  { path: "/", element: <Home /> },
  { path: "/movies", element: <MoviesPage /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/search/:searchId", element: <MoviePage /> },
  { path: "movie/:movieId", element: <MovieDetails /> },
  { path: "/genres/:genreId", element: <GenrePage /> },
  { path: "/series", element: <SeriesPage /> },
  { path: "/series/:seriesId", element: <SeriesDetails /> },
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
                    <Suspense fallback={<PageLoader />}>{ele.element}</Suspense>
                  }
                />
              ))}
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
