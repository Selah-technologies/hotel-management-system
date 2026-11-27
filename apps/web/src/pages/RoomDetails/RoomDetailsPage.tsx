import { Link, useParams } from 'react-router-dom'
import { getRoomType } from '../../api/rooms'
import RoomImage from '../../components/RoomImage'
import SearchForm from '../../components/SearchForm'
import { ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { useAsync } from '../../hooks/useAsync'
import { formatMoney } from '../../lib/formatMoney'
import { describeError, isNotFound } from '../../lib/errors'

export default function RoomDetailsPage() {
  const { id = '' } = useParams()
  const room = useAsync(() => getRoomType(id), `room-${id}`)

  if (room.loading) return <LoadingBlock label="Loading room…" />
  if (room.error != null)
    return (
      <div>
        <ErrorState message={isNotFound(room.error) ? 'This room could not be found.' : describeError(room.error)} onRetry={isNotFound(room.error) ? undefined : room.reload} />
        <Link to="/rooms" className="text-teal-800 underline">
          Back to all rooms
        </Link>
      </div>
    )
  if (!room.data) return null
  const r = room.data

  return (
    <div className="space-y-8">
      <Link to="/rooms" className="text-sm text-teal-800 underline">
        ← All rooms
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <RoomImage room={r} className="h-72 w-full rounded-xl" />
          {r.photos.length > 1 && (
            <ul className="grid grid-cols-3 gap-2">
              {r.photos.slice(1, 4).map((p) => (
                <li key={p}>
                  <img src={p} alt={`${r.name} view`} loading="lazy" className="h-24 w-full rounded-lg object-cover" />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-4">
          <h1 className="font-serif text-3xl font-bold text-stone-900">{r.name}</h1>
          <p className="text-stone-700">{r.description}</p>
          <p className="text-stone-700">Up to {r.maxAdults} adults</p>
          {r.rateFrom && (
            <p className="text-lg">
              From <strong>{formatMoney(r.rateFrom)}</strong> <span className="text-sm text-stone-600">per night</span>
            </p>
          )}
          {r.amenities.length > 0 && (
            <section aria-labelledby="amenities">
              <h2 id="amenities" className="mb-2 font-semibold text-stone-900">
                Amenities
              </h2>
              <ul className="flex flex-wrap gap-2">
                {r.amenities.map((a) => (
                  <li key={a} className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-800">
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      <section aria-labelledby="check" className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 id="check" className="mb-4 font-serif text-xl font-semibold">
          Check availability
        </h2>
        <SearchForm />
      </section>
    </div>
  )
}
