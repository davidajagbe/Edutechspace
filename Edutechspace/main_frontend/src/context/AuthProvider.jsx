import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../../db/Superbase-client';

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
        // Check Supabase session for Google-authenticated users
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('initializeAuth: Supabase session found:', session.user);
          await syncGoogleUser(session.user);
        } else {
          // Check for email-authenticated users via token
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
            console.log('initializeAuth: No token or session found.');
          }
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

  const syncGoogleUser = async (supabaseUser) => {
    try {
      // Upsert user to handle potential race conditions
      const { data: userData, error: upsertError } = await supabase
        .from('users')
        .upsert(
          {
            id: supabaseUser.id,
            name: supabaseUser.user_metadata.name || supabaseUser.email.split('@')[0],
            email: supabaseUser.email,
            picture: supabaseUser.user_metadata.picture || null,
            phone: supabaseUser.user_metadata.phone || null,
            ongoingcourses: 0,
            completedcourses: 0,
            password: null, // Google users don't have passwords
          },
          { onConflict: 'id' }
        )
        .select('id, name, email, picture, ongoingcourses, completedcourses, password, phone')
        .single();

      if (upsertError) {
        console.error('syncGoogleUser: Database upsert error:', upsertError.message);
        throw new Error(upsertError.message);
      }

      // Generate JWT token via backend
      const response = await axios.post('http://localhost:8000/api/auth/generate-token', {
        userId: userData.id,
      });

      const userInfo = response.data; // Includes id, name, email, picture, ongoingcourses, completedcourses, password, phone, token
      Cookies.set('token', userInfo.token, { expires: 7 });
      localStorage.setItem('token', userInfo.token);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      setIsAuthenticated(true);
      console.log('syncGoogleUser: User synced and token generated:', userInfo);
    } catch (err) {
      console.error('syncGoogleUser: Error:', err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });

      const userData = response.data;
      Cookies.set('token', userData.token, { expires: 7 });
      localStorage.setItem('token', userData.token);
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
      Cookies.set('token', userData.token, { expires: 7 });
      localStorage.setItem('token', userData.token);
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

  const googleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/course',
        },
      });

      if (error) {
        console.error('googleLogin: Supabase error:', error.message);
        toast.error('Failed to log in with Google');
        throw error;
      }
      // User data is synced in initializeAuth after redirect
    } catch (err) {
      console.error('googleLogin: Error:', err.message);
      toast.error('Failed to log in with Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/auth/logout');
      await supabase.auth.signOut();
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

      console.log('deleteAccount: API Response:', response.data);
      await supabase.auth.signOut();
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