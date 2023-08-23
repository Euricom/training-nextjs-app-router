import { describe, test, expect, beforeEach } from 'vitest';
import { appRouter } from '@/server/api/appRouter';
import { createInnerTRPCContext } from '@/server/api/trpc';
import * as fixtures from './fixtures';
import { prisma } from '@/server/db';
import { clearDB } from '@/tests/dbUtils';

describe('trpc customer procedure', () => {
  beforeEach(clearDB);

  test('CRUD customer', async () => {
    // arrange (insert customers in DB)
    const mockData = fixtures.customerList();
    for (const item of mockData) {
      await prisma.customer.create({
        data: item,
      });
    }

    const caller = appRouter.createCaller(createInnerTRPCContext({ prisma }));

    // retrieve all customers
    const allCustomers = await caller.customer.getAll();
    expect(allCustomers).toHaveLength(2);

    // retrieve single customer
    const single = await caller.customer.getById({ id: 1 });
    expect(single).toEqual(expect.objectContaining(mockData[0]));

    // update customer
    const updatedCustomer = await caller.customer.save({
      id: 1,
      firstName: 'Peter',
      lastName: 'test',
      email: 'peter@euri.com',
    });
    expect(updatedCustomer).toEqual(
      expect.objectContaining({ firstName: 'Peter', lastName: 'test', email: 'peter@euri.com' })
    );

    // retrieve update customer
    const singleUpdatedCustomer = await caller.customer.getById({ id: 1 });
    expect(singleUpdatedCustomer?.firstName).toEqual('Peter');

    // remove customer
    const deletedCustomer = await caller.customer.delete({ id: 1 });
    expect(deletedCustomer.id).toBe(1);

    // verify its gone in db
    expect(await prisma.customer.count()).toBe(1);
  });
});
