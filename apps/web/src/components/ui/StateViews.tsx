import type { ReactNode } from 'react'
import Alert from './Alert'
import Button from './Button'

export function LoadingBlock({ label = 'Loading…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-stone-600">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-teal-800 border-t-transparent" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="space-y-3 py-6">
      <Alert tone="error">{message}</Alert>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
      <h2 className="font-serif text-xl font-semibold text-stone-900">{title}</h2>
      {children && <div className="mt-2 text-stone-600">{children}</div>}
    </div>
  )
}
