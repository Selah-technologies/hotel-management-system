import { useEffect, useState, type FormEvent } from 'react'
import { getProfile, updateProfile } from '../../api/profile'
import { useAuth } from '../../auth/useAuth'
import Alert from '../../components/ui/Alert'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { ErrorState, LoadingBlock } from '../../components/ui/StateViews'
import { useAsync } from '../../hooks/useAsync'
import { describeError, fieldErrors } from '../../lib/errors'

export default function ProfilePage() {
  const { refresh } = useAuth()
  const profile = useAsync(getProfile, 'profile')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile.data) {
      setFullName(profile.data.fullName)
      setPhone(profile.data.phone ?? '')
    }
  }, [profile.data])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (saving) return
    setSaved(false)
    setMessage('')
    if (!fullName.trim()) return setErrors({ fullName: 'Enter your full name.' })
    setErrors({})
    setSaving(true)
    try {
      await updateProfile({ fullName: fullName.trim(), phone: phone.trim() || undefined })
      await refresh()
      setSaved(true)
    } catch (err) {
      setErrors(fieldErrors(err))
      setMessage(describeError(err))
    } finally {
      setSaving(false)
    }
  }

  if (profile.loading) return <LoadingBlock label="Loading your profile…" />
  if (profile.error != null) return <ErrorState message={describeError(profile.error)} onRetry={profile.reload} />

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-serif text-3xl font-bold">Profile</h1>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        {saved && <Alert tone="success">Your details have been saved.</Alert>}
        {message && <Alert tone="error">{message}</Alert>}
        <Input label="Email" value={profile.data?.email ?? ''} readOnly hint="Your email cannot be changed here." />
        <Input label="Full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} />
        <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
        <Button type="submit" loading={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </form>
    </div>
  )
}
