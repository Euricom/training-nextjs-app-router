import { Suspense } from 'react';
import CustomerList from './customerList';

export default function Customers() {
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Customers</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerList className="mt-2" />
      </Suspense>
    </>
  );
}
