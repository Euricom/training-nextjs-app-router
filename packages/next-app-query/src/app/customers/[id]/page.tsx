'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import CustomerForm from './form';
import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '@/endpoints/customers';

type PageProps = { params: { id: string }; searchParams: unknown };

export default function CustomerFormPage({ params }: PageProps) {
  const id = Number(params.id);
  const { data: customer } = useQuery(['customers', id], () => getCustomer(id));
  return (
    <>
      {customer && <CustomerForm customerId={id} defaultValues={customer} />}
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
