import type { ReactNode } from 'react'

type Tone = 'error' | 'success' | 'info'
const tones: Record<Tone, string> = {
  error: 'border-red-300 bg-red-50 text-red-900',
  success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  info: 'border-sky-300 bg-sky-50 text-sky-900',
}
const labels: Record<Tone, string> = { error: 'Error: ', success: 'Success: ', info: 'Note: ' }

export default function Alert({ tone = 'info', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${tones[tone]}`}>
      <span className="sr-only">{labels[tone]}</span>
      {children}
    </div>
  )
}
