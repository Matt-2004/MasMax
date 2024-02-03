import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [pwShower, setPwShower] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const cpwdRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [name, setUserName] = useState("");
  const [userNameValid, setUserNameValid] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdValid, setPwdValid] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [cpwd, setCpwd] = useState("");
  const [cpwdValid, setCpwdValid] = useState(false);
  const [cpwdFocus, setCpwdFocus] = useState(false);

  useEffect(() => {
    if (userNameValid && pwdValid && cpwdValid) {
      submitBtnRef.current?.removeAttribute("disabled");
    }
  }, [userNameValid, pwdValid, cpwdValid]);

  useEffect(() => {
    USER_REGEX.test(name) ? setUserNameValid(true) : setUserNameValid(false);
    PWD_REGEX.test(pwd) ? setPwdValid(true) : setPwdValid(false);
    cpwd === pwd ? setCpwdValid(true) : setCpwdValid(false);
  }, [name, pwd, cpwd]);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  function handleRegister() {}

  function handleKeyPress(event: any) {
    if (event.key === "Enter") {
      !pwdValid ? pwdRef.current?.focus() : cpwdRef.current?.focus();
    }

    console.log("hello");
  }

  return (
    <div className="w-[100%] items-center m-0 bg-[#26262e] relative h-[100vh] flex justify-center ">
      <section className="border border-[#4682b4] rounded-sm bg-[#4682b4] py-4 px-3 w-[350px]">
        <form className="text-black">
          <h1 className="text-3xl font-bold mb-7">Register</h1>
          <div>
            <label htmlFor="userName" className="text-lg block">
              Username :
            </label>
            <input
              ref={userRef}
              autoComplete="off"
              type="text"
              id="userName"
              onChange={(e) => setUserName(e.target.value)}
              className="bg-white outline-none pl-2 w-[100%] py-1 rounded-md mt-1 mb-2"
              onKeyDown={handleKeyPress}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {!userNameValid && userFocus ? (
              <div className="text-red-600 text-sm">
                - 4 to 24 characters.
                <br />
                - Must begin with a letter.
                <br />- Letters, numbers, underscores, hyphens allowed.
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <label htmlFor="pw" className="text-lg block">
              Password :
            </label>
            <div className="bg-white py-1 px-2 rounded-md mb-3">
              <input
                ref={pwdRef}
                type={pwShower ? "text" : "password"}
                id="pw"
                className="bg-white outline-none inline w-[275px] pt-1"
                onChange={(e) => setPwd(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <span onClick={() => setPwShower(!pwShower)}>
                {pwShower ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
            {!pwdValid && pwdFocus ? (
              <div className="text-red-600 text-sm mt-2">
                - 8 to 24 characters.
                <br />
                - Must include uppercase and lowercase letters, a number and a
                special character.
                <br />- Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="cpw" className="text-lg block">
              Confirm Password :
            </label>
            <input
              ref={cpwdRef}
              type="password"
              id="cpw"
              className="bg-white outline-none pl-2 w-[100%] py-1 rounded-md mt-1 mb-2"
              onChange={(e) => setCpwd(e.target.value)}
              onFocus={() => setCpwdFocus(true)}
              onBlur={() => setCpwdFocus(false)}
              onPaste={(e) => e.preventDefault()}
            />
            {!cpwdValid && cpwdFocus ? (
              <div className="text-red-600 text-sm">
                - Must match the first password input field.
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            ref={submitBtnRef}
            disabled
            style={
              userNameValid && pwdValid && cpwdValid
                ? { opacity: "100%" }
                : { opacity: "40%" }
            }
            className="w-[100%] mt-4 mb-3 text-xl bg-[#2eade7] py-2 rounded-md"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        </form>
        <div
          className="text-yellow-500 text-sm cursor-pointer"
          onClick={() => navigate("/login")}
        >
          {" "}
          You already have a account? Click here.
        </div>
      </section>
    </div>
  );
};

export default SignUp;
