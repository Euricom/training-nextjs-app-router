'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCustomerAction } from './updateCustomerAction';
import { type FormValues, customerSchema } from './formSchema';
import type { Customer } from './page';

type Props = {
  customer: NonNullable<Customer>;
};

export default function CustomerForm({ customer }: Props) {
  const router = useRouter();
  const { handleSubmit, register, formState } = useForm<FormValues>({
    defaultValues: customer,
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (values: FormValues) => {
    await updateCustomerAction({
      ...values,
      id: customer.id,
      date: new Date(),
    });
    // make sure you clear Server Components client cache to update the list
    router.refresh();
    revalidatePath('/customers');
    router.push('/customers');
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
