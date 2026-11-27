import { STAND_IN_USER } from "../auth/standInUser";
import { USE_SAMPLE_DATA } from "../config";
import { sampleCompleteTask, sampleListTasks, sampleStartTask } from "../mocks/housekeeping";
import type { HousekeepingTask } from "../types/housekeeping";
import { api } from "./client";

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // imitates network time

// GET /api/staff/housekeeping/tasks (handbook Chapter 19). Cleaners only get their own tasks.
export async function listTasks(): Promise<HousekeepingTask[]> {
  if (USE_SAMPLE_DATA) {
    await pause(300);
    return sampleListTasks(STAND_IN_USER);
  }
  return api<HousekeepingTask[]>("/staff/housekeeping/tasks");
}

// POST /api/staff/housekeeping/tasks/{id}/start, needs housekeeping.update.
export async function startTask(id: string): Promise<void> {
  if (USE_SAMPLE_DATA) {
    await pause(300);
    sampleStartTask(id);
    return;
  }
  await api<unknown>(`/staff/housekeeping/tasks/${id}/start`, { method: "POST" });
}

// POST /api/staff/housekeeping/tasks/{id}/complete, needs housekeeping.update.
export async function completeTask(id: string): Promise<void> {
  if (USE_SAMPLE_DATA) {
    await pause(300);
    sampleCompleteTask(id);
    return;
  }
  await api<unknown>(`/staff/housekeeping/tasks/${id}/complete`, { method: "POST" });
}