import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
/**
 * @endpoint /profile
 *
 * @get returns the profile information of the user if they have valid auth cookie.
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    if (req.method == 'GET') {
      const { id } = req.user;
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      user.hashedPassword = undefined; // Don't include password hash in the user object
      return res.status(200).json({ isSuccess: true, data: { user: user } });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ isSuccess: false, error: err });
  }
}
