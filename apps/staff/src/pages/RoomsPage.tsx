import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SampleDataNotice from "../components/SampleDataNotice";
import StatusBadge, { statusLabel } from "../components/StatusBadge";
import { useRooms } from "../hooks/useRooms";
import { ROOM_STATUSES } from "../types/rooms";
import type { RoomStatus } from "../types/rooms";

type Filter = RoomStatus | "ALL";

export default function RoomsPage() {
  const { rooms, loading, error, reload } = useRooms();
  const [filter, setFilter] = useState<Filter>("ALL");

  const sorted = [...rooms].sort((a, b) =>
    a.roomNumber.localeCompare(b.roomNumber, undefined, { numeric: true }),
  );
  const visible = filter === "ALL" ? sorted : sorted.filter((room) => room.status === filter);
  const countOf = (status: RoomStatus) => rooms.filter((room) => room.status === status).length;

  const filterButtons: { value: Filter; label: string; count: number }[] = [
    { value: "ALL", label: "All", count: rooms.length },
    ...ROOM_STATUSES.map((status) => ({
      value: status,
      label: statusLabel(status),
      count: countOf(status),
    })),
  ];

  return (
    <div>
      <PageHeader title="Rooms" description="Room list and status." />
      <SampleDataNotice />

      {loading && (
        <p role="status" className="text-sm text-ink-soft">
          Loading rooms…
        </p>
      )}

      {!loading && error && (
        <div role="alert" className="rounded-xl border border-line bg-white p-6">
          <p className="text-sm text-danger">{error}</p>
          <button
            type="button"
            onClick={reload}
            className="mt-3 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {filterButtons.map((button) => (
              <button
                key={button.value}
                type="button"
                aria-pressed={filter === button.value}
                onClick={() => setFilter(button.value)}
                className={`rounded-lg border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                  filter === button.value
                    ? "border-ink bg-ink font-semibold text-white"
                    : "border-line bg-white text-ink hover:border-ink"
                }`}
              >
                {button.label} ({button.count})
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-night text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Room</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Floor</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink-soft">
                      No rooms with this status.
                    </td>
                  </tr>
                ) : (
                  visible.map((room) => (
                    <tr key={room.id}>
                      <td className="px-4 py-3 font-semibold text-ink">{room.roomNumber}</td>
                      <td className="px-4 py-3 text-ink-soft">{room.floor ?? "—"}</td>
                      <td className="px-4 py-3 text-ink-soft">{room.roomType.name}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={room.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}