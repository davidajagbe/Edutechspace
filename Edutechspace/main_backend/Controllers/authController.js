import jwt from 'jsonwebtoken';
import supabase from '../config/Superbase-client.js';
import fetch from 'node-fetch';
import CookieToken from '../utils/CookieToken.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    const token = CookieToken(res, data.user.id);
    res.json({ user: data.user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);

    const token = CookieToken(res, data.user.id);
    res.json({ user: data.user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const googleLogin = async (req, res) => {
  const { access_token } = req.body;
  try {
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    }).then((res) => res.json());

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { access_token },
    });
    if (error) throw new Error(error.message);

    const token = CookieToken(res, data.user.id);
    res.json({ user: data.user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  await supabase.auth.signOut();
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};