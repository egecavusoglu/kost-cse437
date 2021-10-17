import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';
require('src/lib/prisma/array');

/**
 * @endpoint products/:productId
 * @token requires auth-token cookie
 *
 * @get returns the details of a product.
 * @delete deletes the product
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    const productId = parseInt(req.query.id);
    if (req.method == 'GET') {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      return res.status(200).json({ isSuccess: true, data: product });
    }
    if (req.method == 'DELETE') {
      const deletedProduct = await prisma.product.delete({
        where: {
          id: productId,
        },
      });
      return res.status(200).json({ isSuccess: true, data: deletedProduct });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
