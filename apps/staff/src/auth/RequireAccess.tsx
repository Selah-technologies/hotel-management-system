import { Outlet, useLocation } from "react-router";
import NotAllowedPage from "../pages/NotAllowedPage";
import { findNavItem } from "../navigation";
import { hasAnyPermission } from "./permissions";
import { useAuth } from "./useAuth";

// Shows the page when the user may open it, otherwise a "not allowed" screen.
// Convenience only: the backend enforces permissions.
// TEMPORARY: with no user this shows "not allowed". Later it redirects to /login.
export default function RequireAccess() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const item = findNavItem(pathname);

  if (item && !hasAnyPermission(user, item.anyOf)) {
    return <NotAllowedPage />;
  }
  return <Outlet />;
}