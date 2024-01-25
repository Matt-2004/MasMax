import { useEffect, useState } from "react";
import { Genres, fetchDiscover } from "../../Utils/FetchAPI";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const SliderGenre = ({ genres }: Genres) => {
  const navigate = useNavigate();
  const [genreValue, setGenreValue] = useState("");
  const [genre, setGenre] = useState([]);

  useEffect(() => {
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

  return (
    <div className='py-1 px-2 rounded-md'>
      <DropdownMenu>
        <DropdownMenuTrigger className='text-lg'>Genres</DropdownMenuTrigger>
        <DropdownMenuContent>
          {genres.map((genre) => (
            <div key={genre.id} onClick={() => setGenreValue(genre.name)}>
              <DropdownMenuItem>{genre.name}</DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SliderGenre;
