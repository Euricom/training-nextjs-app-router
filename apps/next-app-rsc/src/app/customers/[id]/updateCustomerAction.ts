'use server';

import { serverAct } from 'server-act';
import { customerSchema } from './formSchema';
import { prisma } from '@/server/db';
import { z } from 'zod';

export const updateCustomerAction = serverAct
  .input(
    customerSchema.extend({
      id: z.number(),
    })
  )
  .action(async ({ input }) => {
    await prisma.customer.update({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
      },
      where: {
        id: input.id,
      },
    });
    return true;
  });
