import withErrorHandling from '@/server/utils/withErrorHandling';
import { env } from '@/env.mjs';
import { xFetch } from '@/utils/api/client';
import type { EmployeeDTO } from '@/endpoints/types';
import { superjson, type InferResponseType } from '@/server/utils/responses';

export const mapEmployee = (employee: EmployeeDTO) => {
  return {
    ...employee,
    birthDate: new Date(employee.birthDate),
    hireDate: new Date(employee.hireDate),
  };
};

export const get = async () => {
  const data = await xFetch<EmployeeDTO[]>(`${env.API_SERVER_URL}/api/employees`);
  const employees = data.map(mapEmployee);
  return superjson(employees);
};

export type Employee = InferResponseType<typeof get>[number];

export const GET = withErrorHandling(get);
