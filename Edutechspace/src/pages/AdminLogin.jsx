// AdminLogin.jsx
import { useState } from "react";
import { supabase } from "../../db/Superbase-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login"); // "login" or "google"

  // Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For debugging
      console.log("Attempting email login with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      console.log("Login successful:", data.user);
      toast.success("Login successful!");
      
      // Wait a bit before calling the success callback to ensure state updates are complete
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Form an absolute URL for the redirect that respects the current environment
      const redirectUrl = window.location.origin + window.location.pathname;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) throw error;
      
      // Note: we don't need to handle success here as the page will redirect
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google login failed");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
        Admin Login
      </h2>

      <div className="flex space-x-2 mb-4">
        <button
          className={`flex-1 text-center py-2 rounded-md transition ${
            mode === "login" 
              ? "bg-blue-950 text-white font-medium" 
              : "bg-gray-100 text-slate-600"
          }`}
          onClick={() => setMode("login")}
        >
          Email Login
        </button>
        <button
          className={`flex-1 text-center py-2 rounded-md transition ${
            mode === "google" 
              ? "bg-blue-950 text-white font-medium" 
              : "bg-slate-100 text-slate-600"
          }`}
          onClick={() => setMode("google")}
        >
          Google Login
        </button>
      </div>

      {mode === "login" ? (
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-950 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-slate-800 font-medium py-2 px-4 rounded-md transition flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#4285F4"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;