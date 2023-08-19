import { Suspense } from 'react';
import CustomerList from './_components/customerList';

export default function Home() {
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Home Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerList className="mt-2" />
      </Suspense>
    </>
  );
}
