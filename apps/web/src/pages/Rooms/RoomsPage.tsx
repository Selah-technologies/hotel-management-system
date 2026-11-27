import { listRoomTypes } from '../../api/rooms'
import RoomCard from '../../components/RoomCard'
import { EmptyState, ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { useAsync } from '../../hooks/useAsync'
import { describeError } from '../../lib/errors'

export default function RoomsPage() {
  const rooms = useAsync(listRoomTypes, 'rooms')
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-stone-900">Rooms</h1>
      <p className="mt-1 text-stone-600">Choose a room type to see details and check availability.</p>
      <div className="mt-6">
        {rooms.loading && <LoadingBlock label="Loading rooms…" />}
        {rooms.error != null && <ErrorState message={describeError(rooms.error)} onRetry={rooms.reload} />}
        {rooms.data && rooms.data.length === 0 && <EmptyState title="No rooms to show yet">Please check back soon.</EmptyState>}
        {rooms.data && rooms.data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.data.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
