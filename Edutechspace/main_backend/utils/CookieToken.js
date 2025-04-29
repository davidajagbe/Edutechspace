import jwt from 'jsonwebtoken';

const CookieToken = (res, userId) => {
  const token = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    {
    expiresIn: '30d',
    }
  );

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',//will use secure cookies in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    sameSite: 'lax',//prevents CRF attacks
  });

  console.log("Cookie Token Generated: ", token);
  console.log("Cookie Set: ", res.getHeaders());
};

export default CookieToken;

