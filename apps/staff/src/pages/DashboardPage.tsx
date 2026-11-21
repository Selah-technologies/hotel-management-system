import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import StatPanel from "../components/StatPanel";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" description="What needs doing today." />
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Today's tasks">
          <div className="flex min-h-48 flex-col items-center justify-center text-center">
            <p className="font-semibold text-ink">Nothing to show yet</p>
            <p className="mt-1 max-w-xs text-sm text-ink-soft">
              Arrivals, departures and rooms to clean appear here once the reservations and
              housekeeping APIs are connected.
            </p>
          </div>
        </Panel>
        <StatPanel
          label="Today at a glance"
          stats={[
            { label: "Arrivals today", value: "—", note: "Not connected yet" },
            { label: "Departures today", value: "—", note: "Not connected yet" },
            { label: "Rooms to clean", value: "—", note: "Not connected yet" },
          ]}
        />
      </div>
    </div>
  );
}