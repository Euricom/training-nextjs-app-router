'use client';

import { useQuery } from '@tanstack/react-query';
import type { Customer } from '@/app/api/customers/route';

export default function CustomerList() {
  const { data, isLoading } = useQuery<Customer[]>(['customerList'], () => {
    return fetch('/api/customers').then((res) => res.json());
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="list-inside list-disc">
      {data &&
        data.map((item) => (
          <li key={item.CustomerId}>
            {item.FirstName} {item.LastName}
          </li>
        ))}
    </ul>
  );
}
