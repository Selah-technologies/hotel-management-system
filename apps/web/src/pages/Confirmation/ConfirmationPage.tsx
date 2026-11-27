import { Link, useParams } from 'react-router-dom'
import { getMyReservation } from '../../api/reservations'
import ReservationSummary from '../../components/ReservationSummary'
import Alert from '../../components/ui/Alert'
import { buttonClasses } from '../../components/ui/buttonClasses'
import { ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { useAsync } from '../../hooks/useAsync'
import { describeError } from '../../lib/errors'

export default function ConfirmationPage() {
  const { id = '' } = useParams()
  const res = useAsync(() => getMyReservation(id), `conf-${id}`)

  if (res.loading) return <LoadingBlock label="Loading your reservation…" />
  if (res.error != null) return <ErrorState message={describeError(res.error)} onRetry={res.reload} />
  if (!res.data) return null

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Alert tone="success">Your booking is confirmed. Keep your reservation code for check-in.</Alert>
      <h1 className="font-serif text-3xl font-bold">Booking confirmation</h1>
      <ReservationSummary r={res.data} />
      <div className="flex flex-wrap gap-3">
        <Link to="/account/reservations" className={buttonClasses('primary')}>
          View my reservations
        </Link>
        <Link to="/" className={buttonClasses('secondary')}>
          Back to home
        </Link>
      </div>
    </div>
  )
}
