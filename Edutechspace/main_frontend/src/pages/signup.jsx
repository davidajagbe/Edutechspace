import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Signup = () => {
  const { signup, googleLogin, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password, formData.phone);
      toast.success('Account created successfully!');
    } catch (err) {
      // Errors are handled in AuthProvider with toast
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      toast.success('Logged in with Google successfully!');
    } catch (err) {
      // Errors are handled in AuthProvider with toast
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Create an Account</h2>
        <div className="mb-4">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() => toast.error('Google login failed.')}
          />
        </div>
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-neutral-700">
              Full Name
            </label>
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
            <label htmlFor="email" className="block text-neutral-700">
              Email
            </label>
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
            <label htmlFor="phone" className="block text-neutral-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-700">
              Password
            </label>
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
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="text-neutral-900 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;