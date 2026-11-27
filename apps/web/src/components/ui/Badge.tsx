import type { ReservationStatus } from '../../types'

const styles: Record<string, string> = {
  CONFIRMED: 'bg-emerald-100 text-emerald-900 ring-emerald-300',
  CANCELLED: 'bg-stone-200 text-stone-800 ring-stone-400',
  CHECKED_IN: 'bg-sky-100 text-sky-900 ring-sky-300',
  CHECKED_OUT: 'bg-stone-100 text-stone-800 ring-stone-300',
  NO_SHOW: 'bg-red-100 text-red-900 ring-red-300',
}

/** Status is always shown as text as well as colour, so colour is never the only signal. */
export default function StatusBadge({ status }: { status: ReservationStatus }) {
  const label = status.replace(/_/g, ' ').toLowerCase()
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${
        styles[status] ?? 'bg-amber-100 text-amber-900 ring-amber-300'
      }`}
    >
      {label}
    </span>
  )
}
