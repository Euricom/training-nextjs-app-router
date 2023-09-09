import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Features() {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Feature Page</h1>
      <p>This is a protected route.</p>
      <Link className="underline" href="/">
        Go Back
      </Link>
    </>
  );
}
