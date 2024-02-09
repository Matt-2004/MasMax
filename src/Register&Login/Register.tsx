import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className='flex  justify-center h-screen items-center w-[100%]'>
      <div className='bg-[#0FDDD6] relative  w-[400px] h-[530px] bg-opacity-10 rounded-t-md'>
        <Header />
        <Form />
        <CheckBox />
        <div className='flex justify-center mt-4'>
          <button className='text-[15px] hover:bg-opacity-85 rounded-sm font-semibold font-roboto text-white w-[356px] h-[43px] bg-[#0FDDD6]'>
            SIGN UP
          </button>
        </div>
        <div className='flex justify-center mt-9'>
          <div className='text-white text-[13px] font-roboto'>
            Have already an account?
            <span
              onClick={() => navigate("/login")}
              className='font-bold underline cursor-pointer'
            >
              Login Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckBox() {
  return (
    <div className='flex my-4'>
      <input type='checkbox' className='ml-6 w-3' id='agree' />
      <label
        htmlFor='agree'
        className='text-[13px] font-roboto font-medium text-white pl-2'
      >
        I agree all statements in{" "}
        <span className='underline hover:text-blue-500'>Terms of service</span>
      </label>
    </div>
  );
}

function Header() {
  return (
    <h1 className='flex justify-center font-roboto font-medium text-[40px] py-7 outline-none text-white'>
      Register
    </h1>
  );
}

function Form() {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  });
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-5'>
        <input
          ref={firstInputRef}
          type='text'
          className='w-[356px] h-[45px] outline-none rounded-md border border-[#9d9d9d] font-roboto placeholder:text-[14px] pl-4 placeholder:opacity-80'
          placeholder='Username'
        />
        <input
          type='email'
          className='w-[356px] h-[45px] outline-none rounded-md border border-[#9d9d9d] font-roboto placeholder:text-[14px] pl-4 placeholder:opacity-80'
          placeholder='Email'
        />
        <input
          type='password'
          className='w-[356px] h-[45px] outline-none rounded-md border border-[#9d9d9d] font-roboto placeholder:text-[14px] pl-4 placeholder:opacity-80'
          placeholder='Password'
        />
        <input
          type='password'
          className='w-[356px] h-[45px] outline-none rounded-md border border-[#9d9d9d] font-roboto placeholder:text-[14px] pl-4 placeholder:opacity-80'
          placeholder='Confirm Password'
        />
      </div>
    </div>
  );
}

export default Register;
