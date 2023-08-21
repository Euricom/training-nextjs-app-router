import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { Customer } from '@prisma/client';
import CustomerForm from './form';
import Link from 'next/link';
import { getInnerCustomerRouter } from '@/server/api/routers/customer';

//
// this function runs on the server
// it will never be sent to the client
//
export const getServerSideProps: GetServerSideProps<{ customer: Customer | null }> = async (context) => {
  // re-use tRPC router (better then using prisma directly)
  // so the session and auth is checked when needed
  const router = await getInnerCustomerRouter(context);
  const customer = await router.getById({ id: Number(context.params?.id) });
  return { props: { customer } };
};

export default function Home({ customer }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {customer && <CustomerForm customer={customer} />}
      <div className="mt-5">
        <Link className="underline" href="/customers">
          Go Back
        </Link>
      </div>
    </>
  );
}
