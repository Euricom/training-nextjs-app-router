'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { trpc } from '@/utils/trpc/client';
import Link from 'next/link';
import CustomerForm from './form';

export default function CustomerFormPage(props: { params: { id: string } }) {
  const id = Number(props.params.id);
  const { data } = trpc.customer.getById.useQuery({ id });
  // const customers = await prisma.customer.findFirst({
  //   where: {
  //     id: input.id,
  //   },
  // });
  return (
    <>
      {data && <CustomerForm customer={data} />}
      <div className="mt-5">
        <Link className="underline" href="/">
          Go Back
        </Link>
      </div>
    </>
  );
}
