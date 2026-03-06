import { supabase } from "@/lib/SupabaseConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import GoogleAuth from "./FireBaseAuth";
import FormUI from "./FormUI";
import { emailRegex, passwordRegex, userRegex } from "./helper";
import InputUI, { InputContainer } from "./InputUI";

type ValidationIcon = React.ReactElement;

/** Inline replacement for @ant-design/icons CloseCircleFilled */
function CloseCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="64 64 896 896"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      width="1em"
      height="1em"
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
    </svg>
  );
}

/** Inline replacement for @ant-design/icons CheckCircleFilled */
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="64 64 896 896"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      width="1em"
      height="1em"
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
    </svg>
  );
}

const INVALID = <CloseCircleIcon className="text-red-500" />;
const VALID = <CheckCircleIcon className="text-green-500" />;

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userIcon, setUserIcon] = useState<ValidationIcon>(INVALID);
  const [userNameValid, setUserNameValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailIcon, setEmailIcon] = useState<ValidationIcon>(INVALID);
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIcon, setPasswordIcon] = useState<ValidationIcon>(INVALID);
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function regexCheck(
    regex: RegExp,
    value: string,
    setIcon: (icon: ValidationIcon) => void,
    setValid: (v: boolean) => void,
  ) {
    if (regex.test(value)) {
      setIcon(VALID);
      setValid(true);
    } else {
      setIcon(INVALID);
      setValid(false);
    }
  }

  useEffect(() => {
    regexCheck(userRegex, username, setUserIcon, setUserNameValid);
  }, [username]);
  useEffect(() => {
    regexCheck(emailRegex, email, setEmailIcon, setEmailValid);
  }, [email]);
  useEffect(() => {
    regexCheck(passwordRegex, password, setPasswordIcon, setPasswordValid);
  }, [password]);

  const allValid = userNameValid && emailValid && passwordValid;

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!allValid) {
      setError("Please fix the validation errors before continuing.");
      return;
    }

    if (!supabase) {
      setError(
        "Email/password sign-up is not configured. Please use Google sign-in.",
      );
      return;
    }

    setLoading(true);
    try {
      const { data, error: sbError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });

      if (sbError) throw sbError;

      if (data.user) {
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("user_email", data.user.email ?? "");
        localStorage.setItem("username", username);
        setSuccess(
          "Account created! Check your email to confirm your address.",
        );
        setTimeout(() => navigate("/"), 2500);
      }
    } catch (err: any) {
      setError(err?.message ?? "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormUI title="Create account" subtitle="Join MASMAX today">
      <form onSubmit={register}>
        <InputContainer>
          <InputUI
            text="Username"
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={username ? userIcon : undefined}
            error={
              username && !userNameValid
                ? "3–20 chars, letters, numbers or underscores only"
                : undefined
            }
          />
          <InputUI
            text="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={email ? emailIcon : undefined}
            error={
              email && !emailValid ? "Enter a valid email address" : undefined
            }
          />
          <InputUI
            text="Password"
            type={showPass ? "text" : "password"}
            placeholder="Min 8 chars, upper, lower, number & symbol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <span className="flex items-center gap-1.5">
                {password ? passwordIcon : null}
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="text-white/65 hover:text-white transition-colors text-xs font-roboto ml-1"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </span>
            }
            error={
              password && !passwordValid
                ? "Min 8 chars with uppercase, lowercase, number & special char"
                : undefined
            }
          />

          {error && (
            <div className="mb-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-roboto">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-roboto">
              {success}
            </div>
          )}

          <Button text="Create Account" loading={loading} type="submit" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white/55 text-xs font-roboto">
              or sign up with
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <GoogleAuth />

          <p className="text-center font-roboto text-white/65 text-sm mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#2eade7] hover:text-[#60c8f5] font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>
        </InputContainer>
      </form>
    </FormUI>
  );
};

export default Register;
