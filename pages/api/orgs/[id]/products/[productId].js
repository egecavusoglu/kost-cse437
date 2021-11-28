import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';

/**
 * @endpoint /orgs/[orgId]/products/[productId]
 * @token requires auth-token cookie
 *
 * @get returns the details of product.
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user; // user id
    if (req.method == 'GET') {
      const orgId = parseInt(req.query.id);
      const productId = parseInt(req.query.productId);

      // Check if the product belongs to that org

      // Check that user that's sending the request is a part of the org.
      const member = await prisma.usersOnOrganisations.findUnique({
        where: {
          userId_organisationId: {
            organisationId: orgId,
            userId: id,
          },
        },
      });

      if (!member) {
        return res.status(403).json({
          isSuccess: false,
          error: {
            code: 'NOT_IN_ORG',
            description: 'User is not a part of the org to see the product details.',
          },
        });
      }

      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (product.organisationId !== orgId) {
        return res.status(400).json({
          isSuccess: false,
          error: {
            code: 'INCORRECT_ORG',
            description: 'This product is not found in this organisation.',
          },
        });
      }
      return res.status(200).json({ isSuccess: true, data: product });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
