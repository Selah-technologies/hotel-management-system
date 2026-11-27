import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { HOTEL_NAME } from '../../config'
import { buttonClasses } from '../ui/buttonClasses'

const link = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium hover:bg-stone-100 ${isActive ? 'text-teal-800 underline underline-offset-4' : 'text-stone-700'}`

export default function Header() {
  const { user, loading, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const close = () => setOpen(false)

  async function handleLogout() {
    close()
    await logout()
    navigate('/')
  }

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-serif text-xl font-bold text-teal-900">
          {HOTEL_NAME}
        </Link>

        <button
          type="button"
          className="rounded-md border border-stone-300 px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close menu' : 'Menu'}
        </button>

        <nav
          id="main-nav"
          aria-label="Main"
          className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-14 z-10 flex-col gap-1 border-b border-stone-200 bg-white p-4 md:static md:flex md:flex-row md:items-center md:border-0 md:p-0`}
        >
          <NavLink to="/" end className={link} onClick={close}>
            Home
          </NavLink>
          <NavLink to="/rooms" className={link} onClick={close}>
            Rooms
          </NavLink>
          {!loading &&
            (user ? (
              <>
                <NavLink to="/account/reservations" className={link} onClick={close}>
                  My reservations
                </NavLink>
                <NavLink to="/account/profile" className={link} onClick={close}>
                  Profile
                </NavLink>
                <button type="button" onClick={handleLogout} className="rounded-md px-3 py-2 text-left text-sm font-medium text-stone-700 hover:bg-stone-100">
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={link} onClick={close}>
                  Log in
                </NavLink>
                <Link to="/register" className={buttonClasses('primary')} onClick={close}>
                  Register
                </Link>
              </>
            ))}
        </nav>
      </div>
    </header>
  )
}
