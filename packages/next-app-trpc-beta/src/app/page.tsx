import { Suspense } from 'react';
import CustomerList from './_components/customerList';
// import { trpc } from './utils/trpcServer';

export default function Home() {
  // const data = await trpc.customer.getAll.query();
  // console.log(data);

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Home Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CustomerList className="mt-2" />
      </Suspense>
    </>
  );
}
