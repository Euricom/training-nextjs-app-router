import { env } from '@/env.mjs';
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
  const data: EmployeeDTO[] = await fetch(`${env.API_SERVER_URL}/api/employees`).then((res) => res.json());
  const employees = data.map(mapEmployee);
  return superjson(employees);
};

export type Employee = InferResponseType<typeof get>[number];
export const GET = compose(errorHandler, get);
