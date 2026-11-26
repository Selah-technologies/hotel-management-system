import { ApiError } from "../api/client";
import type { CurrentUser } from "../auth/types";
import type { HousekeepingTask, TaskStatus } from "../types/housekeeping";

// SAMPLE DATA ONLY. Not the hotel's real tasks, rooms or staff.
// Lives in memory only, so a page reload resets it.
const SAMPLE_CLEANER = "Sample cleaner 1";

let tasks: HousekeepingTask[] = [
  { id: "task-1", type: "CHECKOUT_CLEAN", status: "PENDING", notes: null, room: { roomNumber: "103" }, assignedTo: { fullName: SAMPLE_CLEANER } },
  { id: "task-2", type: "CHECKOUT_CLEAN", status: "PENDING", notes: null, room: { roomNumber: "204" }, assignedTo: { fullName: SAMPLE_CLEANER } },
  { id: "task-3", type: "CHECKOUT_CLEAN", status: "IN_PROGRESS", notes: null, room: { roomNumber: "104" }, assignedTo: { fullName: SAMPLE_CLEANER } },
  { id: "task-4", type: "STAYOVER_CLEAN", status: "PENDING", notes: null, room: { roomNumber: "201" }, assignedTo: { fullName: "Sample cleaner 2" } },
  { id: "task-5", type: "DEEP_CLEAN", status: "PENDING", notes: "Sample note.", room: { roomNumber: "202" }, assignedTo: null },
  { id: "task-6", type: "CHECKOUT_CLEAN", status: "DONE", notes: null, room: { roomNumber: "101" }, assignedTo: { fullName: SAMPLE_CLEANER } },
  { id: "task-7", type: "STAYOVER_CLEAN", status: "CANCELLED", notes: null, room: { roomNumber: "205" }, assignedTo: { fullName: "Sample cleaner 2" } },
];

// Imitates a backend rule (handbook Chapter 21): users without housekeeping.view_all
// only see their own tasks. The real backend does this, not the frontend.
export function sampleListTasks(user: CurrentUser): HousekeepingTask[] {
  const seesAll = user.permissions.includes("housekeeping.view_all");
  return tasks.filter((task) => seesAll || task.assignedTo?.fullName === SAMPLE_CLEANER);
}

// Imitates the backend check that a task can only move forward from the right status.
// The error code name is made up for sample mode.
function changeStatus(id: string, from: TaskStatus, to: TaskStatus): void {
  const task = tasks.find((item) => item.id === id);
  if (!task || task.status !== from) {
    throw new ApiError(422, "INVALID_TASK_STATE", "This task cannot be changed from its current status.");
  }
  tasks = tasks.map((item) => (item.id === id ? { ...item, status: to } : item));
}

export function sampleStartTask(id: string): void {
  changeStatus(id, "PENDING", "IN_PROGRESS");
}

export function sampleCompleteTask(id: string): void {
  changeStatus(id, "IN_PROGRESS", "DONE");
}