'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api/client';
import type { Employee } from '../api/employees/route';

type PageProps = { params: unknown; searchParams: unknown };

const getEmployees = async () => {
  return api.get<Employee[]>('api/employees');
};

export default function Home(_props: PageProps) {
  const { data: employees } = useQuery(['employees'], getEmployees);
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
