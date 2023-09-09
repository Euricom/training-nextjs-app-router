import { env } from '@/env.mjs';
import { xFetch } from '@/utils/api/client';
import type { EmployeeDTO } from '@/endpoints/types';
import { superjson, type InferResponseType } from '@/server/utils/responses';
import { compose } from '@/server/middleware/compose';
import errorHandler from '@/server/middleware/errorHandler';

export const mapEmployee = (employee: EmployeeDTO) => {
  return {
    ...employee,
    birthDate: new Date(employee.birthDate),
    hireDate: new Date(employee.hireDate),
  };
};

const get = async () => {
  const data = await xFetch<EmployeeDTO[]>(`${env.API_SERVER_URL}/api/employees`);
  const employees = data.map(mapEmployee);
  return superjson(employees);
};

export type Employee = InferResponseType<typeof get>[number];
export const GET = compose(errorHandler, get);
