import type { RoomStatus } from "../types/rooms";

// Colours from handbook Chapter 28 (green, blue, orange, yellow, red).
// The text is always shown too, so colour is never the only signal.
// Text on background contrast is about 8:1 for all five (calculated).
const STATUS_STYLES: Record<RoomStatus, { label: string; classes: string }> = {
  AVAILABLE: { label: "Available", classes: "bg-green-100 text-green-900" },
  OCCUPIED: { label: "Occupied", classes: "bg-blue-100 text-blue-900" },
  DIRTY: { label: "Dirty", classes: "bg-orange-100 text-orange-900" },
  CLEANING: { label: "Cleaning", classes: "bg-yellow-100 text-yellow-900" },
  OUT_OF_SERVICE: { label: "Out of service", classes: "bg-red-100 text-red-900" },
};

export function statusLabel(status: RoomStatus): string {
  return STATUS_STYLES[status].label;
}

type StatusBadgeProps = {
  status: RoomStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.classes}`}
    >
      {style.label}
    </span>
  );
}