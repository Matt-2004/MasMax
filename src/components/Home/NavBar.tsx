import { useNavigate } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import FilterUI from "../Cards/FilterUI";
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined";
import { useState } from "react";

const NavBar = () => {
  return (
    <div className='w-[100%] bg-[#26262e] relative'>
      <div className='flex justify-between md:px-5 sm:px-3 max-sm:px-1 sm:h-14 max-sm:h-14 items-center '>
        <LogoUI />
        <TicketUI />
        <div className='bg-[#26262e] h-9 sm:gap-6 max-sm:gap-1 flex text-white'>
          <AutoComplete />
          <LoginUI />
        </div>
      </div>
    </div>
  );
};

function TicketUI() {
  const labelType = [
    { label: "Buy", path: "/buy/:buyID" },
    { label: "Seat", path: "/seat_settings" },
    { label: "Checkout", path: "/checkout" },
  ];
  const [select, setSelect] = useState("Tickets");

  return (
    <div>
      <FilterUI
        FilterType={labelType}
        icon={<CaretDownOutlined />}
        select={select}
        setSelect={setSelect}
      />
    </div>
  );
}

function LoginUI() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/register")}
      className='max-sm:hidden bg-[#2eade7] text-[#26262e] px-2 h-[2.25rem] text-center rounded-sm font-medium opacity-80 hover:opacity-100'
    >
      <span className='text-md font-roboto font-medium px-[10px]'> Login</span>
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
