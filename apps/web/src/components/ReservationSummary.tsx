import { formatDate } from '../lib/formatDate'
import { formatMoney } from '../lib/formatMoney'
import type { Reservation } from '../types'
import StatusBadge from './ui/Badge'

export default function ReservationSummary({ r }: { r: Reservation }) {
  const rows: [string, React.ReactNode][] = [
    ['Reservation code', <strong key="c">{r.code}</strong>],
    ['Status', <StatusBadge key="s" status={r.status} />],
    ['Room', `${r.roomTypeName}${r.roomNumber ? ` (room ${r.roomNumber})` : ''}`],
    ['Check-in', formatDate(r.checkIn)],
    ['Check-out', formatDate(r.checkOut)],
    ['Adults', String(r.adults)],
    ['Total', formatMoney(r.total)],
  ]
  if (r.paymentStatus) rows.push(['Payment', r.paymentStatus.toLowerCase()])
  if (r.notes) rows.push(['Special requests', r.notes])
  return (
    <dl className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-3">
          <dt className="text-sm text-stone-600">{k}</dt>
          <dd className="sm:col-span-2 text-stone-900">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
