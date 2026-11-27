import { useState } from "react";
import { hasAnyPermission } from "../auth/permissions";
import { useAuth } from "../auth/useAuth";
import PageHeader from "../components/PageHeader";
import SampleDataNotice from "../components/SampleDataNotice";
import TaskStatusBadge from "../components/TaskStatusBadge";
import { useHousekeepingTasks } from "../hooks/useHousekeepingTasks";
import { TASK_TYPE_LABELS } from "../types/housekeeping";

type Filter = "OPEN" | "DONE" | "ALL";

export default function HousekeepingPage() {
  const { user } = useAuth();
  const { tasks, loading, error, reload, start, complete, busyId, actionError } =
    useHousekeepingTasks();
  const [filter, setFilter] = useState<Filter>("OPEN");

  // Convenience only: the backend decides who may update a task.
  const canUpdate = hasAnyPermission(user, ["housekeeping.update"]);

  const isOpen = (status: string) => status === "PENDING" || status === "IN_PROGRESS";
  const visible = tasks.filter((task) => {
    if (filter === "OPEN") return isOpen(task.status);
    if (filter === "DONE") return task.status === "DONE";
    return true;
  });

  const filterButtons: { value: Filter; label: string; count: number }[] = [
    { value: "OPEN", label: "Open", count: tasks.filter((t) => isOpen(t.status)).length },
    { value: "DONE", label: "Done", count: tasks.filter((t) => t.status === "DONE").length },
    { value: "ALL", label: "All", count: tasks.length },
  ];

  return (
    <div>
      <PageHeader title="Housekeeping" description="Cleaning tasks and their progress." />
      <SampleDataNotice />

      {loading && (
        <p role="status" className="text-sm text-ink-soft">
          Loading tasks…
        </p>
      )}

      {!loading && error && (
        <div role="alert" className="rounded-xl border border-line bg-white p-6">
          <p className="text-sm text-danger">{error}</p>
          <button
            type="button"
            onClick={reload}
            className="mt-3 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {filterButtons.map((button) => (
              <button
                key={button.value}
                type="button"
                aria-pressed={filter === button.value}
                onClick={() => setFilter(button.value)}
                className={`rounded-lg border px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                  filter === button.value
                    ? "border-ink bg-ink font-semibold text-white"
                    : "border-line bg-white text-ink hover:border-ink"
                }`}
              >
                {button.label} ({button.count})
              </button>
            ))}
          </div>

          {actionError && (
            <p role="alert" className="mb-4 text-sm text-danger">
              {actionError}
            </p>
          )}

          {visible.length === 0 ? (
            <p className="text-sm text-ink-soft">No tasks here.</p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {visible.map((task) => (
                <li key={task.id} className="rounded-xl border border-line bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold text-ink">Room {task.room.roomNumber}</p>
                      <p className="text-sm text-ink-soft">{TASK_TYPE_LABELS[task.type]}</p>
                    </div>
                    <TaskStatusBadge status={task.status} />
                  </div>
                  <p className="mt-3 text-sm text-ink-soft">
                    Assigned to: {task.assignedTo?.fullName ?? "Not assigned"}
                  </p>
                  {task.notes ? <p className="mt-1 text-sm text-ink-soft">{task.notes}</p> : null}

                  {canUpdate && task.status === "PENDING" && (
                    <button
                      type="button"
                      disabled={busyId === task.id}
                      onClick={() => start(task.id)}
                      className="mt-4 min-h-12 w-full rounded-lg bg-ink px-4 text-base font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-60"
                    >
                      {busyId === task.id ? "Saving…" : "Start cleaning"}
                    </button>
                  )}
                  {canUpdate && task.status === "IN_PROGRESS" && (
                    <button
                      type="button"
                      disabled={busyId === task.id}
                      onClick={() => complete(task.id)}
                      className="mt-4 min-h-12 w-full rounded-lg bg-ink px-4 text-base font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-60"
                    >
                      {busyId === task.id ? "Saving…" : "Mark as done"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}