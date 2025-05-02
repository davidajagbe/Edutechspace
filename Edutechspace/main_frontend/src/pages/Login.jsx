import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Welcome Back!</h2>
        <div className="mb-4 space-y-2">
          <button
            onClick={() => googleLogin()}
            disabled={loading}
            className="w-full flex items-center justify-center border border-neutral-300 bg-white text-neutral-700 py-2 px-4 rounded-lg hover:bg-neutral-50 transition"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.649,9.486-11.854L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </button>
          <button
            disabled={true}
            className="w-full flex items-center justify-center border border-neutral-300 bg-white text-neutral-700 _

py-2 px-4 rounded-lg opacity-50 cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Continue with Facebook
          </button>
          <button
            disabled={true}
            className="w-full flex items-center justify-center border border-neutral-300 bg-white text-neutral-700 py-2 px-4 rounded-lg opacity-50 cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.05 20.4c-1.3.7-2.8.5-4-.4-1.2-.9-2.1-2.3-3.3-2.3-1.2 0-2.2 1.4-3.3 2.3-1.2.9-2.6 1.1-4 .4C1.2 19.7.6 18 1.2 16.1c.5-1.7 1.5-3.3 2.5-4.7C4.7 9.9 6 8.8 7.8 8.8c1.2 0 2 1.2 3.3 1.2 1.3 0 2-1.2 3.3-1.2 1.7 0 3 1 4 2.5.3.5.5 1 .7 1.5-.7.2-2.7 1-3.2 3.2-.3 1.4.1 2.7.8 3.7.4.6.9 1.2 1.5 1.7zm-1.2-17c-.7.9-1.8 1.4-2.8 1.4-.2 0-.4 0-.6-.1-.9-.3-1.8-1-2.5-1.7C9.2 2.3 8.8 1.3 8.8 0c0-.2 0-.4.1-.6.9.1 2 .6 2.8 1.4.7.7 1.2 1.8 1.2 2.8 0 .2 0 .4-.1.6z"
              />
            </svg>
            Continue with Apple
          </button>
        </div>
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-neutral-600">or</span>
          </div>
        </div>
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