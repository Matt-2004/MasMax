import { fetchMovieGenres, fetchSearchMovie } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import SliderGenre from "../Genres/DropDownGenres";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/dropdown-menu";

const NavBar = () => {
  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  function checkIsMobile() {
    window.innerWidth <= 630 ? setIsMobile(true) : setIsMobile(false);
  }

  window.addEventListener("resize", checkIsMobile);

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetchMovieGenres();
      setGenres(res);
    }
    checkIsMobile();
    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetching() {
      const res = await fetchSearchMovie(searchValue);
      setSearch(res);
    }
    fetching();
  }, [searchValue]);

  function handleSearch(e: any) {
    e.preventDefault();
    navigate(`/search/${searchValue}`, {
      state: { search: search, searchValue: searchValue },
    });
  }

  return (
    <div className='w-[100%] bg-[#26262e] relative'>
      <div className='flex justify-between md:px-5 sm:px-3 max-sm:px-1 sm:h-14 max-sm:h-14 items-center '>
        <h1
          onClick={() => navigate("/")}
          className='text-cener text-[#2eade7] font-roboto sm:text-4xl max-sm:text-2xl font-bold'
        >
          MASMAX
        </h1>
        <div className='bg-[#26262e] h-9 sm:gap-6 max-sm:gap-1 flex text-white'>
          <div className='flex sm:flex-row-reverse gap-5'>
            <div className=''>
              <form
                onSubmit={(e) => {
                  handleSearch(e);
                }}
                className='flex h-[2.25rem] rounded-md items-center border border-gray-600'
              >
                <input
                  type='text'
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Search...'
                  className='py-1 bg-[#26262e] pl-3 '
                />
              </form>
            </div>
            {!isMobile && <GenresUI genres={genres} />}
          </div>

          <button
            onClick={() => navigate("/register")}
            className='max-sm:hidden bg-[#2eade7] text-[#26262e] px-2 h-[2.25rem] text-center rounded-sm font-medium opacity-80 hover:opacity-100'
          >
            <span className='text-md font-titillium font-semibold'> Login</span>
          </button>
          {isMobile && <SettingUI genres={genres} />}
        </div>
      </div>
    </div>
  );
};

function SettingUI({ genres }: any) {
  return (
    <div className='py-1 px-3 text-xl'>
      <DropdownMenu>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel></DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className='py-1 px-2'>Login</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GenresUI genres={genres} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function GenresUI({ genres }: any) {
  return (
    <div className=''>
      <SliderGenre genres={genres} />
    </div>
  );
}

export default NavBar;
