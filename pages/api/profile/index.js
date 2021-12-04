import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';
import { checkNotEmpty } from 'src/lib/strings';
/**
 * @endpoint /profile
 * @get returns the profile information of the user if they have valid auth cookie.
 *
 * @put updates user information
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    if (req.method == 'GET') {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      user.hashedPassword = undefined; // Don't include password hash in the user object
      return res.status(200).json({ isSuccess: true, data: { user: user } });
    }
    if (req.method == 'PUT') {
      const { firstName, lastName, email } = req.body;
      if (!checkNotEmpty(firstName) || !checkNotEmpty(lastName) || !checkNotEmpty(email)) {
        return res.status(400).json({
          isSuccess: false,
          error: {
            code: 'NULL_FIELDS_EXIST',
            description: 'Some fields are null',
          },
        });
      }
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
      return res.status(200).json({
        isSuccess: true,
        data: user,
      });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
