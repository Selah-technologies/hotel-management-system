// TEMPORARY: copied from handbook Chapter 21.
// The source of truth belongs in packages/shared (Member 2). Replace this file
// with an import from @hms/shared once it exports these names.

export type StaffRole = "ADMIN" | "MANAGER" | "RECEPTIONIST" | "HOUSEKEEPING";

export type Permission =
  | "rooms.view"
  | "rooms.manage"
  | "rates.manage"
  | "reservations.view"
  | "reservations.create"
  | "reservations.update"
  | "reservations.cancel"
  | "guests.view"
  | "guests.manage"
  | "stays.check_in"
  | "stays.check_out"
  | "invoices.view"
  | "payments.record"
  | "payments.refund"
  | "services.order"
  | "services.catalog"
  | "housekeeping.view_all"
  | "housekeeping.view_own"
  | "housekeeping.assign"
  | "housekeeping.update"
  | "maintenance.report"
  | "maintenance.manage"
  | "reports.operational"
  | "reports.financial"
  | "users.manage"
  | "settings.manage"
  | "audit.view";

// ASSUMED shape of GET /api/auth/me. TO BE CONFIRMED WITH MEMBER 2.
export type CurrentUser = {
  displayName: string;
  role: StaffRole;
  permissions: readonly Permission[];
};