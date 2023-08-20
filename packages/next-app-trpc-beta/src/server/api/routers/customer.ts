/* eslint-disable @typescript-eslint/no-unused-vars */
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';
import { z } from 'zod';

export const customerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const customers = await prisma.customer.findMany({});
    return customers;
  }),
  getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    const customers = await prisma.customer.findFirst({
      where: {
        id: input.id,
      },
    });
    return customers;
  }),
  save: publicProcedure
    .input(z.object({ id: z.number(), firstName: z.string(), lastName: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const customers = await prisma.customer.update({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
        },
        where: {
          id: input.id,
        },
      });
      return customers;
    }),
});
