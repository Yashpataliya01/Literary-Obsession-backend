import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.body.token || (authHeader && authHeader.split(' ')[1]);
  console.log("Request Method:", req.method, "Request URL:", req.originalUrl);
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = user;
    next();
  });
};
