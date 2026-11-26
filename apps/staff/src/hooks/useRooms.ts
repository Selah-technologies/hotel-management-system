import { useEffect, useState } from "react";
import { ApiError } from "../api/client";
import { listRooms } from "../api/rooms";
import type { Room } from "../types/rooms";

// Loads the room list and reports loading and error states for the screen.
export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0); // changing this number loads the list again

  useEffect(() => {
    let cancelled = false; // ignore an answer that arrives after the screen has moved on
    setLoading(true);
    setError(null);
    listRooms()
      .then((data) => {
        if (!cancelled) setRooms(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Could not load rooms.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return { rooms, loading, error, reload: () => setAttempt((n) => n + 1) };
}