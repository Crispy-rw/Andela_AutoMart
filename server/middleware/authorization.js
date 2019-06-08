import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

ENV.config();

const authorize = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).send('Access denied. No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token');
  }
};

export default authorize;
