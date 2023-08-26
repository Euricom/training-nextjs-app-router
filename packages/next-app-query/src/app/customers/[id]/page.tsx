'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import CustomerForm from './form';
import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '@/endpoints/customers';

export default function CustomerFormPage(props: { params: { id: string } }) {
  const id = Number(props.params.id);
  const { data: customer } = useQuery(['customers', id], () => getCustomer(id));
  return (
    <>
      {customer && <CustomerForm customer={customer} />}
      <div className="mt-5">
        <Link
          className="underline"
          href={{
            pathname: '/customers',
          }}
        >
          Go Back
        </Link>
      </div>
    </>
  );
}
