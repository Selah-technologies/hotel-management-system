import { api, USE_MOCK } from './client'
import { mock } from './mock'
import type { CreateReservationInput, Reservation } from '../types'

// The page never sends a customer id: the backend uses the logged-in session (handbook Ch. 29).

export function createReservation(input: CreateReservationInput): Promise<Reservation> {
  if (USE_MOCK) return mock.createReservation(input)
  return api('/me/reservations', { method: 'POST', body: JSON.stringify(input) })
}

export function listMyReservations(): Promise<Reservation[]> {
  return USE_MOCK ? mock.listMyReservations() : api('/me/reservations')
}

export function getMyReservation(id: string): Promise<Reservation> {
  return USE_MOCK ? mock.getMyReservation(id) : api(`/me/reservations/${encodeURIComponent(id)}`)
}

export function cancelReservation(id: string): Promise<Reservation> {
  if (USE_MOCK) return mock.cancelReservation(id)
  return api(`/me/reservations/${encodeURIComponent(id)}/cancel`, { method: 'POST' })
}
