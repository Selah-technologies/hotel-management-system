function toISO(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** Today in the browser's time zone. The backend decides using the hotel's time zone. */
export function todayISO(): string {
  return toISO(new Date())
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return toISO(new Date(y, m - 1, d + days))
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

export interface StayInput {
  checkIn: string
  checkOut: string
  adults: string
}
export type StayErrors = Partial<Record<keyof StayInput, string>>

/** Fast feedback only. The API remains the authority on every rule. */
export function validateStay(v: StayInput): StayErrors {
  const errors: StayErrors = {}
  if (!v.checkIn) errors.checkIn = 'Choose a check-in date.'
  else if (!isValidISODate(v.checkIn)) errors.checkIn = 'Enter a valid check-in date.'
  else if (v.checkIn < todayISO()) errors.checkIn = 'Check-in cannot be in the past.'

  if (!v.checkOut) errors.checkOut = 'Choose a check-out date.'
  else if (!isValidISODate(v.checkOut)) errors.checkOut = 'Enter a valid check-out date.'
  else if (v.checkIn && isValidISODate(v.checkIn) && v.checkOut <= v.checkIn)
    errors.checkOut = 'Check-out must be after check-in.'

  const adults = Number(v.adults)
  if (!v.adults) errors.adults = 'Enter the number of adults.'
  else if (!Number.isInteger(adults) || adults < 1) errors.adults = 'At least 1 adult is required.'
  return errors
}

export function searchUrl(s: StayInput | { checkIn: string; checkOut: string; adults: string | number }) {
  const q = new URLSearchParams({
    checkIn: s.checkIn,
    checkOut: s.checkOut,
    adults: String(s.adults),
  })
  return `/search?${q.toString()}`
}
