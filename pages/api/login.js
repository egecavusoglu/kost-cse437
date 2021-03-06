import { generateAccessToken } from 'src/lib/jwt';
import { setAuthCookie } from 'src/lib/cookie';
import { prisma } from 'src/lib/prisma';
import { stringifyError } from 'src/lib/error';
import { checkPassword } from 'src/lib/password';
/**
 * @endpoint /login
 * @post
 * {
 *  email: String,
 *  password: String
 * }
 */

export default async function handler(req, res) {
  try {
    if (req.method == 'POST') {
      const { email, password } = req.body;

      //Check if user exists with associated email
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(401).json({ isSuccess: false, error: 'User not found' });
      }

      // Check if password matches salted pwd in db.
      const { id, hashedPassword } = user;
      const passwordValid = await checkPassword(password, hashedPassword);
      if (!passwordValid) {
        return res.status(401).json({ isSuccess: false, error: 'Incorrect password' });
      }
      // Generate JWT access token
      const accessToken = generateAccessToken(id);
      setAuthCookie(res, accessToken);
      return res.status(200).json({ isSuccess: true });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
