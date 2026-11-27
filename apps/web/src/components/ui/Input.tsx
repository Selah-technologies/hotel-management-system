import { useId, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export default function Input({ label, error, hint, id, className = '', ...rest }: Props) {
  const auto = useId()
  const inputId = id ?? auto
  const describedBy = [error ? `${inputId}-error` : '', hint ? `${inputId}-hint` : ''].filter(Boolean).join(' ')
  return (
    <div>
      <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-stone-800">
        {label}
        {rest.required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        {...rest}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-stone-900 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700 ${
          error ? 'border-red-600' : 'border-stone-300'
        } ${className}`}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1 text-sm text-stone-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
