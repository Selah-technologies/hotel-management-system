import { api, ApiError, USE_MOCK } from './client'
import { mock } from './mock'
import type { AuthUser, RegisterInput } from '../types'

/** Returns the signed-in user, or null when nobody is signed in. */
export async function getMe(): Promise<AuthUser | null> {
  try {
    return USE_MOCK ? await mock.getMe() : await api<AuthUser>('/auth/me')
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null
    throw e
  }
}

export function customerLogin(email: string, password: string): Promise<void> {
  if (USE_MOCK) return mock.login(email, password)
  return api('/auth/customer/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export function customerRegister(input: RegisterInput): Promise<void> {
  if (USE_MOCK) return mock.register(input)
  return api('/auth/customer/register', { method: 'POST', body: JSON.stringify(input) })
}

export function logout(): Promise<void> {
  if (USE_MOCK) return mock.logout()
  return api('/auth/logout', { method: 'POST' })
}
