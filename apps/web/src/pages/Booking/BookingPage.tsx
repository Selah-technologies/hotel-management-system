import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { searchAvailability } from '../../api/rooms'
import { createReservation } from '../../api/reservations'
import { useAuth } from '../../auth/useAuth'
import PolicyNotice from '../../components/PolicyNotice'
import RoomImage from '../../components/RoomImage'
import Alert from '../../components/ui/Alert'
import Button from '../../components/ui/Button'
import { buttonClasses } from '../../components/ui/buttonClasses'
import { ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { useAsync } from '../../hooks/useAsync'
import { searchUrl, validateStay } from '../../lib/dates'
import { describeError, fieldErrors, isConflict } from '../../lib/errors'
import { formatDate } from '../../lib/formatDate'
import { formatMoney } from '../../lib/formatMoney'

export default function BookingPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const roomId = params.get('roomId') ?? ''
  const stay = { checkIn: params.get('checkIn') ?? '', checkOut: params.get('checkOut') ?? '', adults: params.get('adults') ?? '' }
  const valid = Boolean(roomId) && Object.keys(validateStay(stay)).length === 0
  const backToResults = searchUrl({ ...stay, adults: stay.adults || '2' })

  // The backend tells us the room is still free and what it costs. We never compute the price here.
  const avail = useAsync(
    () => searchAvailability({ checkIn: stay.checkIn, checkOut: stay.checkOut, adults: Number(stay.adults) }),
    `${roomId}|${stay.checkIn}|${stay.checkOut}|${stay.adults}`,
    valid,
  )

  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [conflict, setConflict] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const busy = useRef(false) // blocks a second click before React re-renders

  if (!valid)
    return (
      <div className="space-y-4">
        <Alert tone="error">This booking link is incomplete. Please search for your dates again.</Alert>
        <Link to="/search" className={buttonClasses('primary')}>
          Search rooms
        </Link>
      </div>
    )
  if (avail.loading) return <LoadingBlock label="Checking this room…" />
  if (avail.error != null) return <ErrorState message={describeError(avail.error)} onRetry={avail.reload} />

  const room = avail.data?.find((r) => r.roomId === roomId)
  if (!room || conflict)
    return (
      <div className="space-y-4">
        <Alert tone="error">{conflict
            ? 'Sorry, this room was just booked for those dates. Please choose another room or other dates.'
            : 'This room is no longer available for these dates.'}</Alert>
        <Link to={backToResults} className={buttonClasses('primary')}>
          Back to results
        </Link>
      </div>
    )

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy.current) return
    busy.current = true
    setSubmitting(true)
    setMessage('')
    setErrors({})
    try {
      const res = await createReservation({
        roomId,
        checkIn: stay.checkIn,
        checkOut: stay.checkOut,
        adults: Number(stay.adults),
        notes: notes.trim() || undefined,
      })
      navigate(`/booking/confirmation/${res.id}`, { replace: true })
    } catch (err) {
      if (isConflict(err)) setConflict(true)
      else {
        setMessage(describeError(err))
        setErrors(fieldErrors(err))
      }
      busy.current = false
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Review and confirm</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={onSubmit} className="space-y-6">
          <section aria-labelledby="guest" className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 id="guest" className="mb-3 font-serif text-xl font-semibold">
              Guest details
            </h2>
            <p className="text-stone-800">{user?.fullName}</p>
            <p className="text-sm text-stone-600">{user?.email}</p>
            <div className="mt-4">
              <label htmlFor="notes" className="mb-1 block text-sm font-medium">
                Special requests (optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                maxLength={500}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                aria-invalid={errors.notes ? true : undefined}
                className="block w-full rounded-lg border border-stone-300 px-3 py-2 focus-visible:outline-2 focus-visible:outline-teal-700"
              />
              {errors.notes && <p className="mt-1 text-sm font-medium text-red-700">{errors.notes}</p>}
              <p className="mt-1 text-sm text-stone-600">Optional. Sent with your booking.</p>
            </div>
          </section>
          <PolicyNotice />
          {message && <Alert tone="error">{message}</Alert>}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" loading={submitting}>
              {submitting ? 'Confirming…' : 'Confirm booking'}
            </Button>
            <Link to={backToResults} className={buttonClasses('secondary')}>
              Back to results
            </Link>
          </div>
        </form>

        <aside aria-labelledby="summary" className="h-fit overflow-hidden rounded-xl border border-stone-200 bg-white">
          <RoomImage room={room.roomType} className="h-36 w-full" />
          <div className="space-y-2 p-4">
            <h2 id="summary" className="font-serif text-lg font-semibold">
              {room.roomType.name}
            </h2>
            <p className="text-sm text-stone-700">
              {formatDate(stay.checkIn)} → {formatDate(stay.checkOut)}
            </p>
            <p className="text-sm text-stone-700">
              {stay.adults} adult{stay.adults === '1' ? '' : 's'} · {room.nights} night{room.nights === 1 ? '' : 's'}
            </p>
            <p className="text-sm text-stone-600">
              {formatMoney(room.nightlyRate)} per night
            </p>
            <p className="border-t border-stone-200 pt-2 text-lg font-bold">Total {formatMoney(room.total)}</p>
            <p className="text-xs text-stone-600">The final price is confirmed by the system when you book.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
