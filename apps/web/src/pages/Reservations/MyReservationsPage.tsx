import { Link } from 'react-router-dom'
import { listMyReservations } from '../../api/reservations'
import StatusBadge from '../../components/ui/Badge'
import { buttonClasses } from '../../components/ui/buttonClasses'
import { EmptyState, ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { useAsync } from '../../hooks/useAsync'
import { describeError } from '../../lib/errors'
import { formatDate } from '../../lib/formatDate'
import { formatMoney } from '../../lib/formatMoney'

export default function MyReservationsPage() {
  const list = useAsync(listMyReservations, 'my-reservations')
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">My reservations</h1>
      {list.loading && <LoadingBlock label="Loading your reservations…" />}
      {list.error != null && <ErrorState message={describeError(list.error)} onRetry={list.reload} />}
      {list.data && list.data.length === 0 && (
        <EmptyState title="You have no reservations yet">
          <Link to="/search" className={buttonClasses('primary', 'mt-3')}>
            Find a room
          </Link>
        </EmptyState>
      )}
      {list.data && list.data.length > 0 && (
        <ul className="space-y-3">
          {list.data.map((r) => (
            <li key={r.id} className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{r.code}</span>
                  <StatusBadge status={r.status} />
                </div>
                <p className="text-stone-800">{r.roomTypeName}</p>
                <p className="text-sm text-stone-600">
                  {formatDate(r.checkIn)} → {formatDate(r.checkOut)} · {formatMoney(r.total)}
                </p>
              </div>
              <Link to={`/account/reservations/${r.id}`} className={buttonClasses('secondary')}>
                View<span className="sr-only"> reservation {r.code}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
