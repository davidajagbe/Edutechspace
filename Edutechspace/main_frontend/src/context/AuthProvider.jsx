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

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      console.log('initializeAuth: Starting');
      try {
        const token = Cookies.get('token');
        console.log('initializeAuth: Initial token:', token);

        if (token) {
          try {
            const userData = localStorage.getItem('user');
            const storedUser = userData ? JSON.parse(userData) : null;
            if (storedUser) {
              setUser(storedUser);
              setIsAuthenticated(true);
              console.log('initializeAuth: User set from localStorage:', storedUser);
            } else {
              console.log('initializeAuth: No user in localStorage, fetching profile...');
              await fetchProfile();
              console.log('initializeAuth: fetchProfile completed');
            }
          } catch (err) {
            console.error('initializeAuth: Error parsing localStorage or fetching profile:', err);
            Cookies.remove('token');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            toast.error('Session expired. Please log in again.');
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          console.log('initializeAuth: No token found.');
        }
      } catch (err) {
        console.error('initializeAuth: Unexpected error:', err);
        toast.error('An error occurred during authentication.');
      } finally {
        setLoading(false);
        console.log('initializeAuth: Finished');
      }
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

      const userData = response.data;
      Cookies.set('token', response.data.token, { expires: 7 });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      toast.success('Logged in successfully!');
      navigate('/course');
      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to log in';
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, phone = '') => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', {
        name,
        email,
        phone,
        password,
      });

      const userData = response.data;
      Cookies.set('token', response.data.token, { expires: 7 });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
      navigate('/course');
      return userData;
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

      const userData = response.data;
      Cookies.set('token', response.data.token, { expires: 1 });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      toast.success('Logged in with Google successfully!');
      navigate('/course');
      return userData;
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
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (err) {
      console.error('logout: Error:', err);
      Cookies.remove('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
    console.log('fetchProfile: Started');
    try {
      const token = Cookies.get('token');
      console.log('fetchProfile: Token:', token);

      if (!token) {
        throw new Error('No token found');
      }

      console.log('fetchProfile: Making API request...');
      const response = await axios.get('http://localhost:8000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('fetchProfile: API Response:', response.data);
      const userData = response.data;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      console.log('fetchProfile: User set and stored in localStorage:', userData);
      toast.success('Profile loaded successfully!');
      return userData;
    } catch (err) {
      console.error('fetchProfile: Error:', err);
      console.error('fetchProfile: Error Details:', err.response || err);
      const errorMsg = err.response?.data?.error || 'Failed to load profile';
      toast.error(errorMsg);
      setIsAuthenticated(false);
      Cookies.remove('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
      console.log('fetchProfile: Finished');
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    console.log('deleteAccount: Started');
    try {
      const token = Cookies.get('token');
      console.log('deleteAccount: Token:', token);

      if (!token) {
        throw new Error('No token found');
      }

      console.log('deleteAccount: Making API request...');
      const response = await axios.delete('http://localhost:8000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(' ._deleteAccount: API Response:', response.data);
      Cookies.remove('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Account deleted successfully.');
      navigate('/');
    } catch (err) {
      console.error('deleteAccount: Error:', err);
      console.error('deleteAccount: Error Details:', err.response || err);
      const errorMsg = err.response?.data?.error || 'Failed to delete account';
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
      console.log('deleteAccount: Finished');
    }
  };

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    signup,
    login,
    logout,
    googleLogin,
    fetchProfile,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};