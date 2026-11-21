import { NavLink, Outlet } from "react-router";
import { useAuth } from "../auth/useAuth";
import { visibleNavItems } from "../navigation";
import { useState } from "react";

// Uses the browser's clock. The hotel's time zone is TO BE CONFIRMED WITH HOTEL.
function formatToday(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navItems = visibleNavItems(user);
  return (
    <div className="min-h-screen bg-white text-ink md:flex">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-10 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <aside className="border-b border-line bg-sidebar md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex h-16 items-center justify-between border-b border-line px-4 md:px-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
              H
            </span>
            <span className="text-base font-semibold">HMS Staff</span>
          </div>
          <button
            type="button"
            className="rounded-lg border border-line bg-white px-3 py-1.5 text-sm md:hidden"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
        <nav
          id="main-nav"
          aria-label="Main"
          className={`${menuOpen ? "block" : "hidden"} p-3 md:block`}
        >
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-ink font-semibold text-white"
                        : "text-ink-soft hover:bg-black/5 hover:text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="hidden h-16 items-center justify-between border-b border-line px-8 md:flex">
          <p className="text-sm text-ink-soft">{formatToday()}</p>
  <p className="text-sm text-ink-soft">
  {user ? `Test role: ${user.role} (temporary, not a real sign-in)` : "Not signed in"}
</p>
        </header>
        <main id="main" tabIndex={-1} className="flex-1 px-4 py-8 outline-none md:px-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
        <footer className="border-t border-line px-4 py-4 text-xs text-ink-soft md:px-8">
          HMS Staff dashboard
        </footer>
      </div>
    </div>
  );
}