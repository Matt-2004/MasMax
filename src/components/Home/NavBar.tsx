import {
  AngleRightIcon,
  FilmIcon,
  MenuIcon,
  SearchIcon,
  TicketIcon,
  Xicon,
} from "@/icons/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IItems {
  [item: string]: IItem;
}

interface IItem {
  id: number;
  path: string;
  icon: React.ReactNode;
  subMenu?: string[];
}

interface ExpandedState {
  [key: number]: boolean;
}

const NavBar = () => {
  const navigate = useNavigate();
  const navbarItems: IItems = {
    Movies: {
      id: 1,
      path: "/",
      icon: <FilmIcon />,
      subMenu: [
        "Popular Movies",
        "Trending Movies",
        "Upcoming Movies",
        "Top Rated Movies",
        "Now Playing Movies",
      ],
    },
    Series: { id: 2, path: "/", icon: <FilmIcon /> },

    Tickets: { id: 3, path: "/", icon: <TicketIcon /> },
  };
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeDrop, setActiveDrop] = useState<string>("Movies");
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedMenus, setExpandedMenus] = useState<ExpandedState>({
    1: false,
    2: false,
    3: false,
  });
  function handleMenu() {
    setActiveMenu(!activeMenu);
  }

  const toggleMenu = (id: number) => {
    setExpandedMenus((prevState) => {
      // Create a new state object with the specific menu item set to true
      const newState = Object.keys(prevState).reduce(
        (acc, key) => {
          acc[Number(key)] = Number(key) === id;
          return acc;
        },
        {} as { [key: number]: boolean }
      );

      return newState;
    });
  };
  return (
    <section className=' w-full h-[3.5rem] items-center flex justify-between '>
      <div className='flex items-center gap-6 ml-4'>
        <div onClick={handleMenu} className='h-5 w-5 sm:hidden mb-1'>
          <MenuIcon />
        </div>
        <h1 className='text-3xl font-semibold font-roboto text-[#2eade7]'>
          MASMAX
        </h1>
      </div>
      <div className='flex items-center gap-6'>
        <div onClick={() => setActiveSearch(true)}>
          <SearchIcon />
        </div>
        <div className='mr-4 text-[0.95rem] font-roboto font-semibold text-white'>
          Sign In
        </div>
      </div>

      {activeMenu && (
        <div className='fixed inset-0 bg-gradient-to-br from-transparent to-black/50' />
      )}
      <div
        aria-disabled={activeSearch}
        className={`w-screen h-[3.5rem] bg-[#26262e] ${
          activeSearch ? "translate-y-0" : "-translate-y-full"
        } transition-all duration-200 ease-in-out absolute`}
      >
        <form className='flex justify-around h-full items-center '>
          <input
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            type='text'
            className='w-[80%] h-[2.3rem] outline-none px-3 font-roboto bg-[#26262e] text-white'
            placeholder='Search'
          />
          <div onClick={() => setActiveSearch(false)}>
            <Xicon />
          </div>
        </form>
      </div>
      <div
        className={`absolute z-50 bg-[#26262e] ${
          activeMenu ? "translate-x-0 " : "-translate-x-full "
        }  top-0 w-[70%] h-full transition-all duration-200 ease-in-out`}
      >
        <div className='w-full h-screen '>
          <div
            onClick={handleMenu}
            className='flex justify-end h-[2.9rem] items-center bg-[#2eade7] pr-4'
          >
            <Xicon />
          </div>
          <div className='font-roboto  text-sm text-white mt-2'>
            {Object.entries(navbarItems).map(([itemName, item], i) => (
              <div
                key={i}
                id={itemName}
                onClick={(e) => {
                  navigate(item.path),
                    setActiveDrop(e.currentTarget.id),
                    toggleMenu(item.id);
                }}
                className=' flex justify-between h-10 items-center px-4 '
              >
                <div
                  className={`font-medium text-base ${
                    activeDrop === itemName ? "text-white" : "text-[#B0B0B8]"
                  } flex gap-4 h-10 items-center`}
                >
                  {item.icon}
                  {itemName}
                </div>
                <div
                  className={`transform ${
                    activeDrop === itemName ? "opacity-100" : " opacity-70"
                  } ${
                    expandedMenus[item.id] ? "rotate-90" : "-rotate-90"
                  } transition-transform duration-200 ease-in-out`}
                >
                  <AngleRightIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface IMovieList {
  [key: string]: string[];
}

const DropDownMenu = () => {
  const MenuList: IMovieList = {
    Movies: [],
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className='relative  text-left '>
      {/* Dropdown Toggle Button */}
      <button
        onClick={toggleDropdown}
        className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      >
        Options
      </button>

      {/* Dropdown Menu */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ transformOrigin: "top left" }}
      >
        <div className='py-1'>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Account settings
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Support
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            License
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
