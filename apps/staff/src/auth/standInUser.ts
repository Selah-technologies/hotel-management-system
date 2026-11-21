import type { CurrentUser, Permission, StaffRole } from "./types";

// TEMPORARY until GET /api/auth/me exists. Change this one line to try another role.
const STAND_IN_ROLE: StaffRole = "RECEPTIONIST";

// Copied from the handbook's PROPOSED matrix (Chapter 21).
// Every cell is TO BE CONFIRMED WITH HOTEL. The real list will come from the API.
const PERMISSIONS_BY_ROLE: Record<StaffRole, Permission[]> = {
  ADMIN: [
    "rooms.view", "rooms.manage", "rates.manage", "reservations.view",
    "reservations.create", "reservations.update", "reservations.cancel",
    "guests.view", "guests.manage", "stays.check_in", "stays.check_out",
    "invoices.view", "payments.record", "payments.refund", "services.order",
    "services.catalog", "housekeeping.view_all", "housekeeping.assign",
    "housekeeping.update", "maintenance.report", "maintenance.manage",
    "reports.operational", "reports.financial", "users.manage", "settings.manage",
    "audit.view",
  ],
  MANAGER: [
    "rooms.view", "rates.manage", "reservations.view", "reservations.cancel",
    "guests.view", "invoices.view", "payments.refund", "services.catalog",
    "housekeeping.view_all", "housekeeping.assign", "maintenance.report",
    "maintenance.manage", "reports.operational", "reports.financial",
  ],
  RECEPTIONIST: [
    "rooms.view", "reservations.view", "reservations.create", "reservations.update",
    "reservations.cancel", "guests.view", "guests.manage", "stays.check_in",
    "stays.check_out", "invoices.view", "payments.record", "services.order",
    "housekeeping.view_all", "maintenance.report",
  ],
  HOUSEKEEPING: ["housekeeping.view_own", "housekeeping.update", "maintenance.report"],
};

export const STAND_IN_USER: CurrentUser = {
  displayName: "Test user",
  role: STAND_IN_ROLE,
  permissions: PERMISSIONS_BY_ROLE[STAND_IN_ROLE],
};