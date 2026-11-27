// Shape ASSUMED from the handbook data model (Room and RoomType).
// The real GET /api/staff/rooms response is TO BE CONFIRMED WITH MEMBER 2 at integration time.

export const ROOM_STATUSES = [
  "AVAILABLE",
  "OCCUPIED",
  "DIRTY",
  "CLEANING",
  "OUT_OF_SERVICE",
] as const;

export type RoomStatus = (typeof ROOM_STATUSES)[number];

export type Room = {
  id: string;
  roomNumber: string;
  floor: number | null;
  status: RoomStatus;
  roomType: { name: string };
};