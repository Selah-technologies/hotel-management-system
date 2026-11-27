import type { RoomType } from '../types'

export default function RoomImage({ room, className = '' }: { room: RoomType; className?: string }) {
  const src = room.photos[0]
  if (src) return <img src={src} alt={room.name} loading="lazy" className={`object-cover ${className}`} />
  return (
    <div
      role="img"
      aria-label={`${room.name} (photo coming soon)`}
      className={`flex items-center justify-center bg-gradient-to-br from-stone-200 to-teal-100 text-sm text-stone-600 ${className}`}
    >
      Photo coming soon
    </div>
  )
}
