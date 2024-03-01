import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* DOCUMENTS

  main component -> Register 

  Register -> <Header /> 
           -> <Form /> -->       4 inputs 
                       -->       <CheckBox />  --     Props - Validation( that provide the btn to undisabled)   --->   <RegisterBtn />

*/

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className='flex  justify-center h-screen items-center w-[100%]'>
      <div className='bg-[#0FDDD6] relative overflow-hidden  w-[50rem] h-[40rem] flex flex-col justify-center items-center bg-opacity-10 rounded-md'>
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

  const [btnValid, setBtnValid] = useState(true);

  const firstInputRef = useRef<HTMLInputElement>(null);

  const userNameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setNameValid(userNameRegex.test(name));
    setEmailValid(emailRegex.test(email));
    setPasswordValid(passwordRegex.test(password));
    setCpwValid(password === cpw ? true : false);
  }, [email, name, password, cpw]);

  useEffect(() => {
    nameValid && emailValid && passwordValid && cpwValid
      ? setBtnValid(false)
      : setBtnValid(true);
  }, [emailValid, nameValid, passwordValid, cpwValid]);

  // Registration
  const handleRegister = async (e?: any) => {
    e.preventDefault();
    await axios.post("https://masmaxnode.onrender.com/register", {
      username: name,
      email: email,
      password: password,
    });
    navigate("/login");
  };

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
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            type='text'
            className='w-[22.25rem] h-[2.5rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
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
            className='w-[22.25rem] h-[2.5rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
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
            className='w-[22.25rem] h-[2.5rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
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
            className='w-[22.25rem] h-[2.5rem] outline-none rounded-sm border border-[#9d9d9d] font-roboto placeholder:text-[0.875rem] pl-4 placeholder:opacity-80'
            placeholder='Confirm Password'
          />
        </div>
      </form>
      <CheckBox handleRegister={handleRegister} btnValid={btnValid} />
    </>
  );
}

function CheckBox({ handleRegister, btnValid }: any) {
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const [click, setClick] = useState(false);
  const [checked, setChecked] = useState(Boolean);

  const toggleCheckBox = () => {
    if (checkBoxRef.current) {
      setChecked(checkBoxRef.current.checked);
    }
  };

  useEffect(() => {
    toggleCheckBox();
  }, [click]);

  return (
    <>
      <div className='flex mt-4'>
        <input
          type='checkbox'
          ref={checkBoxRef}
          className='ml-6 w-3'
          onClick={() => setClick(!click)}
          id='agree'
        />
        <label
          htmlFor='agree'
          className='text-[0.8rem] ml-2 font-roboto font-medium text-white'
        >
          I agree all statements in{" "}
          <span className='underline hover:text-blue-500'>
            Terms of service
          </span>
        </label>
      </div>
      <RegisterBtn
        handleRegister={handleRegister}
        btnValid={btnValid}
        checked={checked}
      />
    </>
  );
}

function RegisterBtn({ handleRegister, btnValid, checked }: any) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      btnValid && checked
        ? (btnRef.current.disabled = false)
        : (btnRef.current.disabled = true);
    }
  }, [btnValid, checked]);

  return (
    <div className='flex justify-center mt-4'>
      <button
        ref={btnRef}
        onClick={handleRegister}
        style={{
          opacity: btnValid && checked ? "1" : "0.5",
          cursor: btnValid && checked ? "pointer" : "",
        }}
        className='text-[0.94rem]  rounded-sm font-semibold font-roboto text-white w-[22.25rem] h-[2.7rem] bg-[#0FDDD6]'
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
