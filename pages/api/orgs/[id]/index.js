import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';

/**
 * @endpoint /orgs/[orgId]
 * @token requires auth-token cookie
 *
 * @get returns the details of an organisation.
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    if (req.method == 'GET') {
      const orgId = parseInt(req.query.id);
      const org = await prisma.organisation.findUnique({
        where: {
          id: orgId,
        },
      });
      return res.status(200).json({ isSuccess: true, data: org });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
