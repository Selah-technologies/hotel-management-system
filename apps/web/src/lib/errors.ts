import { ApiError } from '../api/client'

/** One place that turns API results into human messages (handbook Ch. 31 mapping). */
export function describeError(err: unknown): string {
  if (!(err instanceof ApiError)) return 'Something went wrong. Please try again.'
  switch (err.status) {
    case 0:
      return 'Cannot reach the server. Check your connection and try again.'
    case 401:
      return err.message && err.message !== 'Request failed' ? err.message : 'Please log in to continue.'
    case 403:
      return 'You are not allowed to do this.'
    case 404:
      return 'We could not find what you were looking for.'
    case 409:
      if (err.code === 'ROOM_NOT_AVAILABLE')
        return 'Sorry, this room was just booked for those dates. Please choose another room or other dates.'
      return err.message
    case 400:
      return err.message === 'Request failed' ? 'Please check the highlighted fields.' : err.message
    case 422:
      return err.message
    case 429:
      return 'Too many attempts. Please try again in a moment.'
    default:
      return err.status >= 500
        ? 'The server had a problem. Please try again.'
        : err.message
  }
}

export function isConflict(err: unknown): boolean {
  return err instanceof ApiError && err.status === 409 && err.code === 'ROOM_NOT_AVAILABLE'
}

/** Reads field errors from a 400 response. Accepts { field: msg } or [{ path, message }]. */
export function fieldErrors(err: unknown): Record<string, string> {
  if (!(err instanceof ApiError) || err.status !== 400) return {}
  const d = err.details as unknown
  const out: Record<string, string> = {}
  if (Array.isArray(d)) {
    for (const item of d) {
      const path = Array.isArray(item?.path) ? item.path.join('.') : item?.path ?? item?.field
      if (path && item?.message) out[String(path)] = String(item.message)
    }
  } else if (d && typeof d === 'object') {
    for (const [k, v] of Object.entries(d)) if (typeof v === 'string') out[k] = v
  }
  return out
}

export function isNotFound(err: unknown): boolean {
  return err instanceof ApiError && err.status === 404
}

/** Only allow redirects to paths inside this app. */
export function safeNext(next: string | null, fallback = '/'): string {
  return next && next.startsWith('/') && !next.startsWith('//') ? next : fallback
}
