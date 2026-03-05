import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/FirebaseConfig";
import { useUser } from "@/lib/UserContext";

const GoogleAuth = () => {
  const navigate = useNavigate();
  // UserContext listens to onAuthStateChanged automatically;
  // we just need to trigger navigate after sign-in.
  useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      // 1. Sign in with Google via Firebase popup
      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (err: any) {
      // Supabase OIDC not configured — fall back to Firebase-only session
      if (err?.message?.includes("IdP is not enabled")) {
        const fbUser = auth.currentUser;
        if (fbUser) {
          localStorage.setItem("user_id", fbUser.uid);
          localStorage.setItem("user_email", fbUser.email ?? "");
          localStorage.setItem("username", fbUser.displayName ?? fbUser.email ?? "");
          navigate("/");
          return;
        }
      }
      const msg = err?.code === "auth/popup-closed-by-user"
        ? "Sign-in popup was closed."
        : (err?.message ?? "Google sign-in failed. Please try again.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        <span className="text-gray-800 font-semibold text-sm font-roboto">
          {loading ? "Signing in…" : "Continue with Google"}
        </span>
      </button>
      {error && (
        <p className="text-red-400 text-xs font-roboto text-center">{error}</p>
      )}
    </div>
  );
};

export default GoogleAuth;

function GoogleIcon() {
  return (
    <>
      <svg
        className='w-6 h-6'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 326667 333333'
        shapeRendering='geometricPrecision'
        textRendering='geometricPrecision'
        imageRendering='optimizeQuality'
        fillRule='evenodd'
        clipRule='evenodd'
      >
        <path
          d='M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z'
          fill='#4285f4'
        />
        <path
          d='M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z'
          fill='#34a853'
        />
        <path
          d='M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z'
          fill='#fbbc04'
        />
        <path
          d='M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z'
          fill='#ea4335'
        />
      </svg>
    </>
  );
}
