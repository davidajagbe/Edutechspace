import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  try {
    let token;
    console.log('authMiddleware: Authorization header:', req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      console.error('authMiddleware: No token provided');
      return res.status(401).json({ error: 'Not authorized, no token provided' });
    }

    console.log('authMiddleware: Token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('authMiddleware: Decoded token:', decoded);

    req.user = decoded; // { userId, iat, exp }
    next();
  } catch (err) {
    console.error('authMiddleware: Error:', err.message);
    return res.status(401).json({ error: 'Not authorized, token invalid' });
  }
};