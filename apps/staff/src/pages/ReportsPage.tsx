import { Link } from "react-router";
import { hasAnyPermission } from "../auth/permissions";
import { useAuth } from "../auth/useAuth";
import PageHeader from "../components/PageHeader";
import { REPORTS } from "../reports";

export default function ReportsPage() {
  const { user } = useAuth();
  // Convenience only: the backend decides who may read each report.
  const reports = REPORTS.filter((report) => hasAnyPermission(user, [report.permission]));

  return (
    <div>
      <PageHeader title="Reports" description="Read-only numbers for management." />
      {reports.length === 0 ? (
        <p className="text-sm text-ink-soft">No reports are available for your role.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {reports.map((report) => (
            <li key={report.slug}>
              <Link
                to={`/reports/${report.slug}`}
                className="block rounded-xl border border-line bg-white p-6 outline-none hover:border-ink focus-visible:ring-2 focus-visible:ring-ink"
              >
                <h2 className="text-base font-semibold text-ink">{report.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{report.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}