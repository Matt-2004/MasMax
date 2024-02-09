import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center shadow-md'>
      <div className='w-[1512px] h-[80px]  flex justify-between px-2 items-center drop-shadow-2xl'>
        <div className='font-roboto font-bold text-4xl text-white'>
          Mas
          <span className='text-[#0FDDD6]'>Max</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className='font-semibold shadow-cyan-500/50 shadow-lg text-white  text-lg  px-4 py-1.5 bg-[#0FDDD6]'
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default NavBar;
