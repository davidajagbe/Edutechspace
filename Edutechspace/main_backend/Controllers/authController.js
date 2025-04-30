import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';
import fetch from 'node-fetch'
import bcrypt from 'bcrypt';;

export const login = async (req, res) => {
  try {
    if (!req.body) {
      console.error('login: Request body is missing');
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { email, password } = req.body;
    console.log('login: Attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('login: Supabase error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    const { data: userData, error: dbError } = await supabase
    .from('users')
    .select('id, name, email, picture, ongoingcourses, completedcourses, password, phone')
    .eq('email', email)
    .single();

    if (dbError || !userData) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, userData.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ ...userData, token });
  } catch (err) {
    console.error('login: Server error:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const signup = async (req, res) => {
  try {
    if (!req.body) {
      console.error('signup: Request body is missing');
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { name, email, phone, password } = req.body;
    console.log('signup: Attempt:', { name, email, phone });

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    });

    if (error) {
      console.error('signup: Supabase error:', error.message);
      return res.status(400).json({ error: error.message });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error: dbError } = await supabase.from('users').insert({
      id: data.user.id,
      name,
      email,
      phone: phone || null,
      password: hashedPassword,
      ongoingcourses: 0,
      completedcourses: 0,
      picture: null,
    });

    if (dbError) {
      console.error('signup: Database insert error:', dbError.message);
      await supabase.auth.admin.deleteUser(data.user.id);
      return res.status(400).json({ error: 'Failed to save user data: ' + dbError.message });
    }

    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('id, name, email, picture, ongoingcourses, completedcourses, password, phone')
      .eq('id', data.user.id)
      .single();

    if (fetchError) {
      console.error('signup: Database fetch error:', fetchError.message);
      return res.status(400).json({ error: fetchError.message });
    }

    const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('signup: User data:', userData);
    res.status(201).json(userData);
  } catch (err) {
    console.error('signup: Server error:', err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    if (!req.body) {
      console.error('googleLogin: Request body is missing');
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { access_token } = req.body;
    console.log('googleLogin: Attempt with access_token:', access_token ? 'provided' : 'missing');

    if (!access_token) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    }).then((res) => res.json());

    if (userInfo.error) {
      console.error('googleLogin: Google API error:', userInfo.error);
      return res.status(400).json({ error: 'Invalid Google access token' });
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { access_token },
    });

    if (error) {
      console.error('googleLogin: Supabase error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    const { data: userData, error: dbError } = await supabase
      .from('users')
      .select('id, name, email, picture, ongoingcourses, completedcourses, password, phone')
      .eq('id', data.user.id)
      .single();

    if (dbError) {
      console.error('googleLogin: Database error:', dbError.message);
      return res.status(400).json({ error: dbError.message });
    }

    const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('googleLogin: User data:', userData);
    res.status(200).json(userData);
  } catch (err) {
    console.error('googleLogin: Server error:', err.message);
    res.status(500).json({ error: 'Server error during Google login' });
  }
};

export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('logout: Supabase error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('logout: Server error:', err.message);
    res.status(500).json({ error: 'Server error during logout' });
  }
};