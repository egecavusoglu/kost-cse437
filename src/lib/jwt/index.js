import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getAuthCookie } from '../cookie';
dotenv.config();

const JWT_TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 *
 * @param {*} userId
 * @returns User ID encrypted JWT token
 */
function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, JWT_TOKEN_SECRET, {
    expiresIn: '7d',
  });
}

/**
 * @function authenticationMiddleware extracts auth-token from incoming request 'auth-token' cookie and sets req.user to the data decrypted from jwt token.
 * @returns void
 */
function authenticationMiddleware(req, res, next) {
  const header = getAuthCookie(req);
  const token = header && header.split(' ')[1];
  if (!token) {
    return res.redirect('/welcome');
  }
  jwt.verify(token, JWT_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.redirect('/welcome');
    }
    req.user = user;
    next();
  });
}

export { generateAccessToken, authenticationMiddleware };
