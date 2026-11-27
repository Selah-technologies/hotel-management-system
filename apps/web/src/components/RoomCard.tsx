import { Link } from 'react-router-dom'
import { formatMoney } from '../lib/formatMoney'
import type { RoomType } from '../types'
import RoomImage from './RoomImage'

export default function RoomCard({ room }: { room: RoomType }) {
  return (
    <article className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <RoomImage room={room} className="h-44 w-full" />
      <div className="space-y-2 p-4">
        <h3 className="font-serif text-lg font-semibold text-stone-900">{room.name}</h3>
        <p className="text-sm text-stone-600">Up to {room.maxAdults} adults</p>
        {room.rateFrom && (
          <p className="text-stone-900">
            From <strong>{formatMoney(room.rateFrom)}</strong> <span className="text-sm text-stone-600">per night</span>
          </p>
        )}
        <Link to={`/rooms/${room.id}`} className="inline-block text-sm font-semibold text-teal-800 underline underline-offset-4">
          View details<span className="sr-only"> for {room.name}</span>
        </Link>
      </div>
    </article>
  )
}
