import { getEmployees } from '@/endpoints/employees';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data } = useQuery(['employees'], getEmployees);

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
          {data?.map((item) => (
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
