import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://auth-2ngh.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login Failed!");
      }
      setInterval(() => {
        setLoading(false);
        navigate("/");
      }, 1500);

      console.log("Login success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormUI>
      <div className='w-[100%] flex justify-evenly h-[100%] items-center'>
        <span className='italic text-center mb-10 text-white w-[30%] font-titillium text-8xl font-semibold'>
          Login
        </span>
        <InputContainer>
          <InputUI
            text='Email'
            type='email'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <InputUI
            text='Password'
            type='password'
            autoComplete='off'
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button
            text='Login'
            loading={loading}
            onClick={(e) => login(e)}
          ></Button>
          <div className='text-center font-roboto text-white mt-5'>
            Dont' have an accout?{" "}
            <a href='/register' className='underline text-[#2eade7]'>
              Register here.
            </a>
          </div>
        </InputContainer>
      </div>
    </FormUI>
  );
};

export default Login;
