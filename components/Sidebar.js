import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
      <Link href="/dashboard">
        <a className="block">Dashboard</a>
      </Link>
      <Link href="/profile">
        <a className="block">Profile</a>
      </Link>
      {session.user.role === 'admin' && (
        <>
          <Link href="/pending-requests">
            <a className="block">Pending Requests</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
