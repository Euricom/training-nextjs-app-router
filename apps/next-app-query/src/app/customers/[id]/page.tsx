'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import CustomerForm from './form';
import { useQuery } from '@tanstack/react-query';
import type { Customer } from '@/app/api/customers/route';

const getCustomer = (id: number) => {
  return fetch(`/api/customers/${id}`).then((res) => res.json()) as Promise<Customer>;
};

export default function CustomerFormPage(props: { params: { id: string } }) {
  const id = Number(props.params.id);
  const { data: customer } = useQuery(['customers', id], () => getCustomer(id));
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
