import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import BookingPage from './pages/Booking/BookingPage'
import ConfirmationPage from './pages/Confirmation/ConfirmationPage'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import ProfilePage from './pages/Profile/ProfilePage'
import RegisterPage from './pages/Register/RegisterPage'
import MyReservationsPage from './pages/Reservations/MyReservationsPage'
import ReservationDetailsPage from './pages/Reservations/ReservationDetailsPage'
import RoomDetailsPage from './pages/RoomDetails/RoomDetailsPage'
import RoomsPage from './pages/Rooms/RoomsPage'
import SearchPage from './pages/Search/SearchPage'

const guard = (el: React.ReactElement) => <ProtectedRoute>{el}</ProtectedRoute>

// Handbook Ch. 28 routes: /, /rooms, /rooms/:id, /search, /login, /register, /account/reservations
// Added for the MVP screens in Ch. 29: /book, /booking/confirmation/:id, /account/reservations/:id, /account/profile
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/rooms', element: <RoomsPage /> },
      { path: '/rooms/:id', element: <RoomDetailsPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/book', element: guard(<BookingPage />) },
      { path: '/booking/confirmation/:id', element: guard(<ConfirmationPage />) },
      { path: '/account/reservations', element: guard(<MyReservationsPage />) },
      { path: '/account/reservations/:id', element: guard(<ReservationDetailsPage />) },
      { path: '/account/profile', element: guard(<ProfilePage />) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
