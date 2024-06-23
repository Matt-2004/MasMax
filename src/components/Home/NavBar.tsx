import { useNavigate } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import { useState } from "react";

const NavBar = () => {
  return (
    <div className='w-[100%] bg-[#26262e]'>
      <div className='flex justify-between md:px-5 sm:px-3 max-sm:px-1 sm:h-14 max-sm:h-14 items-center '>
        <div className='flex items-center w-[25%] justify-around'>
          <LogoUI />
          <DropDownMenu />
        </div>

        <div className='bg-[#26262e] h-9 sm:gap-6 max-sm:gap-1 flex text-white'>
          <AutoComplete />
          <LoginUI />
        </div>
      </div>
    </div>
  );
};

function DropDownMenu() {
  const [dropdown, setDropDown] = useState<boolean>(false);
  return <div className='text-white font-roboto cursor-pointer'> Ticket</div>;
}

function LoginUI() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/register")}
      className='max-sm:hidden text-[#2eade7] px-2 h-[2.25rem] text-center rounded-sm font-medium hover:opacity-100'
    >
      <span className='text-md font-roboto font-medium px-[10px]'>Sign In</span>
    </button>
  );
}

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
