import { useEffect, useState } from "react";
import Button from "./Button";
import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";
import GoogleAuth from "./FireBaseAuth";

const Register = () => {
  const userRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  const PasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;

  const [validate, setValidate] = useState<number>(0);

  const [username, setUsername] = useState<string>("");
  const [usernameErr] = useState<string>("*3 - 20 words");

  const [email, setEmail] = useState<string>("");
  const [emailErr] = useState<string>("");

  const [password, setPasswrod] = useState<string>("");
  const [passwordErr] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function regexCheck(regex: RegExp, value: string, error: string) {
    if (!regex.test(value)) {
      setError(error);
    } else {
      setValidate((v) => v + 1);
      setError("");
    }
  }

  useEffect(() => {
    regexCheck(userRegex, username, usernameErr);
  }, [username]);

  useEffect(() => {
    regexCheck(PasswordRegex, password, passwordErr);
  }, [password]);

  useEffect(() => {
    regexCheck(emailRegex, email, emailErr);
  }, [email]);

  useEffect(() => {
    if (validate === 3) {
      setError("");
    }
  }, [validate]);

  useEffect(() => {});
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
      <span className=' italic text-center  text-white  font-titillium xl:text-8xl max-sm:text-3xl font-semibold'>
        Create a new account
      </span>
      <InputContainer>
        <p className=' text-red-500'>{error}</p>
        <InputUI
          text='Username'
          type='string'
          onChange={(e) => setUsername(e.currentTarget.value)}
          onClick={() => {
            setError(usernameErr);
          }}
        />
        <InputUI
          text='Email'
          type='email'
          onChange={(e) => setEmail(e.currentTarget.value)}
          onClick={() => {
            setError(emailErr);
          }}
        />
        <InputUI
          text='Password'
          type='password'
          autoComplete='off'
          onChange={(e) => setPasswrod(e.currentTarget.value)}
          onClick={() => {
            setError(passwordErr);
          }}
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
        <GoogleAuth />
      </InputContainer>
    </FormUI>
  );
};

export default Register;
