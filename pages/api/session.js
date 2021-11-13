import { stringifyError } from 'src/lib/error';
import { checkValidAuthCookie } from 'src/lib/jwt';

/**
 * @endpoint /session
 * @get Checks if user has a valid session from the auth-token cookie
 */

export default async function handler(req, res) {
  try {
    if (req.method == 'GET') {
      const hasValidCookie = checkValidAuthCookie(req);
      if (hasValidCookie) {
        return res.status(200).json({ isSuccess: true, data: { isLoggedIn: true } });
      }
      return res.status(401).json({ isSuccess: true, data: { isLoggedIn: false } });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
