import { stringifyError } from 'src/lib/error';
import { authenticationMiddleware } from 'src/lib/jwt';
import { runMiddleware } from 'src/lib/middleware';
import { prisma } from 'src/lib/prisma';

/**
 * @endpoint /products
 * @post creates new product
 */

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id } = req.user;
    if (req.method == 'POST') {
      const { name, description, amount, currency, billingPeriod, organisationId } = req.body;
      const product = await prisma.product.create({
        data: {
          name: name,
          description: description,
          billingPeriod: billingPeriod,
          currency: currency,
          amount: amount,
          organisation: {
            connect: {
              id: parseInt(organisationId),
            },
          },
        },
      });
      return res.status(200).json({ isSuccess: true, data: product });
    }
    res.status(404).json({ isSuccess: false, error: 'Route not found!' });
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}
