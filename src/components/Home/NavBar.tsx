import { useNavigate } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import UserOutlined from "@ant-design/icons/UserOutlined";
import SunOutlined from "@ant-design/icons/SunOutlined";
import MoonOutlined from "@ant-design/icons/MoonOutlined";
import { useEffect, useState } from "react";
import MenuOutlined from "@ant-design/icons/MenuOutlined";

const NavBar = () => {
  return (
    <section className='w-[100%] bg-[#26262e] dark:bg-[#dff2fa]'>
      <div className='flex max-sm:px-5 justify-between md:px-5 sm:px-3 sm:h-14 max-sm:h-14 items-center '>
        <div className='flex items-center w-[23%] justify-around'>
          <LogoUI />
        </div>
        <DropDownMenu />
        <Menu />
        <div className='h-[100%] max-sm:hidden min-w-[24%] md:gap-2 sm:gap-1 max-sm:gap-1 flex text-white'>
          <AutoComplete />
          <DarkMode />
          <LoginUI />
        </div>
      </div>
    </section>
  );
};

function Menu() {
  return (
    <section className='sm:hidden max-sm:block'>
      <MenuOutlined className='text-white text-2xl' />
    </section>
  );
}

function DarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <section className='h-6 px-3 py-[0.5rem] mt-1 ml-3'>
      <div>
        {darkMode ? (
          <MoonOutlined
            onClick={toggleDarkMode}
            className='text-lg rounded-[50%] bg-[#26262e] px-[5px] py-[5px]'
          />
        ) : (
          <SunOutlined
            onClick={toggleDarkMode}
            className={`text-lg  text-yellow-700 rounded-2xl items-center bg-[#dff2fa] px-[5px] py-[5px]`}
          />
        )}
      </div>
    </section>
  );
}

function DropDownMenu() {
  const navigate = useNavigate();
  return (
    <div className='flex max-md:hidden'>
      <p
        onClick={() => navigate("/")}
        className='text-white px-6 py-[1rem] hover:dark:bg-gray-200 dark:text-black hover:bg-gray-600 font-roboto text-[1rem]  cursor-pointer'
      >
        Home
      </p>
      <p className='text-white px-6 py-[1rem] font-roboto hover:dark:bg-gray-200 dark:text-black hover:bg-gray-600 text-[1rem]  cursor-pointer'>
        Ticket
      </p>
    </div>
  );
}

function LoginUI() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/register")}
      className='max-sm:hidden text-[#2eade7] px-2 py-[1rem] h-[2.25rem] text-center rounded-sm font-medium hover:opacity-100'
    >
      <UserOutlined className='text-xl' />
    </button>
  );
}

function LogoUI() {
  const navigate = useNavigate();
  return (
    <h1
      onClick={() => navigate("/")}
      className='text-cener text-[#2eade7] font-museomoderno lg:text-[2.5rem] sm:text-4xl max-sm:text-4xl font-bold'
    >
      MASMAX
    </h1>
  );
}

export default NavBar;
