
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { supabase } from "../../db/Superbase-client";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (loginError) throw loginError;
      
      Cookies.set('token', data.session.access_token, { expires: 7 });
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/course');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginauth = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { 'Authorization': `Bearer ${tokenResponse.access_token}` }
        }).then(res => res.json());
        
        Cookies.set('token', tokenResponse.access_token, { expires: 1 });
        localStorage.setItem('user', JSON.stringify(userInfo));
        navigate('/course');
      } catch (err) {
        setError('Failed to get user info');
      }
    },
    onError: () => setError('Google login failed'),
  });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Welcome Back!</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <button 
          onClick={() => loginauth()} 
          disabled={loading}
          className="w-full bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-slate-900 transition mb-4"
        >
          Sign in with Google 🚀
        </button>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-neutral-700 font-bold">Email</label>
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
            <label htmlFor="password" className="block text-neutral-700 font-bold">Password</label>
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
          <p className="text-neutral-600">Don't have an account? <Link to="/signup" className="text-neutral-900 font-semibold">Sign Up</Link></p>
          <p className="text-neutral-600 mt-2"><Link to="/forgot-password" className="text-neutral-900 font-semibold">Forgot my password</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
