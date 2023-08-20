/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { trpc } from '@/utils/trpc/client';
import type { Customer } from '@prisma/client';
import { useForm } from 'react-hook-form';
type Props = {
  customer: Customer;
};

export default function CustomerForm({ customer }: Props) {
  const { handleSubmit, register } = useForm({
    defaultValues: customer,
  });

  const onSubmit = async (values: Customer) => {
    console.log('onSubmit', values);
    await trpc.customer.save.mutate({
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    });
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
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
      <div className="mt-5">
        <a className="underline" href="/">
          Go Back
        </a>
      </div>
    </>
  );
}
