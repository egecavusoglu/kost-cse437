import { resetAuthCookie } from 'src/lib/cookie';
import { stringifyError } from 'src/lib/error';

/**
 * @endpoint /logout
 * Logs out the user by clearing the httpOnly token cookie.
 * @post
 */

export default async function handler(req, res) {
  try {
    if (req.method == 'POST') {
      // Generate JWT access token
      resetAuthCookie(res);
      return res.status(200).json({ isSuccess: true });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
