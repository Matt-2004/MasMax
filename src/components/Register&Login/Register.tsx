import { supabase } from "@/Utils/SupabaseConfig";
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import CloseCircleFilled from "@ant-design/icons/CloseCircleFilled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import GoogleAuth from "./FireBaseAuth";
import FormUI from "./FormUI";
import { emailRegex, passwordRegex, userRegex } from "./helper";
import InputUI, { InputContainer } from "./InputUI";

type ValidationIcon = React.ReactElement;

const INVALID = <CloseCircleFilled className="text-red-500" />;
const VALID = <CheckCircleFilled className="text-green-500" />;

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
    setValid: (v: boolean) => void
  ) {
    if (regex.test(value)) {
      setIcon(VALID);
      setValid(true);
    } else {
      setIcon(INVALID);
      setValid(false);
    }
  }

  useEffect(() => { regexCheck(userRegex, username, setUserIcon, setUserNameValid); }, [username]);
  useEffect(() => { regexCheck(emailRegex, email, setEmailIcon, setEmailValid); }, [email]);
  useEffect(() => { regexCheck(passwordRegex, password, setPasswordIcon, setPasswordValid); }, [password]);

  const allValid = userNameValid && emailValid && passwordValid;

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!allValid) {
      setError("Please fix the validation errors before continuing.");
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
        setSuccess("Account created! Check your email to confirm your address.");
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
            error={email && !emailValid ? "Enter a valid email address" : undefined}
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
                  className="text-white/40 hover:text-white/80 transition-colors text-xs font-roboto ml-1"
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
            <span className="text-white/30 text-xs font-roboto">or sign up with</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <GoogleAuth />

          <p className="text-center font-roboto text-white/45 text-sm mt-6">
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
