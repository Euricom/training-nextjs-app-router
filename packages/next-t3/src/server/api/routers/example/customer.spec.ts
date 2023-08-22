import { describe, test, expect } from 'vitest';
import { appRouter } from '@/server/api/appRouter';
import { createInnerTRPCContext } from '../../trpc';
import type { Session } from 'next-auth';

describe('example', () => {
  test('getSecret', async () => {
    const session = {
      user: {
        id: '12',
      },
    } as Session;
    const caller = appRouter.createCaller(createInnerTRPCContext({ session }));
    const result = await caller.example.getSecretMessage();
    expect(result).toEqual({
      message: 'you can now see this secret message!',
    });
  });
});
