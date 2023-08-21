/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

// import { trpc } from '@/utils/trpc/client';
import type { Customer } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { trpc } from '@/utils/trpc/client';

type Props = {
  customer: Customer;
};

const customerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

type FormValues = z.infer<typeof customerSchema>;

export default function CustomerForm({ customer }: Props) {
  const utils = trpc.useContext();
  const router = useRouter();
  const { handleSubmit, register, formState } = useForm<FormValues>({
    defaultValues: customer,
    resolver: zodResolver(customerSchema),
  });

  const { mutate } = trpc.customer.save.useMutation({
    onSuccess: async () => {
      await utils.customer.invalidate();
      // go back to list
      router.push('/customers');
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log('onSubmit', values);
    mutate({
      id: customer.id,
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
