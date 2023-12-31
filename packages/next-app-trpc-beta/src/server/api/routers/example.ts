/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from '@/server/api/trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return [{ id: 1, name: 'hello' }];
  }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
