/* eslint-disable @typescript-eslint/unbound-method  */
import { describe, test, expect, vi } from 'vitest';
import { TRPCError, type inferProcedureInput } from '@trpc/server';
import { appRouter, type AppRouter } from '@/server/api/appRouter';
import type { DeepMockProxy } from 'vitest-mock-extended';
import type { PrismaClient } from '@prisma/client';
import { createInnerTRPCContext } from '../../trpc';
import * as fixtures from './fixtures';
import { prisma } from '@/server/db';
import { ZodError } from 'zod';

vi.mock('@/server/db');
const prismaMock = prisma as DeepMockProxy<PrismaClient>;

describe('trpc customer procedure', () => {
  test('getById', async () => {
    // arrange
    const mockData = fixtures.customer();
    prismaMock.customer.findFirst.mockResolvedValue(mockData);
    const caller = appRouter.createCaller(createInnerTRPCContext({ prisma }));
    type Input = inferProcedureInput<AppRouter['customer']['getById']>;
    const input: Input = { id: mockData.id };

    // act
    const result = await caller.customer.getById(input);

    // assert
    expect(prismaMock.customer.findFirst).toHaveBeenCalledWith({
      where: { id: mockData.id },
    });
    expect(result).toStrictEqual(mockData);
  });

  test('getAll', async () => {
    // arrange
    const mockData = fixtures.customerList();
    prismaMock.customer.findMany.mockResolvedValue(mockData);
    const caller = appRouter.createCaller(createInnerTRPCContext({ prisma }));

    // act
    const result = await caller.customer.getAll();

    // assert
    expect(prismaMock.customer.findMany).toHaveBeenCalled();
    expect(result).toHaveLength(mockData.length);
    expect(result[0]?.id).toBe(mockData[0]!.id);
    expect(result[0]?.firstName).toBe(mockData[0]!.firstName);
  });

  test('save', async () => {
    // arrange
    const mockData = fixtures.customer();
    prismaMock.customer.update.mockResolvedValue(mockData);
    const caller = appRouter.createCaller(createInnerTRPCContext({ prisma }));

    // act
    await caller.customer.save({
      id: 1,
      firstName: 'Peter',
      lastName: 'test',
      email: 'peter@euri.com',
    });

    // assert
    expect(prismaMock.customer.update).toHaveBeenCalled();
  });

  test('failed save', async () => {
    const caller = appRouter.createCaller(createInnerTRPCContext({ prisma }));

    // act
    expect.assertions(3);
    try {
      await caller.customer.save({
        id: 1,
        unknown: 'Peter',
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(TRPCError);
      expect((error as TRPCError).cause).toBeInstanceOf(ZodError);

      const zodError = (error as TRPCError).cause as ZodError;
      expect(zodError.issues).toHaveLength(3); // expected to have 3 required errors
    }
  });
});
