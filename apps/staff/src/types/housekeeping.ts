// Shape ASSUMED from the handbook data model (HousekeepingTask, Chapter 25).
// The real GET /api/staff/housekeeping/tasks response is TO BE CONFIRMED WITH MEMBER 2 at integration time.

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export type TaskType = "CHECKOUT_CLEAN" | "STAYOVER_CLEAN" | "DEEP_CLEAN";

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  CHECKOUT_CLEAN: "Check-out clean",
  STAYOVER_CLEAN: "Stay-over clean",
  DEEP_CLEAN: "Deep clean",
};

export type HousekeepingTask = {
  id: string;
  type: TaskType;
  status: TaskStatus;
  notes: string | null;
  room: { roomNumber: string };
  assignedTo: { fullName: string } | null;
};