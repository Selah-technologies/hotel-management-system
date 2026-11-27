import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import Alert from '../../components/ui/Alert'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { describeError, fieldErrors, safeNext } from '../../lib/errors'

export default function RegisterPage() {
  const { user, loading, register } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'), '/account/reservations')
  const [v, setV] = useState({ fullName: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to={next} replace />
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV((s) => ({ ...s, [k]: e.target.value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    const local: Record<string, string> = {}
    if (!v.fullName.trim()) local.fullName = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) local.email = 'Enter a valid email address.'
    if (!v.password) local.password = 'Choose a password.'
    setErrors(local)
    setMessage('')
    if (Object.keys(local).length) return
    setSubmitting(true)
    try {
      await register({ fullName: v.fullName.trim(), email: v.email.trim(), phone: v.phone.trim() || undefined, password: v.password })
      navigate(next, { replace: true })
    } catch (err) {
      setErrors(fieldErrors(err)) // the API's field messages are the truth
      setMessage(describeError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-serif text-3xl font-bold">Create an account</h1>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        {message && <Alert tone="error">{message}</Alert>}
        <Input label="Full name" autoComplete="name" required value={v.fullName} onChange={set('fullName')} error={errors.fullName} />
        <Input label="Email" type="email" autoComplete="email" required value={v.email} onChange={set('email')} error={errors.email} />
        <Input label="Phone (optional)" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} error={errors.phone} />
        <Input label="Password" type="password" autoComplete="new-password" required value={v.password} onChange={set('password')} error={errors.password} />
        <Button type="submit" loading={submitting} className="w-full">
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="mt-4 text-sm text-stone-700">
        Already registered?{' '}
        <Link to={`/login${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`} className="font-semibold text-teal-800 underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
