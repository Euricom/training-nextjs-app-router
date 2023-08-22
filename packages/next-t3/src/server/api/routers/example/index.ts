import { z } from 'zod';
import type { GetServerSidePropsContext } from 'next';

import { createTRPCRouter, publicProcedure, protectedProcedure, createInnerTRPCContext } from '@/server/api/trpc';
import { getServerAuthSession } from '@/server/auth';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return [{ id: 1, name: 'hello' }];
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return {
      message: 'you can now see this secret message!',
    };
  }),
});

/**
 * Get the inner router for the exampleRouter.
 * To be used from server side code (getServerSideProps)
 * Usage:
 * ```
 * export const getServerSideProps = async (context) => {
 *   const router = await getInnerExampleRouter(context);
 *   const sample = await router.getAll();
 *   return { props: { sample } };
 * }
 * ```
 * @param ctx
 * @returns
 */
export async function getInnerExampleRouter(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  const trpcContext = createInnerTRPCContext({ session });
  return exampleRouter.createCaller(trpcContext);
}
