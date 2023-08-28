'use client';

import { api } from '@/utils/api/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import type { Customer } from '../api/customers/route';

type CustomerListProps = {
  className?: string;
};

const getCustomers = async (sortBy: string) => {
  return api.get<Customer[]>(`/api/customers?sortBy=${sortBy}`);
};

export default function CustomerList({ className }: CustomerListProps) {
  const [sortBy, setSortBy] = useState('firstName');
  const { data } = useQuery(['customers', sortBy], () => getCustomers(sortBy), {
    keepPreviousData: true,
    suspense: true,
  });

  const handleSort = (sortBy: string) => {
    setSortBy(sortBy);
  };

  return (
    <div className={className}>
      <table className="table table-md">
        <thead>
          <tr>
            <th className="hidden lg:table-cell">Id</th>
            <th className="hidden lg:table-cell">
              <span className="cursor-pointer" onClick={() => handleSort('firstName')}>
                First Name
              </span>
            </th>
            <th>
              <span className="cursor-pointer" onClick={() => handleSort('lastName')}>
                Last Name
              </span>
            </th>
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
