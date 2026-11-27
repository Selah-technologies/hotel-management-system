import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cancelReservation, getMyReservation } from '../../api/reservations'
import PolicyNotice from '../../components/PolicyNotice'
import ReservationSummary from '../../components/ReservationSummary'
import Alert from '../../components/ui/Alert'
import Button from '../../components/ui/Button'
import { ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { useAsync } from '../../hooks/useAsync'
import { describeError, isNotFound } from '../../lib/errors'

export default function ReservationDetailsPage() {
  const { id = '' } = useParams()
  const res = useAsync(() => getMyReservation(id), `res-${id}`)
  const [confirming, setConfirming] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function doCancel() {
    if (cancelling) return
    setCancelling(true)
    setError('')
    try {
      await cancelReservation(id)
      setDone(true)
      setConfirming(false)
      res.reload()
    } catch (err) {
      setError(describeError(err)) // the API decides whether cancellation is allowed
    } finally {
      setCancelling(false)
    }
  }

  if (res.loading && !res.data) return <LoadingBlock label="Loading reservation…" />
  if (res.error != null)
    return (
      <div className="space-y-3">
        <ErrorState message={isNotFound(res.error) ? 'We could not find this reservation.' : describeError(res.error)} onRetry={isNotFound(res.error) ? undefined : res.reload} />
        <Link to="/account/reservations" className="text-teal-800 underline">
          Back to my reservations
        </Link>
      </div>
    )
  if (!res.data) return null
  const r = res.data
  // Showing the button is only a hint. The API enforces the real cancellation rules.
  const mayTry = r.status === 'CONFIRMED' && !done

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/account/reservations" className="text-sm text-teal-800 underline">
        ← My reservations
      </Link>
      <h1 className="font-serif text-3xl font-bold">Reservation {r.code}</h1>
      {done && <Alert tone="success">Your reservation has been cancelled.</Alert>}
      {done && res.loading && <p className="text-sm text-stone-600" role="status">Updating reservation…</p>}
      <ReservationSummary r={r} />

      {mayTry && !confirming && (
        <Button variant="danger" onClick={() => setConfirming(true)}>
          Cancel reservation
        </Button>
      )}
      {mayTry && confirming && (
        <section aria-labelledby="cancel-title" className="space-y-3 rounded-xl border border-red-300 bg-red-50 p-4">
          <h2 id="cancel-title" className="font-semibold text-red-900">
            Cancel this reservation?
          </h2>
          <PolicyNotice />
          {error && <Alert tone="error">{error}</Alert>}
          <div className="flex flex-wrap gap-3">
            <Button variant="danger" loading={cancelling} onClick={doCancel}>
              {cancelling ? 'Cancelling…' : 'Yes, cancel it'}
            </Button>
            <Button variant="secondary" disabled={cancelling} onClick={() => setConfirming(false)}>
              Keep reservation
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
