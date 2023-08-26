import { prisma } from '@/server/db';
import errorHandler from '@/server/middleware/errorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { z } from 'zod';

const customerPostSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(errorHandler)
  .get(async (req, res) => {
    console.log(`GET /api/customers`);

    const customers = await prisma.customer.findMany({});
    res.status(200).json(customers);
  })
  .post(async (req, res) => {
    const body = customerPostSchema.parse(req.body);
    console.log(`POST /api/customers`);

    const customer = await prisma.customer.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
    });
    res.status(200).json(customer);
  });

export default router.handler();

// Without next-connect you need to do this:
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method === 'GET') {
//       const customers = await prisma.customer.findMany({});
//       res.status(200).json(customers);
//       return;
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(500).send({
//         code: 'Internal Server Error',
//         message: err.message,
//       });
//     }
//     throw err;
//   }
// }
