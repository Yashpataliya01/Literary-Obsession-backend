import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config()

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Token not found');
  }
  jwt.verify(token, process.env.secret_toke, (err, user) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.user = user;
    next();
  });
}