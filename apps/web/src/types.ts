// Shapes the UI expects from the API.
// TO BE AGREED with Member 1 (schema) and Member 2 (API) in docs/api-contract.md.
// Only api/*.ts and api/mock.ts should need to change if the contract differs.

export interface Money {
  amount: string // decimal string, e.g. "120.00". Display only, never calculate with it.
  currency: string // e.g. "USD"
}

export interface RoomType {
  id: string
  name: string
  description: string
  maxAdults: number
  amenities: string[]
  photos: string[]
  rateFrom: Money | null
}

export interface AvailableRoom {
  roomId: string
  roomNumber?: string
  roomType: RoomType
  nights: number
  nightlyRate: Money
  total: Money // computed by the backend
}

export type ReservationStatus =
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'NO_SHOW'
  | (string & {})

export interface Reservation {
  id: string
  code: string
  status: ReservationStatus
  checkIn: string // YYYY-MM-DD
  checkOut: string // YYYY-MM-DD
  adults: number
  roomTypeName: string
  roomNumber?: string
  total: Money
  paymentStatus?: string
  notes?: string
  createdAt: string
}

export interface AuthUser {
  id: string
  email: string
  fullName: string
  phone?: string
}

export interface StaySearch {
  checkIn: string
  checkOut: string
  adults: number
}

export interface CreateReservationInput extends StaySearch {
  roomId: string
  notes?: string
}

export interface RegisterInput {
  fullName: string
  email: string
  phone?: string
  password: string
}
