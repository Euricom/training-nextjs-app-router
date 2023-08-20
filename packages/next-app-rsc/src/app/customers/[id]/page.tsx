/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import CustomerForm from './form';
import { prisma } from '@/server/db';

const getCustomer = (id: number) => {
  return prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
};

export type Customer = Awaited<ReturnType<typeof getCustomer>>;

export default async function CustomerFormPage(props: { params: { id: string } }) {
  const id = Number(props.params.id);
  const customer = await getCustomer(id);
  return (
    <>
      {customer && <CustomerForm customer={customer} />}
      <div className="mt-5">
        <Link className="underline" href="/">
          Go Back
        </Link>
      </div>
    </>
  );
}
