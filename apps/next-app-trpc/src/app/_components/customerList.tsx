'use client';

import { trpc } from '../utils/trpc';

export default function CustomerList() {
  const { data, isLoading } = trpc.customer.getAll.useQuery();

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
