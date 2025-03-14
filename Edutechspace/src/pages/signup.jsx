// Signup.jsx
import { Link,useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const Signup = () => {
  const navigate = useNavigate();
  const onSuccess = credentialResponse => {
    // Decode the JWT credential to get user info
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded Signup Info:", decoded);
    // Store token in cookie
    Cookies.set('token', credentialResponse.credential, { expires: 1 });
    // Optionally, save user data locally
    localStorage.setItem('user', JSON.stringify(decoded));
    navigate('/course')
  };
  const onError = () => {
    console.log('Signup Failed!');
  };
  
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Create an Account</h2>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
        <form className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-neutral-700">Full Name</label>
            <input type="text" id="name" className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" placeholder="Enter your full name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-neutral-700">Email</label>
            <input type="email" id="email" className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" placeholder="Enter your email" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-700">Password</label>
            <input type="password" id="password" className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" placeholder="Create a password" required />
          </div>
          <button type="submit" className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-slate-900 transition">Sign Up</button>
        </form>
        <div className="text-center mt-4">
          <p className="text-neutral-600">Already have an account? <Link to="/login" className="text-neutral-900 font-semibold">Login</Link></p>
        </div>
      </div>
    </section>
  );
};
  
export default Signup;
