import { useNavigate } from "react-router-dom";

export const useLocalStorage = (key: string) => {

  const navigate = useNavigate();

  const setItem = (value: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      navigate(`/movie/${value}`)
    } catch(error) {
      throw new Error("useLocalStorage error: setItem");
    }
  }

  const getItem = () => {
    try {
      const value = localStorage.getItem(key);
      return value && JSON.parse(value); 
    } catch(error) {
      throw new Error("useLocalStorage error: getItem");
    }
  }

  return {setItem , getItem};
}