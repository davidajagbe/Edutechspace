import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  const { login, googleLogin, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
    } catch (err) {
      // Errors are handled in AuthProvider with toast
    }
  };

  const loginauth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await googleLogin(tokenResponse.access_token);
        toast.success('Logged in with Google successfully!');
      } catch (err) {
        // Errors are handled in AuthProvider with toast
      }
    },
    onError: () => {
      toast.error('Google login failed.');
    },
  });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Welcome Back!</h2>
        <button
          onClick={() => loginauth()}
          disabled={loading}
          className="w-full bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-slate-900 transition mb-4"
        >
          Sign in with Google 🚀
        </button>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-neutral-700 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-700 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-slate-900 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-neutral-900 font-semibold">
              Sign Up
            </Link>
          </p>
          <p className="text-neutral-600 mt-2">
            <Link to="/forgot-password" className="text-neutral-900 font-semibold">
              Forgot my password
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;