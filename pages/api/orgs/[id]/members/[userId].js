import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';
import { getPermissionScore, canEditMemberStatus } from 'src/lib/permissions';

/**
 * @endpoint /orgs/[orgId]/members/[userId]
 * @token requires auth-token cookie
 *
 * @put change users member status
 * @body
 * {
 *  isAdmin: Boolean,
 * }
 *
 * @delete remove user from org.
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    const orgId = parseInt(req.query.id);
    const userId = parseInt(req.query.userId);

    const editorUser = await prisma.usersOnOrganisations.findUnique({
      where: {
        userId_organisationId: {
          organisationId: orgId,
          userId: id,
        },
      },
    });

    const editeeUser = await prisma.usersOnOrganisations.findUnique({
      where: {
        userId_organisationId: {
          organisationId: orgId,
          userId: userId,
        },
      },
    });

    const hasEditPermissions = canEditMemberStatus({
      editor: getPermissionScore({ isAdmin: editorUser.isAdmin, isOwner: editorUser.isOwner }),
      editee: getPermissionScore({ isAdmin: editeeUser.isAdmin, isOwner: editeeUser.isOwner }),
    });

    if (!hasEditPermissions) {
      return res.status(403).json({
        isSuccess: false,
        error: {
          code: 'NO_PERMISSION',
          description:
            "This user can't change member status of another user having same or greater permissions.",
        },
      });
    }

    if (req.method == 'PUT') {
      // check if editor user has permissions over
      const { isAdmin } = req.body;

      const updateMemberStatus = await prisma.usersOnOrganisations.updateMany({
        where: {
          AND: [{ organisationId: orgId }, { userId: userId }],
        },
        data: {
          isAdmin: isAdmin,
        },
      });

      return res.status(200).json({ isSuccess: true, data: updateMemberStatus });
    }

    if (req.method == 'DELETE') {
      const deleteMember = await prisma.usersOnOrganisations.delete({
        where: {
          userId_organisationId: {
            organisationId: orgId,
            userId: userId,
          },
        },
      });

      return res.status(200).json({ isSuccess: true, data: deleteMember });
    }

    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
