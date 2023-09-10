import { env } from '@/env.mjs';
import { xFetch } from '@/utils/api/client';
import type { EmployeeDTO } from '@/endpoints/types';
import { superjson } from '@/server/utils/responses';
import { mapEmployee } from '../route';
import { compose } from '@/server/middleware/compose';
import errorHandler from '@/server/middleware/errorHandler';

const get = async (_request: Request, { params }: { params: { id: string } }) => {
  const data = await xFetch<EmployeeDTO>(`${env.API_SERVER_URL}/api/employees/${params.id}`);
  const employee = mapEmployee(data);
  return superjson(employee);
};

export const GET = compose(errorHandler, get);