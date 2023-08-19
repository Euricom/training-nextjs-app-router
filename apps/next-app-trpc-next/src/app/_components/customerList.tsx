'use client';

import { use } from 'react';
import { trpc } from '@/utils/trpc/client';
import { ctl } from '@/utils/styles/cn';

export default function CustomerList(props: { className?: string }) {
  const data = use(trpc.customer.getAll.query());

  const classNames = ctl(`
    list-inside
    list-disc
     ${props.className}
  `);

  return (
    <ul className={classNames}>
      {data.map((item) => (
        <li key={item.CustomerId}>
          {item.FirstName} {item.LastName}
        </li>
      ))}
    </ul>
  );
}
