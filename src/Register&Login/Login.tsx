import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='flex  justify-center h-screen items-center w-[100%]'>
      <div className='bg-[#0FDDD6] relative  w-[400px] h-[530px] bg-opacity-10 rounded-t-md'>
        <h1 className='flex mt-7 justify-center text-[2.5rem] font-medium text-white font-roboto'>
          Login
        </h1>
        <LoginForm />
        <div className='flex  justify-center my-4'>
          <div className='flex justify-between w-[356px] h-[50px] items-center'>
            <div className='w-[100px] h-[1px] border' />
            <span className='font-roboto text-[13px] font-medium text-white'>
              or Sign Up Using
            </span>
            <div className='w-[100px] h-[1px] border' />
          </div>
        </div>
        <GoogleBtn />

        <div className='text-white text-[13px] mt-10 flex justify-center '>
          Create an account?
          <span
            onClick={() => navigate("/register")}
            className='font-semibold underline hover:text-blue-300 cursor-pointer'
          >
            Register Here
          </span>
        </div>
      </div>
    </div>
  );
};

function LoginForm() {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  });
  return (
    <>
      <div className='flex flex-col items-center'>
        <input
          ref={firstInputRef}
          type='email'
          className='py-2 w-[90%] mt-7 border-[#9d9d9d] border rounded-sm pl-5 outline-none placeholder:text-[14px] placeholder:font-roboto'
          placeholder='Email'
        />
        <input
          type='password'
          className='py-2 w-[90%] mt-6 border-[#9d9d9d] border rounded-sm pl-5 outline-none placeholder:text-[14px] placeholder:font-roboto'
          placeholder='Password'
        />
      </div>
      <div className='ml-5 mt-3 flex'>
        <input type='checkbox' id='rm' className='cursor-pointer' />
        <label
          htmlFor='rm'
          className='font-roboto cursor-pointer font-medium text-white text-[13px] ml-2'
        >
          Remember Me
        </label>
      </div>
      <div className='flex justify-center mt-3'>
        <button className='text-[15px] hover:bg-opacity-85 rounded-sm font-bold font-roboto text-white w-[356px] h-[43px] bg-[#0FDDD6]'>
          SIGN IN
        </button>
      </div>
    </>
  );
}

function GoogleBtn() {
  return (
    <div className='flex justify-center'>
      <button className='flex justify-center hover:bg-opacity-90 items-center text-[#9d9d9d] text-xl  rounded-sm font-bold font-roboto bg-white  w-[356px] h-[43px]'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
          alt='google'
          className='w-[5rem] h-[2rem]'
        />
      </button>
    </div>
  );
}

export default Login;
