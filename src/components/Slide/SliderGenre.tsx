import { Genres } from "../../Utils/FetchAPI";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SliderGenre = ({ genres }: Genres) => {
  return (
    <div className='py-1 px-2 rounded-md'>
      <DropdownMenu>
        <DropdownMenuTrigger className='text-lg'>Genres</DropdownMenuTrigger>
        <DropdownMenuContent>
          {genres.map((genre) => (
            <div key={genre.id}>
              <DropdownMenuItem>{genre.name}</DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SliderGenre;
