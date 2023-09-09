'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthPanel() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="mt-2 border-2 border-dotted p-2">
        {session.user?.name}
        <br />
        <button className="btn btn-sm" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="mt-2">
      <button className="btn btn-sm" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
