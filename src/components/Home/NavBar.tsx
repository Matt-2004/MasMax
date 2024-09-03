import {
  AngleRightIcon,
  FilmIcon,
  MenuIcon,
  SearchIcon,
  TicketIcon,
  TVIcon,
  Xicon,
} from "@/icons/icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IItems {
  [item: string]: IItem;
}

interface IItem {
  id: number;
  path: string;
  icon: React.ReactNode;
  subMenu: string[];
}

interface ExpandedState {
  [key: number]: boolean;
}

const NavBar = () => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  function handleMenu() {
    setActiveMenu(!activeMenu);
  }

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
      <SearchBar
        setActiveSearch={setActiveSearch}
        activeSearch={activeSearch}
      />

      <DropDownMenu activeMenu={activeMenu} handleMenu={handleMenu} />
    </section>
  );
};

interface IDropDownMenu {
  activeMenu: boolean;
  handleMenu: () => void;
}

const DropDownMenu = ({ activeMenu, handleMenu }: IDropDownMenu) => {
  const navigate = useNavigate();

  const [activeDrop, setActiveDrop] = useState<string>("Movies");
  const [activeItem, setActiveItem] = useState(null);

  const navbarItems: IItems = {
    Movies: {
      id: 1,
      path: "/",
      icon: <FilmIcon />,
      subMenu: [
        "Popular Movies",
        "Upcoming Movies",
        "Top Rated Movies",
        "Now Playing Movies",
      ],
    },
    Series: {
      id: 2,
      path: "/",
      icon: <TVIcon color='#fff' />,
      subMenu: [
        "Most Popular TV Shows",
        "Browse TV Shows by Genre",
        "Airing Today",
        "On The Air",
      ],
    },

    Tickets: { id: 3, path: "/", icon: <TicketIcon />, subMenu: ["1", "2"] },
  };

  const toggleMenu = (id: number) => {
    setActiveItem((prevActiveItem): any => (prevActiveItem === id ? null : id));
  };

  return (
    <div
      className={`absolute z-50 bg-[#26262e] ${
        activeMenu ? "translate-x-0 " : "-translate-x-full "
      }  top-0 w-[70%] min-h-screen transition-all duration-200 ease-in-out`}
    >
      <div className='w-full h-full '>
        <div
          onClick={handleMenu}
          className='flex justify-end h-[3.3rem] items-center bg-[#2eade7] pr-4'
        >
          <Xicon />
        </div>
        <div className='font-roboto h-full  text-sm text-white '>
          <div className='h-full'>
            {Object.entries(navbarItems).map(([itemName, item], i) => (
              <div
                key={i}
                id={itemName}
                onClick={(e) => {
                  navigate(item.path), setActiveDrop(e.currentTarget.id);
                }}
                className={`flex flex-col items-center `}
              >
                <button
                  onClick={() => toggleMenu(item.id)}
                  className='flex justify-between bg-tap-highlight  w-full items-center px-4 '
                >
                  <div
                    className={`font-medium text-base ${
                      activeDrop === itemName ? "text-white" : "text-[#B0B0B8]"
                    } flex gap-4 h-12 items-center  text-[1rem]`}
                  >
                    <p
                      className={`flex gap-6 text-lg items-center ${
                        activeDrop === itemName && activeItem === item.id
                          ? "text-[#2eade7]"
                          : ""
                      }`}
                    >
                      {item.icon}
                      {itemName}
                    </p>
                  </div>
                  <div
                    className={`transform ${
                      activeItem === item.id ? "rotate-90" : "-rotate-90"
                    } transition-transform duration-200 ease-in-out`}
                  >
                    <AngleRightIcon
                      color={
                        activeDrop === itemName && activeItem === item.id
                          ? "#2eade7"
                          : "#fff"
                      }
                    />
                  </div>
                </button>
                <div className='w-full flex justify-center'>
                  <ul
                    className={`w-[70%] flex flex-col justify-center items-start transition-all duration-100 ease-in overflow-hidden ${
                      activeDrop === itemName && activeItem === item.id
                        ? " max-h-full  py-4 "
                        : "max-h-0 "
                    } space-y-6`}
                  >
                    {item.subMenu?.map((menus, i) => (
                      <li key={i} className='text-[1rem]'>
                        {menus}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ISearchBar {
  setActiveSearch: Dispatch<SetStateAction<boolean>>;
  activeSearch: boolean;
}

const SearchBar = ({ setActiveSearch, activeSearch }: ISearchBar) => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
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
  );
};

export default NavBar;
