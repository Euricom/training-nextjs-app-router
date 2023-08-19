'use client';

import Link from 'next/link';

export default function NavLink(props: { href: string; children: React.ReactNode; className?: string }) {
  const handleClick = () => {
    const sidebar = document.querySelector('#sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  };

  return (
    <Link href={props.href} className={props.className} onClick={handleClick}>
      {props.children}
    </Link>
  );
}
