import { Link } from 'react-router-dom'
import { listRoomTypes } from '../../api/rooms'
import RoomCard from '../../components/RoomCard'
import SearchForm from '../../components/SearchForm'
import { EmptyState, ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { HOTEL_NAME } from '../../config'
import { useAsync } from '../../hooks/useAsync'
import { describeError } from '../../lib/errors'

const steps = [
  ['Choose your dates', 'Tell us when you arrive, when you leave and how many adults are staying.'],
  ['Pick a room', 'See the rooms that are free for those dates, with the price for your stay.'],
  ['Confirm online', 'Log in, review your booking and receive your reservation code.'],
]

export default function HomePage() {
  const rooms = useAsync(listRoomTypes, 'home-rooms')

  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-teal-900 px-6 py-12 text-white sm:px-10">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">Welcome to {HOTEL_NAME}</h1>
        <p className="mt-2 max-w-xl text-teal-50">Check availability and book your stay online.</p>
        <div className="mt-8 rounded-xl bg-white p-5 text-stone-900 shadow-lg">
          <h2 className="mb-4 font-serif text-lg font-semibold">Find a room</h2>
          <SearchForm />
        </div>
      </section>

      <section aria-labelledby="featured">
        <div className="mb-4 flex items-end justify-between">
          <h2 id="featured" className="font-serif text-2xl font-semibold text-stone-900">
            Our rooms
          </h2>
          <Link to="/rooms" className="text-sm font-semibold text-teal-800 underline underline-offset-4">
            See all rooms
          </Link>
        </div>
        {rooms.loading && <LoadingBlock label="Loading rooms…" />}
        {rooms.error != null && <ErrorState message={describeError(rooms.error)} onRetry={rooms.reload} />}
        {rooms.data && rooms.data.length === 0 && <EmptyState title="Rooms are coming soon" />}
        {rooms.data && rooms.data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.data.slice(0, 3).map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="how">
        <h2 id="how" className="mb-4 font-serif text-2xl font-semibold text-stone-900">
          How booking works
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map(([title, text], i) => (
            <li key={title} className="rounded-xl border border-stone-200 bg-white p-5">
              <span className="text-sm font-semibold text-teal-800">Step {i + 1}</span>
              <h3 className="mt-1 font-semibold text-stone-900">{title}</h3>
              <p className="mt-1 text-sm text-stone-600">{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
