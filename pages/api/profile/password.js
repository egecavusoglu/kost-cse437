import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';
import { checkPassword, hashPassword } from 'src/lib/password';

/**
 * @endpoint /profile/password
 * @put updates user password
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;

    if (req.method == 'PUT') {
      const { newPassword, oldPassword } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      const passwordsMatch = await checkPassword(oldPassword, user?.hashedPassword);
      if (!passwordsMatch) {
        return res.status(400).json({
          isSuccess: false,
          error: {
            code: 'INCORRECT_OLD_PASSWORD',
            description: 'Current password is incorrect.',
          },
        });
      }

      const hashedPwd = await hashPassword(newPassword);
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          hashedPassword: hashedPwd,
        },
      });
      return res.status(200).json({
        isSuccess: true,
        data: updatedUser,
      });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
