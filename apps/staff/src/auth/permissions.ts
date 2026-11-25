import type { CurrentUser, Permission } from "./types";

// No list means any signed-in staff member may see it.
export function hasAnyPermission(
  user: CurrentUser | null,
  anyOf?: readonly Permission[],
): boolean {
  if (!user) return false;
  if (!anyOf || anyOf.length === 0) return true;
  return anyOf.some((p) => user.permissions.includes(p));
}