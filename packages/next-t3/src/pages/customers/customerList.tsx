import Link from 'next/link';
import { trpc } from '@/utils/trpc/client';

export default function CustomerList({ className }: { className?: string }) {
  const { data } = trpc.customer.getAll.useQuery(undefined, {
    // this works together with the `Suspense` component in the page
    // and improved first time loading with SSR hydration
    suspense: true,
  });

  return (
    <div className={className}>
      <table className="table table-md">
        <thead>
          <tr>
            <th className="hidden lg:table-cell">Id</th>
            <th className="hidden lg:table-cell">First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th className="hidden lg:table-cell">Address</th>
            <th className="hidden lg:table-cell">City</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="hidden lg:table-cell">{item.id}</td>
              <td className="hidden lg:table-cell">{item.firstName}</td>
              <td>
                <Link href={`/customers/${item.id}`} className="underline">
                  {item.lastName}
                </Link>
              </td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td className="hidden lg:table-cell">{item.address}</td>
              <td className="hidden lg:table-cell">{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
