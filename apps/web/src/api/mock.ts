// Fictional fixtures for working without the real API (VITE_USE_MOCK=true).
// Every name, rate and room here is a placeholder, NOT the hotel's real data.
// Demo login: demo@example.com / password123
// Demo trick: put the text "simulate-conflict" in the special-requests box to see a 409.

import { ApiError } from './client'
import { addDays, todayISO } from '../lib/dates'
import type {
  AuthUser,
  AvailableRoom,
  CreateReservationInput,
  RegisterInput,
  Reservation,
  RoomType,
  StaySearch,
} from '../types'

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms))
const usd = (amount: number) => ({ amount: amount.toFixed(2), currency: 'USD' })

// Keep demo data across page reloads (this browser tab only).
function load<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function save(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: data lasts until reload */
  }
}

const roomTypes: RoomType[] = [
  {
    id: 'rt-standard',
    name: 'Standard Room',
    description: 'A quiet, comfortable room for one or two guests. (Sample text.)',
    maxAdults: 2,
    amenities: ['Wi-Fi', 'Private bathroom', 'Desk'],
    photos: [],
    rateFrom: usd(60),
  },
  {
    id: 'rt-deluxe',
    name: 'Deluxe Room',
    description: 'More space and a seating area. (Sample text.)',
    maxAdults: 3,
    amenities: ['Wi-Fi', 'Private bathroom', 'Seating area', 'Breakfast option'],
    photos: [],
    rateFrom: usd(95),
  },
  {
    id: 'rt-family',
    name: 'Family Suite',
    description: 'Two connected areas for families or small groups. (Sample text.)',
    maxAdults: 4,
    amenities: ['Wi-Fi', 'Private bathroom', 'Two sleeping areas'],
    photos: [],
    rateFrom: usd(140),
  },
]

const rooms = [
  { id: 'room-101', number: '101', typeId: 'rt-standard' },
  { id: 'room-102', number: '102', typeId: 'rt-standard' },
  { id: 'room-201', number: '201', typeId: 'rt-deluxe' },
  { id: 'room-202', number: '202', typeId: 'rt-deluxe' },
  { id: 'room-301', number: '301', typeId: 'rt-family' },
]

interface StoredReservation extends Reservation {
  userId: string
  roomId: string
}

const reservations: StoredReservation[] = load<StoredReservation[]>('mock-reservations', [
  {
    id: 'res-seed-1',
    code: 'DEMO-0001',
    userId: 'u-demo',
    roomId: 'room-101',
    status: 'CHECKED_OUT',
    checkIn: addDays(todayISO(), -20),
    checkOut: addDays(todayISO(), -18),
    adults: 2,
    roomTypeName: 'Standard Room',
    roomNumber: '101',
    total: usd(120),
    paymentStatus: 'PAID',
    createdAt: addDays(todayISO(), -30),
  },
])

const users = load('mock-users', [
  { id: 'u-demo', email: 'demo@example.com', fullName: 'Demo Guest', phone: '', password: 'password123' },
])

let currentUserId: string | null = null
try {
  currentUserId = sessionStorage.getItem('mock-user')
} catch {
  /* storage unavailable: start signed out */
}
const setCurrent = (id: string | null) => {
  currentUserId = id
  try {
    if (id) sessionStorage.setItem('mock-user', id)
    else sessionStorage.removeItem('mock-user')
  } catch {
    /* ignore */
  }
}

const publicUser = (u: (typeof users)[number]): AuthUser => ({
  id: u.id,
  email: u.email,
  fullName: u.fullName,
  phone: u.phone || undefined,
})

function requireUser() {
  const u = users.find((x) => x.id === currentUserId)
  if (!u) throw new ApiError(401, 'UNAUTHENTICATED', 'Please log in to continue.')
  return u
}

const overlaps = (aIn: string, aOut: string, bIn: string, bOut: string) => aIn < bOut && bIn < aOut
const nightsBetween = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000)

function isFree(roomId: string, checkIn: string, checkOut: string) {
  return !reservations.some(
    (r) => r.roomId === roomId && r.status === 'CONFIRMED' && overlaps(checkIn, checkOut, r.checkIn, r.checkOut),
  )
}

const strip = ({ userId: _u, roomId: _r, ...rest }: StoredReservation): Reservation => rest

