import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDays, searchUrl, todayISO, validateStay, type StayInput } from '../lib/dates'
import Button from './ui/Button'
import Input from './ui/Input'

export default function SearchForm({ initial, submitLabel = 'Check availability' }: { initial?: Partial<StayInput>; submitLabel?: string }) {
  const navigate = useNavigate()
  const [values, setValues] = useState<StayInput>({
    checkIn: initial?.checkIn ?? '',
    checkOut: initial?.checkOut ?? '',
    adults: initial?.adults ?? '2',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof StayInput, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)

  const errors = validateStay(values)
  const shown = (k: keyof StayInput) => (submitted || touched[k] ? errors[k] : undefined)
  const set = (k: keyof StayInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }))
  const blur = (k: keyof StayInput) => () => setTouched((t) => ({ ...t, [k]: true }))

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length === 0) navigate(searchUrl(values))
  }

  const today = todayISO()
  const minOut = values.checkIn && values.checkIn >= today ? addDays(values.checkIn, 1) : addDays(today, 1)

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
      <Input label="Check-in" type="date" required min={today} value={values.checkIn} onChange={set('checkIn')} onBlur={blur('checkIn')} error={shown('checkIn')} />
      <Input label="Check-out" type="date" required min={minOut} value={values.checkOut} onChange={set('checkOut')} onBlur={blur('checkOut')} error={shown('checkOut')} />
      <Input label="Adults" type="number" required min={1} inputMode="numeric" value={values.adults} onChange={set('adults')} onBlur={blur('adults')} error={shown('adults')} />
      <div className="sm:col-span-2 lg:col-span-1 lg:pt-6">
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
