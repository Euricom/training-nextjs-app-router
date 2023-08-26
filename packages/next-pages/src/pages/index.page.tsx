import { useQuery } from '@tanstack/react-query';
// import { getEmployees } from '@/server/api/endpoints/employees';

export default function Home() {
  // next to trpc we can combine react-query to fetch from 3th party
  // endpoints (see also the proxy endpoint)
  // const { data } = useQuery(['employees'], getEmployees);

  // const { data: todos } = useQuery(['todos'], () =>
  //   fetch('http://localhost:3001/api/v1/basket/123/products/1003', {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       quantity: 2,
  //     }),
  //   }).then((res) => res.json())
  // );

  // console.log(todos);

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Employees</h1>
      {/* <table className="table table-md">
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
      </table> */}
    </>
  );
}
