import { supabase } from "@/lib/SupabaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import GoogleAuth from "./FireBaseAuth";
import FormUI from "./FormUI";
import InputUI, { InputContainer } from "./InputUI";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!supabase) {
      setError(
        "Email/password sign-in is not configured. Please use Google sign-in.",
      );
      return;
    }

    setLoading(true);
    try {
      const { data, error: sbError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (sbError) throw sbError;

      if (data.user) {
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("user_email", data.user.email ?? "");
        localStorage.setItem(
          "username",
          data.user.user_metadata?.username ?? data.user.email ?? "",
        );
      }

      navigate("/");
    } catch (err: any) {
      setError(err?.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormUI title="Welcome back" subtitle="Sign in to your MASMAX account">
      <form onSubmit={login}>
        <InputContainer>
          <InputUI
            text="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputUI
            text="Password"
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="text-white/40 hover:text-white/80 transition-colors text-xs font-roboto"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            }
          />

          <div className="flex justify-end -mt-2 mb-4">
            <button
              type="button"
              className="text-xs text-[#2eade7] hover:text-[#60c8f5] font-roboto transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-roboto">
              {error}
            </div>
          )}

          <Button text="Sign In" loading={loading} type="submit" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white/30 text-xs font-roboto">
              or continue with
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <GoogleAuth />

          <p className="text-center font-roboto text-white/45 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#2eade7] hover:text-[#60c8f5] font-semibold transition-colors"
            >
              Create one
            </button>
          </p>
        </InputContainer>
      </form>
    </FormUI>
  );
};

export default Login;
