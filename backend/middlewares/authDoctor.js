import jwt from 'jsonwebtoken';

// Middleware to authenticate doctor using JWT
const authDoctor = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization doctorToken missing or malformed' });
    }

    const doctorToken = authorization.split(' ')[1];
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);

    req.doctor = decoded; 
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ error: 'Unauthorized: Invalid or expired doctorToken' });
  }
};

export default authDoctor;
