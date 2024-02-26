import { useEffect, useState } from "react";
import { fetchDiscover } from "../../Utils/FetchAPI";
import { useNavigate } from "react-router-dom";

const SliderGenre = () => {
  const navigate = useNavigate();
  const [genreValue, setGenreValue] = useState("");
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    setGenreValue(""); ///////
    async function fetching() {
      const res = await fetchDiscover(genreValue);
      setGenre(res.results);
    }
    fetching();
    genreValue.length !== 0 &&
      navigate(`/genres/${genreValue}`, {
        state: { search: genre, searchValue: genreValue },
      });
  }, [genreValue]);

  return <div className='py-1 px-2 rounded-md'></div>;
};

export default SliderGenre;
