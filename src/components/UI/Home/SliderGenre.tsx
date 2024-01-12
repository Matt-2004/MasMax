import { Genres } from "../../Utils/FetchAPI";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

// import GenreSkeletons from "./GenreSkeletons";

const SliderGenre = ({ genres }: Genres) => {
  return (
    <div className='py-1 px-2 rounded-md'>
      <DropdownMenu>
        <DropdownMenuTrigger>Genres</DropdownMenuTrigger>
        <DropdownMenuContent>
          {genres.map((genre) => (
            <DropdownMenuItem>{genre.name}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SliderGenre;
