import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const SignUp = () => {
  const [pwShower, setPwShower] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // For User Input
  // const [userName, setUserName] = useState("");
  // const [userNameValid, setUserNameValid] = useState(false);
  // // For Password Input
  // const [pw, setPw] = useState("");
  // const [pwValid, setPwValid] = useState(false);

  // // For Confirm Password Input
  // const [cpw, setCpw] = useState("");
  // const [cpwValid, setCpwValid] = useState(false);

  // const userNameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
  // const passwordRegex =
  //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  // useEffect(() => {
  //   userRef.current?.focus();
  //   if (userNameValid && pwValid && cpwValid) {
  //     submitBtnRef.current?.removeAttribute("disabled");
  //   }
  // });

  return (
    <div className='w-[100%] items-center m-0 bg-[#26262e] relative h-[100vh] flex justify-center '>
      <section className='border border-[#4682b4] rounded-sm bg-[#4682b4] py-4 px-3'>
        <form className='text-black'>
          <h1 className='text-4xl font-bold mb-7'>Register</h1>
          <div>
            <label htmlFor='userName' className='text-xl block'>
              Username :
            </label>
            <input
              ref={userRef}
              autoComplete='off'
              type='text'
              id='userName'
              className='bg-white outline-none pl-2 w-[290px] py-1 rounded-md mt-1 mb-2'
            />
          </div>
          <div className='relative'>
            <label htmlFor='pw' className='text-xl block'>
              Password :
            </label>
            <input
              type={pwShower ? "text" : "password"}
              id='pw'
              className='bg-white outline-none pl-2 w-[290px] py-1 rounded-md mt-1 mb-2'
            />

            <span
              onClick={() => setPwShower(!pwShower)}
              className='absolute left-[90%] top-[52%] text-[#2eade7]'
            >
              {pwShower ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
          <div>
            <label htmlFor='cpw' className='text-xl block'>
              Confirm Password :
            </label>
            <input
              type='password'
              id='cpw'
              className='bg-white outline-none pl-2 w-[290px] py-1 rounded-md mt-1 mb-2'
            />
          </div>
          <button
            ref={submitBtnRef}
            disabled
            // style={
            //   userNameValid && pwValid && cpwValid
            //     ? { opacity: "100%" }
            //     : { opacity: "40%" }
            // }
            className='w-[100%] mt-4 text-xl bg-[#2eade7] py-2 rounded-md'
          >
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
