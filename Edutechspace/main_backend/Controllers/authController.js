import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';
import fetch from 'node-fetch';
import CookieToken from '../utils/CookieToken.js';

export const login = async (req, res) => {
  try {
    if (!req.body) {
      console.error('Login: Request body is missing');
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Login error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    const token = CookieToken(res, data.user.id);
    res.status(200).json({ user: data.user, token });
  } catch (err) {
    console.error('Login server error:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const signup = async (req, res) => {
  try {
    // Check if req.body exists
    if (!req.body) {
      console.error('Signup: Request body is missing');
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { name, email, phone, password } = req.body;
    console.log('Signup attempt:', { email, name, phone });

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Sign up user with Supabase Authentication
    const signupOptions = {
      email,
      password,
      options: { data: { name } },
    };
    if (phone) {
      signupOptions.phone = phone; // Add phone only if provided
    }

    const { data, error } = await supabase.auth.signUp(signupOptions);
    if (error) {
      console.error('Signup error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    // Insert user data into public.users table
    const { error: dbError } = await supabase.from('users').insert({
      id: data.user.id,
      name,
      email,
      phone: phone || null, // Insert null if phone is not provided
    });

    if (dbError) {
      console.error('Database insert error:', dbError.message);
      // Optionally, delete the auth user to keep auth and db in sync
      await supabase.auth.admin.deleteUser(data.user.id);
      return res.status(400).json({ error: 'Failed to save user data: ' + dbError.message });
    }

    const token = CookieToken(res, data.user.id);
    res.status(201).json({ user: data.user, token });
  } catch (err) {
    console.error('Signup server error:', err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    if (!req.body) {
      console.error('Google Login: Request body is missing');
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { access_token } = req.body;
    console.log('Google Login attempt with access_token:', access_token ? 'provided' : 'missing');

    if (!access_token) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    }).then((res) => res.json());

    if (userInfo.error) {
      console.error('Google API error:', userInfo.error);
      return res.status(400).json({ error: 'Invalid Google access token' });
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { access_token },
    });
    if (error) {
      console.error('Google Login error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    const token = CookieToken(res, data.user.id);
    res.status(200).json({ user: data.user, token });
  } catch (err) {
    console.error('Google Login server error:', err.message);
    res.status(500).json({ error: 'Server error during Google login' });
  }
};

export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout server error:', err.message);
    res.status(500).json({ error: 'Server error during logout' });
  }
};