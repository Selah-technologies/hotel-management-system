import { api, USE_MOCK } from './client'
import { mock } from './mock'
import type { AuthUser } from '../types'

export function getProfile(): Promise<AuthUser> {
  return USE_MOCK ? mock.getProfile() : api('/me/profile')
}

export function updateProfile(patch: { fullName: string; phone?: string }): Promise<AuthUser> {
  if (USE_MOCK) return mock.updateProfile(patch)
  return api('/me/profile', { method: 'PATCH', body: JSON.stringify(patch) })
}
