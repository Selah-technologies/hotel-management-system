import { Link, useSearchParams } from 'react-router-dom'
import { searchAvailability } from '../../api/rooms'
import RoomImage from '../../components/RoomImage'
import SearchForm from '../../components/SearchForm'
import { buttonClasses } from '../../components/ui/buttonClasses'
import { EmptyState, ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import Alert from '../../components/ui/Alert'
import { useAsync } from '../../hooks/useAsync'
import { formatDate } from '../../lib/formatDate'
import { formatMoney } from '../../lib/formatMoney'
import { describeError } from '../../lib/errors'
import { validateStay } from '../../lib/dates'

export default function SearchPage() {
  const [params] = useSearchParams()
  const stay = {
    checkIn: params.get('checkIn') ?? '',
    checkOut: params.get('checkOut') ?? '',
    adults: params.get('adults') ?? '2',
  }
  const key = `${stay.checkIn}|${stay.checkOut}|${stay.adults}`
  const errors = validateStay(stay)
  const hasParams = params.has('checkIn') || params.has('checkOut')
  const valid = Object.keys(errors).length === 0

  const results = useAsync(
    () => searchAvailability({ checkIn: stay.checkIn, checkOut: stay.checkOut, adults: Number(stay.adults) }),
    key,
    valid,
  )

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-stone-900">Available rooms</h1>
      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <SearchForm key={key} initial={stay} submitLabel="Update search" />
      </div>

      {!hasParams && <EmptyState title="Choose your dates">Enter check-in, check-out and adults to see available rooms.</EmptyState>}
      {hasParams && !valid && <Alert tone="error">{Object.values(errors).join(' ')}</Alert>}

      {valid && (
        <section aria-live="polite" aria-label="Search results">
          <p className="mb-4 text-stone-700">
            {formatDate(stay.checkIn)} → {formatDate(stay.checkOut)} · {stay.adults} adult{stay.adults === '1' ? '' : 's'}
          </p>
          {results.loading && <LoadingBlock label="Checking availability…" />}
          {results.error != null && <ErrorState message={describeError(results.error)} onRetry={results.reload} />}
          {results.data && results.data.length === 0 && (
            <EmptyState title="No rooms available for these dates">Try different dates or fewer adults.</EmptyState>
          )}
          {results.data && results.data.length > 0 && (
            <ul className="space-y-4">
              {results.data.map((room) => {
                const book = `/book?${new URLSearchParams({ roomId: room.roomId, ...stay }).toString()}`
                return (
                  <li key={room.roomId} className="grid overflow-hidden rounded-xl border border-stone-200 bg-white sm:grid-cols-[14rem_1fr]">
                    <RoomImage room={room.roomType} className="h-40 w-full sm:h-full" />
                    <div className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
                      <div>
                        <h2 className="font-serif text-xl font-semibold">
                          <Link to={`/rooms/${room.roomType.id}`} className="hover:underline">
                            {room.roomType.name}
                          </Link>
                        </h2>
                        {room.roomNumber && <p className="text-sm text-stone-600">Room {room.roomNumber}</p>}
                        <p className="text-sm text-stone-600">Up to {room.roomType.maxAdults} adults</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm text-stone-600">
                          {formatMoney(room.nightlyRate)} × {room.nights} night{room.nights === 1 ? '' : 's'}
                        </p>
                        <p className="text-lg font-bold text-stone-900">Total {formatMoney(room.total)}</p>
                        <Link to={book} className={buttonClasses('primary', 'mt-2')}>
                          Book<span className="sr-only"> {room.roomType.name}</span>
                        </Link>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}
