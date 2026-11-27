import { Link } from 'react-router-dom'
import { HOTEL_NAME } from '../../config'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-stone-600 sm:flex-row sm:justify-between">
        <p>
          © {YEAR} {HOTEL_NAME}
        </p>
        <nav aria-label="Footer" className="flex gap-4">
          <Link to="/rooms" className="underline">
            Rooms
          </Link>
          <Link to="/account/reservations" className="underline">
            My reservations
          </Link>
        </nav>
      </div>
    </footer>
  )
}
