import { api, USE_MOCK } from './client'
import { mock } from './mock'
import type { AvailableRoom, RoomType, StaySearch } from '../types'

export function listRoomTypes(): Promise<RoomType[]> {
  return USE_MOCK ? mock.listRoomTypes() : api('/public/room-types')
}

export function getRoomType(id: string): Promise<RoomType> {
  return USE_MOCK ? mock.getRoomType(id) : api(`/public/room-types/${encodeURIComponent(id)}`)
}

export function searchAvailability(s: StaySearch): Promise<AvailableRoom[]> {
  if (USE_MOCK) return mock.searchAvailability(s)
  const q = new URLSearchParams({ checkIn: s.checkIn, checkOut: s.checkOut, adults: String(s.adults) })
  return api(`/public/availability?${q.toString()}`)
}
