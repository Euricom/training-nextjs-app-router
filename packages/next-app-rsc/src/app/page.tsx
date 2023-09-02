import type { EmployeeDTO } from '@/endpoints/types';
import { xFetch } from '@/utils/api/client';
import { env } from '@/env.mjs';

export default async function Home() {
  const data = await xFetch<EmployeeDTO[]>(`${env.API_SERVER_URL}/api/employees`);
  const employees = data.map((item) => ({
    ...item,
    birthDate: new Date(item.birthDate),
  }));

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Employees</h1>
      <table className="table table-md">
        <thead>
          <tr>
            <th className="hidden lg:table-cell">Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>birthDate</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((item) => (
            <tr key={item.id}>
              <td className="hidden lg:table-cell">{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.title}</td>
              <td>{item.birthDate.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
