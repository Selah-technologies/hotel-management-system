import type { Room } from "../types/rooms";

// SAMPLE DATA ONLY. These are not the hotel's real rooms, numbers or room types.
export const SAMPLE_ROOMS: Room[] = [
  { id: "sample-1", roomNumber: "101", floor: 1, status: "AVAILABLE", roomType: { name: "Sample type A" } },
  { id: "sample-2", roomNumber: "102", floor: 1, status: "OCCUPIED", roomType: { name: "Sample type A" } },
  { id: "sample-3", roomNumber: "103", floor: 1, status: "DIRTY", roomType: { name: "Sample type A" } },
  { id: "sample-4", roomNumber: "104", floor: 1, status: "CLEANING", roomType: { name: "Sample type B" } },
  { id: "sample-5", roomNumber: "105", floor: 1, status: "OUT_OF_SERVICE", roomType: { name: "Sample type B" } },
  { id: "sample-6", roomNumber: "201", floor: 2, status: "AVAILABLE", roomType: { name: "Sample type B" } },
  { id: "sample-7", roomNumber: "202", floor: 2, status: "OCCUPIED", roomType: { name: "Sample type B" } },
  { id: "sample-8", roomNumber: "203", floor: 2, status: "AVAILABLE", roomType: { name: "Sample type C" } },
  { id: "sample-9", roomNumber: "204", floor: 2, status: "DIRTY", roomType: { name: "Sample type C" } },
  { id: "sample-10", roomNumber: "205", floor: 2, status: "OCCUPIED", roomType: { name: "Sample type C" } },
];