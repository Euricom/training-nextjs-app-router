/* eslint-disable @typescript-eslint/no-unused-vars */
import { trpc } from '@/utils/trpc/server';
import CustomerForm from './form';

// // validation -> https://github.com/pingdotgg/zact
// async function createCustomerAction(data: any): void {
//   'use server';
//   console.log('createCustomerAction', data);
//   await trpc.customer.save.mutate({});
// }

export default async function CustomerFormPage(props: { params: { id: string } }) {
  const id = Number(props.params.id);
  const customer = await trpc.customer.getById.query({ id });
  // const customers = await prisma.customer.findFirst({
  //   where: {
  //     id: input.id,
  //   },
  // });
  if (customer) {
    return <CustomerForm customer={customer} />;
  }
}
