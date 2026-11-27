import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { customerLogin, customerRegister, getMe, logout as apiLogout } from '../api/auth'
import { setUnauthorizedHandler } from '../api/client'
import type { AuthUser, RegisterInput } from '../types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      setUser(await getMe())
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null)) // a 401 anywhere signs the user out in the UI
    refresh()
    return () => setUnauthorizedHandler(null)
  }, [refresh])

  const login = useCallback(
    async (email: string, password: string) => {
      await customerLogin(email, password)
      await refresh()
    },
    [refresh],
  )
  const register = useCallback(
    async (input: RegisterInput) => {
      await customerRegister(input)
      await refresh()
    },
    [refresh],
  )
  const logout = useCallback(async () => {
    try {
      await apiLogout()
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading, login, register, logout, refresh],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