export const mock = {
  async getMe(): Promise<AuthUser> {
    await delay(150)
    return publicUser(requireUser())
  },
  async login(email: string, password: string) {
    await delay()
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password)
    if (!u) throw new ApiError(401, 'INVALID_CREDENTIALS', 'Incorrect email or password.')
    setCurrent(u.id)
  },
  async register(input: RegisterInput) {
    await delay()
    if (users.some((x) => x.email.toLowerCase() === input.email.toLowerCase()))
      throw new ApiError(409, 'EMAIL_TAKEN', 'An account with this email already exists.')
    const id = `u-${users.length + 1}`
    users.push({ id, email: input.email, fullName: input.fullName, phone: input.phone ?? '', password: input.password })
    save('mock-users', users)
    setCurrent(id)
  },
  async logout() {
    await delay(100)
    setCurrent(null)
  },
  async listRoomTypes() {
    await delay()
    return roomTypes
  },
  async getRoomType(id: string) {
    await delay()
    const t = roomTypes.find((x) => x.id === id)
    if (!t) throw new ApiError(404, 'NOT_FOUND', 'Room type not found')
    return t
  },
  async searchAvailability(s: StaySearch): Promise<AvailableRoom[]> {
    await delay()
    const nights = nightsBetween(s.checkIn, s.checkOut)
    return rooms
      .filter((r) => isFree(r.id, s.checkIn, s.checkOut))
      .map((r) => ({ r, t: roomTypes.find((t) => t.id === r.typeId)! }))
      .filter(({ t }) => t.maxAdults >= s.adults)
      .map(({ r, t }) => ({
        roomId: r.id,
        roomNumber: r.number,
        roomType: t,
        nights,
        nightlyRate: t.rateFrom!,
        total: usd(Number(t.rateFrom!.amount) * nights),
      }))
  },
  async createReservation(input: CreateReservationInput) {
    await delay(600)
    const u = requireUser()
    const room = rooms.find((r) => r.id === input.roomId)
    if (!room) throw new ApiError(404, 'NOT_FOUND', 'Room not found')
    if (input.notes?.includes('simulate-conflict') || !isFree(room.id, input.checkIn, input.checkOut))
      throw new ApiError(409, 'ROOM_NOT_AVAILABLE', 'Room is not available for these dates')
    const t = roomTypes.find((x) => x.id === room.typeId)!
    const res: StoredReservation = {
      id: `res-${reservations.length + 1}`,
      code: `DEMO-${String(reservations.length + 1).padStart(4, '0')}`,
      userId: u.id,
      roomId: room.id,
      status: 'CONFIRMED',
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      adults: input.adults,
      roomTypeName: t.name,
      roomNumber: room.number,
      total: usd(Number(t.rateFrom!.amount) * nightsBetween(input.checkIn, input.checkOut)),
      paymentStatus: 'UNPAID',
      notes: input.notes,
      createdAt: new Date().toISOString(),
    }
    reservations.push(res)
    save('mock-reservations', reservations)
    return strip(res)
  },
  async listMyReservations() {
    await delay()
    const u = requireUser()
    return reservations.filter((r) => r.userId === u.id).map(strip)
  },
  async getMyReservation(id: string) {
    await delay()
    const u = requireUser()
    const r = reservations.find((x) => x.id === id && x.userId === u.id)
    if (!r) throw new ApiError(404, 'NOT_FOUND', 'Reservation not found') // never reveal others' bookings
    return strip(r)
  },
  async cancelReservation(id: string) {
    await delay(500)
    const u = requireUser()
    const r = reservations.find((x) => x.id === id && x.userId === u.id)
    if (!r) throw new ApiError(404, 'NOT_FOUND', 'Reservation not found')
    if (r.status !== 'CONFIRMED') throw new ApiError(422, 'INVALID_STATE', 'This reservation cannot be cancelled.')
    // Sample rule for the demo only. The real rule is TO BE CONFIRMED WITH HOTEL.
    if (r.checkIn <= todayISO()) throw new ApiError(422, 'CANCELLATION_NOT_ALLOWED', 'Sample rule: cancellation is closed once the stay has started.')
    r.status = 'CANCELLED'
    save('mock-reservations', reservations)
    return strip(r)
  },
  async getProfile() {
    await delay(200)
    return publicUser(requireUser())
  },
  async updateProfile(patch: { fullName: string; phone?: string }) {
    await delay()
    const u = requireUser()
    u.fullName = patch.fullName
    u.phone = patch.phone ?? ''
    save('mock-users', users)
    return publicUser(u)
  },
}
