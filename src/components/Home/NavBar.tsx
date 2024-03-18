import { useNavigate } from "react-router-dom";
import AutoComplete from "./AutoComplete";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className='w-[100%] bg-[#26262e] relative'>
      <div className='flex justify-between md:px-5 sm:px-3 max-sm:px-1 sm:h-14 max-sm:h-14 items-center '>
        <LogoUI />

        <div className='bg-[#26262e] h-9 sm:gap-6 max-sm:gap-1 flex text-white'>
          <AutoComplete />
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
