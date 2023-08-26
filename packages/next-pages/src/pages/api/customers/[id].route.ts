import { prisma } from '@/server/db';
import { NotFoundError } from '@/server/errors';
import errorHandler from '@/server/middleware/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { z } from 'zod';

const customerPutSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
});
const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(errorHandler)
  .get(async (req, res) => {
    const { id } = req.query as { id: string };
    console.log(`GET /api/customers/${id}`);

    const customer = await prisma.customer.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!customer) throw new NotFoundError();
    res.status(200).json(customer);
  })
  .delete(async (req, res) => {
    const { id } = req.query as { id: string };
    console.log(`DELETE /api/customers/${id}`);

    const customer = await prisma.customer.findFirst({
      where: { id: Number(id) },
    });
    if (!customer) {
      return res.status(204).json({});
    }

    await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(customer);
  })
  .put(async (req, res) => {
    const { id } = req.query as { id: string };
    const body = customerPutSchema.parse(req.body);
    console.log(`PUT /api/customers/${id}`, body);

    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
    });
    res.status(200).json(customer);
    return;
  });

export default router.handler();
