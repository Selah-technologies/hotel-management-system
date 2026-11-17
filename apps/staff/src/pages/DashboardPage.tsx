import { Link } from "react-router";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">Placeholder page.</p>
      <Link to="/rooms" className="mt-4 inline-block text-blue-700 underline">
        Go to Rooms
      </Link>
    </main>
  );
}