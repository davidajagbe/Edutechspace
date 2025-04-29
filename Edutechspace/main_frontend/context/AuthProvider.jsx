import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser) {
            setUser(storedUser);
            setIsAuthenticated(true);
          } else {
            await fetchProfile();
          }
        } catch (err) {
          console.error('Auth initialization error:', err);
          Cookies.remove('token');
          localStorage.removeItem('user');
          toast.error('Session expired. Please log in again.');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Logged in successfully!');
      navigate('/course');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to log in';
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', {
        name,
        email,
        password,
      });

      const { user, token } = response.data;
      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
      navigate('/course');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to sign up';
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (accessToken) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/auth/googleLogin', {
        access_token: accessToken,
      });

      const { user, token } = response.data;
      Cookies.set('token', token, { expires: 1 });
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Logged in with Google successfully!');
      navigate('/course');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to log in with Google';
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/auth/logout');
      Cookies.remove('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      Cookies.remove('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      toast.info('Logged out successfully (client-side).');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Profile loaded successfully!');
      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to load profile';
      toast.error(errorMsg);
      setIsAuthenticated(false);
      Cookies.remove('token');
      localStorage.removeItem('user');
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        googleLogin,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};