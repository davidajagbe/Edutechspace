
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { supabase } from "../../db/Superbase-client";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      if (signupError) throw signupError;

      Cookies.set('token', data.session.access_token, { expires: 1 });
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/course');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      Cookies.set('token', credentialResponse.credential, { expires: 1 });
      localStorage.setItem('user', JSON.stringify(decoded));
      navigate('/course');
    } catch (err) {
      setError('Failed to process Google sign up');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Create an Account</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <div className="mb-4">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() => setError('Google signup failed')}
          />
        </div>
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-neutral-700">Full Name</label>
            <input 
              type="text" 
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-neutral-700">Email</label>
            <input 
              type="email" 
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-700">Password</label>
            <input 
              type="password" 
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" 
              placeholder="Create a password" 
              required 
              minLength={6}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-slate-900 transition"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-neutral-600">Already have an account? <Link to="/login" className="text-neutral-900 font-semibold">Login</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
