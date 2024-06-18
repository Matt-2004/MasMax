import { useState } from "react";
import Button from "./Button";
import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";

const Register = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPasswrod] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const registration = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("https://auth-2ngh.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Registration Failed!");
      }
      console.log("Registration success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormUI>
      <div className='w-[100%] flex justify-evenly h-[100%] items-center'>
        <span className='italic text-center mb-10 text-white w-[30%] font-titillium text-8xl font-semibold'>
          Create a new account
        </span>
        <InputContainer>
          <InputUI
            text='Username'
            type='string'
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <InputUI
            text='Email'
            type='email'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <InputUI
            text='Password'
            type='password'
            autoComplete='off'
            onChange={(e) => setPasswrod(e.currentTarget.value)}
          />
          <Button
            text='Register'
            loading={loading}
            onClick={(e) => registration(e)}
          ></Button>
          <div className='text-center font-roboto text-white mt-5'>
            Have an accout?{" "}
            <a href='/login' className='underline text-[#2eade7]'>
              Login here.
            </a>
          </div>
        </InputContainer>
      </div>
    </FormUI>
  );
};

export default Register;
