import { useLocation } from "react-router-dom";

export const useLastGetLocation = () => {
  const location = useLocation();
  const fullPathname = location.pathname;
  const pathnameSegments = fullPathname.split("/");
  const lastPathSegment = pathnameSegments[pathnameSegments.length - 1];
  return lastPathSegment;
};
