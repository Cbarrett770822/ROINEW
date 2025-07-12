"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  role?: string;
  userId?: string;
  [key: string]: string | number | boolean | undefined;
}

export default function DashboardPage(): React.ReactElement {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser(): Promise<void> {
      const res = await fetch('/api/protected/hello');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.replace('/login');
      }
      setLoading(false);
    }
    fetchUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 32 }}>
      <h2>Dashboard</h2>
      <div>Welcome, <b>{user.username}</b>!</div>
      <div>Role: {user.role}</div>
      <div style={{ marginTop: 24 }}>
        <button onClick={async () => {
          await fetch('/api/auth/logout', { method: 'POST' });
          window.location.href = '/login';
        }}>
          Logout
        </button>
      </div>
    </main>
  );
}
