import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className='flex  justify-center h-screen items-center w-[100%]'>
      <div className='bg-[#0FDDD6] relative  w-[50rem] h-[40rem] flex flex-col justify-center items-center bg-opacity-10 rounded-t-md'>
        <h1 className='flex mt-7 justify-center text-[2.5rem] font-medium text-white font-roboto'>
          Login
        </h1>
        <LoginForm />
        <div className='flex  justify-center my-4'>
          <div className='flex justify-between w-[22.25rem] h-[3.125rem] items-center'>
            <div className='w-[6.25rem] h-[1px] border' />
            <span className='font-roboto text-[13px] font-medium text-white'>
              or Sign Up Using
            </span>
            <div className='w-[6.25rem] h-[1px] border' />
          </div>
        </div>
        <GoogleBtn />

        <div className='text-white text-[0.8rem] mt-10 font-roboto flex justify-center '>
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
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async (e?: any) => {
    e.preventDefault();
    await axios.post(
      "https://masmaxnode.onrender.com/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    await axios
      .post(
        "https://masmaxnode.onrender.com/verification",
        {
          email,
        },
        { withCredentials: true }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <div className='flex flex-col items-center'>
        <input
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          className='w-[22.25rem] h-[2.68rem] mt-7 border-[#9d9d9d] border rounded-sm pl-5 outline-none placeholder:text-[0.875rem] placeholder:font-roboto'
          placeholder='Email'
        />
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className='w-[22.25rem] h-[2.68rem] mt-6 border-[#9d9d9d] border rounded-sm pl-5 outline-none placeholder:text-[0.875rem] placeholder:font-roboto'
          placeholder='Password'
        />
      </div>
      <div className='ml-5 mt-3 flex'>
        <input type='checkbox' id='rm' className='cursor-pointer' />
        <label
          htmlFor='rm'
          className='font-roboto cursor-pointer font-medium text-white text-[0.812rem] ml-2'
        >
          Remember Me
        </label>
      </div>
      <div className='flex justify-center mt-3'>
        <button
          onClick={handleLogin}
          className='text-[0.93rem] hover:bg-opacity-85 rounded-sm font-bold font-roboto text-white w-[22.25rem] h-[2.68rem] bg-[#0FDDD6]'
        >
          SIGN IN
        </button>
      </div>
    </form>
  );
}

function GoogleBtn() {
  return (
    <div className='flex justify-center'>
      <button className='flex justify-center hover:bg-opacity-90 items-center text-[#9d9d9d] text-xl  rounded-sm font-bold font-roboto bg-white  w-[22.25rem] h-[2.68rem]'>
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
