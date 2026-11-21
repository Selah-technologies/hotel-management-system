import type { CurrentUser, Permission } from "./auth/types";

export type NavItem = {
  to: string;
  label: string;
  // The user needs at least one of these. No list means any signed-in staff member.
  anyOf?: Permission[];
};

// From handbook Chapter 30 (menu table) and Chapter 28 (staff routes).
export const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/reservations", label: "Reservations", anyOf: ["reservations.view"] },
  { to: "/stays", label: "Check-in / out", anyOf: ["stays.check_in"] },
  { to: "/guests", label: "Guests", anyOf: ["guests.view"] },
  { to: "/rooms", label: "Rooms", anyOf: ["rooms.view"] },
  {
    to: "/housekeeping",
    label: "Housekeeping",
    anyOf: ["housekeeping.view_all", "housekeeping.view_own"],
  },
  { to: "/maintenance", label: "Maintenance", anyOf: ["maintenance.report"] },
  { to: "/reports", label: "Reports", anyOf: ["reports.operational"] },
  { to: "/users", label: "Users", anyOf: ["users.manage"] },
  { to: "/settings", label: "Settings", anyOf: ["settings.manage"] },
  { to: "/audit", label: "Audit log", anyOf: ["audit.view"] },
];

// Convenience for honest users only. The backend decides what is actually allowed.
export function visibleNavItems(user: CurrentUser | null): NavItem[] {
  if (!user) return [];
  return NAV_ITEMS.filter(
    (item) => !item.anyOf || item.anyOf.some((p) => user.permissions.includes(p)),
  );
}