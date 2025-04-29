import jwt from 'jsonwebtoken';

const CookieToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'lax',
  });

  console.log('Cookie Token Generated:', token);
  console.log('Cookie Set:', res.getHeaders());

  return token; // Return token for use in response
};

export default CookieToken;