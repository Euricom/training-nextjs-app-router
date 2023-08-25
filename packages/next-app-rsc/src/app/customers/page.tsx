import { prisma } from '@/server/db';
import CustomerList from './customerList';

// route segment must be dynamic because we can update the customer
export const dynamic = 'force-dynamic';

export default async function Home() {
  const customers = await prisma.customer.findMany({});
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Customers</h1>
      <CustomerList className="mt-2" customers={customers} />
    </>
  );
}
