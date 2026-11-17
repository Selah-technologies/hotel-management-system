import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">That address does not exist in the staff app.</p>
      <Link to="/dashboard" className="mt-4 inline-block text-blue-700 underline">
        Go to Dashboard
      </Link>
    </main>
  );
}