import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className='flex  justify-center h-screen items-center w-[100%]'>
      <div className='bg-[#0FDDD6] relative overflow-hidden  w-[25rem] h-[33.125rem] bg-opacity-10 rounded-t-md'>
        <Header />
        <Form />

        <div className='flex justify-center mt-9'>
          <div className='text-white text-[0.8rem] font-roboto'>
            Have already an account?
            <span
              onClick={() => navigate("/login")}
              className='font-bold underline cursor-pointer hover:text-blue-500'
            >
              Login Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [cpw, setCpw] = useState("");
  const [cpwValid, setCpwValid] = useState(false);
  const [cpwFocus, setCpwFocus] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);

  const userNameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  /*   --  Todo  -- 
  
  check validation for username, password, cpw 
  
  
  */

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // Registration
  const handleRegister = async (e?: any) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/db/register", {
      username: name,
      email: email,
      password: password,
    });
    navigate("/login");
  };

  // Valid the input
  return (
    <>
      <form onSubmit={handleRegister} className='flex justify-center'>
        <div className='flex flex-col gap-5'>
          <input
            onChange={(e) => setName(e.target.value)}
            style={{
              border: !nameValid && nameFocus ? "1px solid red" : "none",
            }}
            ref={firstInputRef}
            onFocus={() => setNameValid(true)}
            onBlur={() => setNameValid(false)}
            type='text'
            className='w-[22.25rem] h-[2.8rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
            placeholder='Username'
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: !emailValid && emailFocus ? "1px solid red" : "none",
            }}
            type='email'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className='w-[22.25rem] h-[2.8rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
            placeholder='Email'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border:
                !passwordValid && passwordFocus ? "1px solid red" : "none",
            }}
            type='password'
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            className='w-[22.25rem] h-[2.8rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
            placeholder='Password'
          />
          <input
            onChange={(e) => setCpw(e.target.value)}
            style={{
              border: !cpwValid && cpwFocus ? "1px solid red" : "none",
            }}
            type='password'
            onFocus={() => setCpwFocus(true)}
            onBlur={() => setCpwFocus(false)}
            className='w-[22.25rem] h-[2.8rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
            placeholder='Confirm Password'
          />
        </div>
      </form>
      <CheckBox />
      <RegisterBtn handleRegister={handleRegister} />
    </>
  );
}

function CheckBox() {
  return (
    <div className='flex my-4'>
      <input type='checkbox' className='ml-6 w-3' id='agree' />
      <label
        htmlFor='agree'
        className='text-[0.8rem] font-roboto font-medium text-white pl-2'
      >
        I agree all statements in{" "}
        <span className='underline hover:text-blue-500'>Terms of service</span>
      </label>
    </div>
  );
}

function RegisterBtn({ handleRegister }: any) {
  return (
    <div className='flex justify-center mt-4'>
      <button
        onClick={handleRegister}
        className='text-[0.94rem] hover:bg-opacity-85 rounded-sm font-semibold font-roboto text-white w-[22.25rem] h-[2.7rem] bg-[#0FDDD6]'
      >
        SIGN UP
      </button>
    </div>
  );
}

function Header() {
  return (
    <h1 className='flex justify-center font-roboto font-medium text-[2.5rem] py-6 outline-none text-white'>
      Register
    </h1>
  );
}

export default Register;
