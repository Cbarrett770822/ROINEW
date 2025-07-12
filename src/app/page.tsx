// Minimal root page for Next.js App Router
export default function HomePage(): React.ReactElement {
  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 32 }}>
      <h1>ROI Warehouse Management System</h1>
      <p>Welcome! Please <a href="/login">login</a> or <a href="/register">register</a> to continue.</p>
    </main>
  );
}
