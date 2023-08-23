import { z } from 'zod';
import type { GetServerSidePropsContext } from 'next';

import { getServerAuthSession } from '@/server/auth';
import { createInnerTRPCContext, createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { prisma } from '@/server/db';

export const customerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const customers = await prisma.customer.findMany({});
    return customers;
  }),

  getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const customers = await prisma.customer.findFirst({
      where: {
        id: input.id,
      },
    });
    return customers;
  }),

  save: publicProcedure
    .input(z.object({ id: z.number(), firstName: z.string(), lastName: z.string(), email: z.string() }))
    .mutation(async ({ input }) => {
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

  delete: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const customers = await prisma.customer.delete({
      where: {
        id: input.id,
      },
    });
    return customers;
  }),
});

/**
 * Get the inner router for the customerRouter.
 * To be used from server side code (getServerSideProps)
 * Usage:
 * ```
 * export const getServerSideProps = async (context) => {
 *   const router = await getInnerCustomerRouter(context);
 *   const sample = await router.getAll();
 *   return { props: { sample } };
 * }
 * ```
 * @param ctx
 * @returns
 */
export async function getInnerCustomerRouter(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  const trpcContext = createInnerTRPCContext({ session });
  return customerRouter.createCaller(trpcContext);
}
