"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage(): React.ReactElement {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError(data.error || 'Registration failed');
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: 'auto', padding: 32 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        /><br />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" disabled={loading}>Register</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ marginTop: 16 }}>
        <a href="/login">Already have an account? Login</a>
      </div>
    </main>
  );
}
