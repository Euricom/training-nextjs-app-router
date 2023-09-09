import { prisma } from '@/server/db';
import CustomerList from './customerList';
import { getServerAuthSession } from '@/server/auth';

// route segment must be dynamic because we can update the customer
// export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  const session = await getServerAuthSession();
  if (!session) {
    return <div>Not authenticated</div>;
  }
  const customers = await prisma.customer.findMany({});
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Customers</h1>
      <CustomerList className="mt-2" customers={customers} />
    </>
  );
}
