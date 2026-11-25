import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { api, ApiError } from "../api/client";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page
    setError(null);
    setSubmitting(true);
    try {
      // ASSUMED request body. TO BE CONFIRMED WITH MEMBER 2.
      await api("/auth/staff/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      // TEMPORARY: the signed-in user is not stored yet (needs GET /api/auth/me).
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Show the server's own message for known errors (for example wrong password).
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-sidebar px-4">
      <div className="w-full max-w-sm rounded-xl border border-line bg-white p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
            H
          </span>
          <h1 className="text-xl font-bold text-ink">Sign in to HMS Staff</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-4 mt-1 block w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ink"
          />

          <label htmlFor="password" className="block text-sm font-semibold text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-4 mt-1 block w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ink"
          />

          {error ? (
            <p role="alert" className="mb-4 text-sm text-danger">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}