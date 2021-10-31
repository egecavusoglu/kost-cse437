import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';

/**
 * @endpoint /orgs/[orgId]/members
 * @token requires auth-token cookie
 *
 * @get returns members of the organisation
 *
 * @post add new member to organisation
 * @body
 *  {
 *    email: String,
 *    isAdmin: Boolean
 *  }
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    const orgId = parseInt(req.query.id);
    if (req.method == 'GET') {
      const members = await prisma.usersOnOrganisations.findMany({
        where: {
          organisationId: orgId,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return res.status(200).json({ isSuccess: true, data: members });
    }
    if (req.method == 'POST') {
      const { email, isAdmin } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
        },
      });
      if (!user || !user.id) {
        return res.status(400).json({
          isSuccess: false,
          error: {
            code: 'NOT_ADMIN',
            description: 'User with the email not found.',
          },
        });
      }

      // check if user is a admin in that org.
      const addingUser = await prisma.usersOnOrganisations.findUnique({
        where: {
          userId_organisationId: {
            organisationId: orgId,
            userId: id,
          },
        },
        select: {
          isAdmin: true,
        },
      });

      if (!addingUser || !addingUser.isAdmin) {
        return res.status(403).json({
          isSuccess: false,
          error: {
            code: 'NOT_ADMIN',
            description: 'Only admins can add new members to organisation.',
          },
        });
      }

      const addMemberOperation = await prisma.usersOnOrganisations.create({
        data: {
          organisationId: orgId,
          userId: user.id,
          isAdmin: isAdmin,
        },
      });
      return res.status(200).json({ isSuccess: true, data: addMemberOperation });
    }

    if (req.method == 'PUT') {
    }

    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
