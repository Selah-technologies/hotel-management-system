import { USE_SAMPLE_DATA } from "../config";
import { SAMPLE_ROOMS } from "../mocks/rooms";
import type { Room } from "../types/rooms";
import { api } from "./client";

export async function listRooms(): Promise<Room[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300)); // imitate a network delay
    return SAMPLE_ROOMS;
  }
  // GET /api/staff/rooms (handbook Chapter 19), needs rooms.view. Not tested against a real backend yet.
  return api<Room[]>("/staff/rooms");
}