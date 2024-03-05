import { fetchSearchMovie } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  function checkIsMobile() {
    window.innerWidth <= 630 ? setIsMobile(true) : setIsMobile(false);
  }

  window.addEventListener("resize", checkIsMobile);

  useEffect(() => {
    checkIsMobile();
  }, []);

  useEffect(() => {
    async function fetching() {
      const res = await fetchSearchMovie(searchValue);
      setSearch(res);
    }
    fetching();
    isMobile; ///////////////
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
        <LogoUI />
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
                  id='search'
                  type='text'
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Search...'
                  className='py-1 bg-[#26262e] pl-3 '
                />
              </form>
            </div>
          </div>
          <button
            onClick={() => navigate("/register")}
            className='max-sm:hidden bg-[#2eade7] text-[#26262e] px-2 h-[2.25rem] text-center rounded-sm font-medium opacity-80 hover:opacity-100'
          >
            <span className='text-md font-titillium font-semibold px-1'>
              {" "}
              Login
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

function LogoUI() {
  const navigate = useNavigate();
  return (
    <h1
      onClick={() => navigate("/")}
      className='text-cener text-[#2eade7] font-roboto sm:text-4xl max-sm:text-3xl font-bold'
    >
      MASMAX
    </h1>
  );
}

export default NavBar;
