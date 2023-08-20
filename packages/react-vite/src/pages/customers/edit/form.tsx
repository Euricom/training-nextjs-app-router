import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormValues, customerSchema } from './formSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCustomer } from '@/common/api/customers';
import { useNavigate } from 'react-router-dom';
import { CustomerDTO } from '@/common/api/customers';

type Props = {
  customer: CustomerDTO;
};

export default function CustomerForm({ customer }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleSubmit, register, formState } = useForm<FormValues>({
    defaultValues: customer,
    // resolver: zodResolver(customerSchema),
  });

  const { mutate } = useMutation(updateCustomer, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['customers']);
      navigate('/');
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate({
      id: customer.id,
      ...values,
    });
  };

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Customer Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="id" defaultValue={customer?.id} />
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register('firstName')}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register('lastName')}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register('email')}
          />
          {formState.errors.email && (
            <p className="mt-2 text-xs italic text-red-500">
              {' '}
              {formState.errors.email?.message}
            </p>
          )}
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
