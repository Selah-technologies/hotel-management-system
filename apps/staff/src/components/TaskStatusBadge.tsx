import type { TaskStatus } from "../types/housekeeping";

// The handbook defines colours for room statuses only. These follow the same idea
// (not started = orange like DIRTY, in progress = yellow like CLEANING, done = green like AVAILABLE).
// My choice, TO BE CONFIRMED WITH THE TEAM (Member 4, UX). The text is always shown too.
const STATUS_STYLES: Record<TaskStatus, { label: string; classes: string }> = {
  PENDING: { label: "Not started", classes: "bg-orange-100 text-orange-900" },
  IN_PROGRESS: { label: "In progress", classes: "bg-yellow-100 text-yellow-900" },
  DONE: { label: "Done", classes: "bg-green-100 text-green-900" },
  CANCELLED: { label: "Cancelled", classes: "bg-slate-100 text-slate-900" },
};

type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.classes}`}
    >
      {style.label}
    </span>
  );
}