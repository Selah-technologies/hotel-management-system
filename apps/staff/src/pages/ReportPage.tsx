import { Link, useParams } from "react-router";
import { hasAnyPermission } from "../auth/permissions";
import { useAuth } from "../auth/useAuth";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import { REPORTS } from "../reports";
import NotAllowedPage from "./NotAllowedPage";
import NotFoundPage from "./NotFoundPage";

export default function ReportPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const report = REPORTS.find((item) => item.slug === slug);

  if (!report) return <NotFoundPage />;
  // Each report has its own permission, so the Reports menu check alone is not enough.
  if (!hasAnyPermission(user, [report.permission])) return <NotAllowedPage />;

  return (
    <div>
      <Link to="/reports" className="mb-4 inline-block text-sm text-ink underline">
        Back to Reports
      </Link>
      <PageHeader title={report.title} description={report.description} />
      <Panel title="Report data">
        <div className="flex min-h-48 flex-col items-center justify-center text-center">
          <p className="font-semibold text-ink">Nothing to show yet</p>
          <p className="mt-1 max-w-xs text-sm text-ink-soft">
            The numbers appear here once the reports API is connected.
          </p>
        </div>
      </Panel>
    </div>
  );
}