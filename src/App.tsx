import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Register = lazy(() => import("./Register&Login/Register"));
const Login = lazy(() => import("./Register&Login/Login"));
const lazyPaths = [
  { path: "/register", element: <Register /> },
  {
    path: "/login",
    element: <Login />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {lazyPaths.map((p, index) => (
          <Route
            key={index}
            path={p.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>{p.element}</Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
