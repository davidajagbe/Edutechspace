// Login.jsx
import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

const Login = () => {
  const loginauth = useGoogleLogin({
    onSuccess: tokenResponse => {
      // Fetch user info using the access token
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { 'Authorization': `Bearer ${tokenResponse.access_token}` }
      })
        .then(res => res.json())
        .then(data => {
          console.log("User Info:", data);
          // Store access token in cookie for JWT purposes
          Cookies.set('token', tokenResponse.access_token, { expires: 1 });
          // Optionally, save user data locally
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(err => console.error("Failed to fetch user info:", err));
    },
    onError: errorResponse => console.log('Login Failed:', errorResponse),
  });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Welcome Back!</h2>
        <button 
          onClick={() => loginauth()} 
          className="w-full bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-slate-900 transition mb-4"
        >
          Sign in with Google 🚀
        </button>
        <form className="space-y-4">
          <div>
            <label htmlFor="contact-info" className="block text-neutral-700 font-bold">Email or Phone No.</label>
            <input type="text" id="contact-info" className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" placeholder="Enter your email or phone number" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-700 font-bold">Password</label>
            <input type="password" id="password" className="border border-neutral-300 p-3 rounded-lg w-full focus:ring focus:ring-neutral-400" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-slate-900 transition">Login</button>
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
