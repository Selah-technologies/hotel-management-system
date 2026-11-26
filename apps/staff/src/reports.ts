import type { Permission } from "./auth/types";

export type ReportDef = {
  slug: string; // used in the address: /reports/<slug>
  title: string;
  description: string;
  permission: Permission;
};

// From handbook Chapter 27 (MVP reports). Which reports management really reads
// is TO BE CONFIRMED WITH HOTEL. Reception reports (arrivals and departures, in-house,
// rooms by status, overdue departures) live on other screens, to be confirmed with the team.
export const REPORTS: ReportDef[] = [
  {
    slug: "occupancy",
    title: "Occupancy",
    description: "How full the hotel was over a date range.",
    permission: "reports.operational",
  },
  {
    slug: "cancellations",
    title: "Cancellations and no-shows",
    description: "Reservations that were cancelled or not honoured.",
    permission: "reports.operational",
  },
  {
    slug: "revenue",
    title: "Revenue",
    description: "Revenue by day or month.",
    permission: "reports.financial",
  },
];