import { useEffect, useState } from "react";
import { ApiError } from "../api/client";
import { completeTask, listTasks, startTask } from "../api/housekeeping";
import type { HousekeepingTask } from "../types/housekeeping";

// Loads the task list and runs the Start and Complete actions.
export function useHousekeepingTasks() {
  const [tasks, setTasks] = useState<HousekeepingTask[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0); // changing this number loads the list again
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false; // ignore an answer that arrives after the screen has moved on
    setError(null);
    listTasks()
      .then((data) => {
        if (cancelled) return;
        setTasks(data);
        setLoaded(true);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Could not load tasks.");
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  async function run(id: string, action: (taskId: string) => Promise<void>) {
    setBusyId(id);
    setActionError(null);
    try {
      await action(id);
      setAttempt((n) => n + 1); // show the new status
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "That did not work. Try again.");
    } finally {
      setBusyId(null);
    }
  }

  return {
    tasks,
    loading: !loaded && !error,
    error,
    reload: () => setAttempt((n) => n + 1),
    start: (id: string) => run(id, startTask),
    complete: (id: string) => run(id, completeTask),
    busyId,
    actionError,
  };
}