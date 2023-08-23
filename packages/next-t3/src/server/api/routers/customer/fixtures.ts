import type { Customer } from '@prisma/client';

export const customer = (): Customer => {
  return {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
  } as Customer;
};

export const customerList = (): Customer[] => {
  return [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Brecht',
      email: 'jane.brecht@company.com',
    },
  ] as Customer[];
};
