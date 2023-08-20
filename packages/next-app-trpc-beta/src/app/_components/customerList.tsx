'use client';

import { use } from 'react';
import { trpc } from '@/utils/trpc/client';
import Link from 'next/link';

export default function CustomerList(props: { className?: string }) {
  const data = use(trpc.customer.getAll.query());
  console.log('>>>>>>', data);
  return (
    <div className={props.className}>
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
