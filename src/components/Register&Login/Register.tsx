import { useEffect, useState } from "react";
import Button from "./Button";
import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";
import GoogleAuth from "./FireBaseAuth";
import CloseCircleFilled from "@ant-design/icons/CloseCircleFilled";
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import { userRegex, passwordRegex, emailRegex } from "./Requirement";

const Register = () => {
  const [username, setUsername] = useState("");
  const [userIcon, setUserIcon] = useState(
    <CloseCircleFilled className='text-red-600' />
  );
  const [userNameValid, setUserNameValid] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailIcon, setEmailIcon] = useState(
    <CloseCircleFilled className='text-red-600' />
  );
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const [password, setPasswrod] = useState<string>("");
  const [passwordIcon, setPasswordIcon] = useState(
    <CloseCircleFilled className='text-red-600' />
  );
  const [emailValid, setEmailValid] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);

  function regexCheck(
    regex: RegExp,
    value: string,
    setIcon: any,
    setValidation: any
  ) {
    if (regex.test(value)) {
      setIcon(<CheckCircleFilled className='text-green-600' />);
      setValidation(true);
    } else {
      setIcon(<CloseCircleFilled className='text-red-600' />);
    }
    // if regex true -> add greenTrueMark icon
    // if not -> add redWrongMark icon
  }

  useEffect(() => {
    regexCheck(userRegex, username, setUserIcon, setUserNameValid);
    console.log(username);
  }, [username]);

  useEffect(() => {
    regexCheck(passwordRegex, password, setPasswordIcon, setPasswordValid);
  }, [password]);

  useEffect(() => {
    regexCheck(emailRegex, email, setEmailIcon, setEmailValid);
  }, [email]);

  useEffect(() => {
    if (userNameValid && passwordValid && emailValid) {
      setLoading(true);
    }
  });

  useEffect(() => {});

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
      <span className=' italic text-center  text-white  font-titillium xl:text-8xl md:text-4xl max-sm:text-3xl font-semibold'>
        Create a new account
      </span>
      <InputContainer>
        <InputUI
          icon={userIcon}
          text='Username'
          type='string'
          onChange={(e) => {
            setUsername(e.currentTarget.value), console.log(typeof username);
          }}
        />
        <InputUI
          icon={emailIcon}
          text='Email'
          type='email'
          onChange={(e) => {
            setEmail(e.currentTarget.value), console.log(email);
          }}
        />
        <InputUI
          icon={passwordIcon}
          text='Password'
          type='password'
          onChange={(e) => setPasswrod(e.currentTarget.value)}
        />
        <Button
          text='Register'
          loading={loading}
          onClick={(e) => {
            registration(e), setBtnLoader(!btnLoader);
          }}
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
