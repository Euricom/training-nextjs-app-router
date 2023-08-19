"use client";

import { ctl } from "@/utils/styles/ctl";
import { trpc } from "@/utils/trpc/client";

export default function CustomerList(props: { className?: string }) {
  const { data, isLoading } = trpc.customer.getAll.useQuery();

  const classNames = ctl(`
    list-inside
    list-disc
     ${props.className}
  `);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className={classNames}>
      {data?.map((item) => (
        <li key={item.id}>
          {item.firstName} {item.lastName}
        </li>
      ))}
    </ul>
  );
}
