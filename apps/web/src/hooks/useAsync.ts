import { useEffect, useState } from 'react'

interface State<T> {
  data: T | null
  error: unknown
  loading: boolean
}

/**
 * Runs an async function and tracks loading / error / data.
 * Re-runs when `key` changes or `reload()` is called.
 * (Handbook D-08 is still open: this can be swapped for TanStack Query later.)
 */
export function useAsync<T>(fn: () => Promise<T>, key: string, enabled = true) {
  const [state, setState] = useState<State<T>>({ data: null, error: null, loading: enabled })
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    fn().then(
      (data) => !cancelled && setState({ data, error: null, loading: false }),
      (error) => !cancelled && setState({ data: null, error, loading: false }),
    )
    return () => {
      cancelled = true
    }
  }, [key, nonce, enabled])

  return { ...state, reload: () => setNonce((n) => n + 1) }
}
