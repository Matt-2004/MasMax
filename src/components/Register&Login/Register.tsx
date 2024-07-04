import { useState } from "react";
import Button from "./Button";
import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./../../Utils/FirebaseConfig";

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
          <GoogleAuth />
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

export function GoogleAuth() {
  async function handleGoogleLogin(e: any) {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.error(errorCode);
        const errorMessage = error.message;
        console.error(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(credential);
      });
    // ...
  }

  return (
    <section>
      <button
        onClick={(e) => handleGoogleLogin(e)}
        className='text-white px-2 py-2'
      >
        Google Login
      </button>
    </section>
  );
}
