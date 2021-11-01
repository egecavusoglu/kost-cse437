import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';

/**
 * @endpoint /orgs
 * @authentication all routes require auth-token cookie
 * @post creates new organisation
 * body: {
 *    name,
 *    description,
 *    plan
 * }
 * @get returns all organisations user is a member of
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    if (req.method == 'POST') {
      const { name, description, plan } = req.body;
      const org = await prisma.organisation.create({
        data: {
          name: name,
          description: description,
          plan: plan,
          members: {
            create: [
              {
                user: {
                  connect: {
                    id: id,
                  },
                },
                isAdmin: true,
                isOwner: true,
              },
            ],
          },
        },
      });
      return res.status(200).json({ isSuccess: true, data: org });
    }
    if (req.method == 'GET') {
      const orgs = await prisma.organisation.findMany({
        where: {
          members: {
            some: {
              user: {
                id: id,
              },
            },
          },
        },
      });
      return res.status(200).json({ isSuccess: true, data: orgs });
    }

    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
