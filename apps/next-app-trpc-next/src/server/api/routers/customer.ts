import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const customerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const customers = await prisma.customer.findMany({});
    return customers;
  }),
});
