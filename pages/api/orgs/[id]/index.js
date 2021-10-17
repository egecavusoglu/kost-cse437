import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';

/**
 * @endpoint /orgs/[orgId]
 * @token requires auth-token cookie
 *
 * @get returns the details of an organisation.
 * @delete deletes the organistaion and all products linked.
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
    if (req.method == 'DELETE') {
      const orgId = parseInt(req.query.id);

      // Only admins of Org can delete the org.
      const userOrgRelation = await prisma.usersOnOrganisations.findUnique({
        where: {
          userId_organisationId: {
            userId: id,
            organisationId: orgId,
          },
        },
      });

      if (!userOrgRelation.isAdmin) {
        return res
          .status(403)
          .json({ isSuccess: false, error: 'Only admins of the org can delete the org.' });
      }

      const deleteProducts = prisma.product.deleteMany({
        where: {
          organisationId: orgId,
        },
      });
      const deleteMemberRelations = prisma.usersOnOrganisations.deleteMany({
        where: {
          organisationId: orgId,
        },
      });
      const deleteOrg = prisma.organisation.delete({
        where: {
          id: orgId,
        },
      });
      const transaction = await prisma.$transaction([
        deleteProducts,
        deleteMemberRelations,
        deleteOrg,
      ]);
      return res.status(200).json({ isSuccess: true, data: transaction });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
