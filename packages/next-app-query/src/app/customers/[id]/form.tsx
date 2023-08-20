'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormValues, customerSchema } from './formSchema';
import type { CustomerUpdate, Customer } from '@/app/api/customers/[id]/route';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  customer: Customer;
};

const saveCustomer = (input: CustomerUpdate & { id: number }) => {
  return fetch(`/api/customers/${input.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((res) => res.json()) as Promise<Customer>;
};

export default function CustomerForm({ customer }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleSubmit, register, formState } = useForm<FormValues>({
    defaultValues: customer,
    resolver: zodResolver(customerSchema),
  });

  const { mutate } = useMutation(saveCustomer, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['customers']);
      router.push('/customers');
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate({
      id: customer.id,
      ...values,
    });
    router.refresh();
    router.push('/');
  };

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Customer Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="id" defaultValue={customer?.id} />
        <div className="form-control w-full max-w-xs">
          <label className="label">First Name</label>
          <input type="text" className="input input-bordered w-full max-w-xs" {...register('firstName')} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">Last Name</label>
          <input type="text" className="input input-bordered w-full max-w-xs" {...register('lastName')} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">Email</label>
          <input type="text" className="input input-bordered w-full max-w-xs" {...register('email')} />
          {formState.errors.email && (
            <p className="mt-2 text-xs italic text-red-500"> {formState.errors.email?.message}</p>
          )}
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
