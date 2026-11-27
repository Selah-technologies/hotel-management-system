import { Outlet, ScrollRestoration } from 'react-router-dom'
import { USE_MOCK } from '../../api/client'
import { AuthProvider } from '../../auth/AuthProvider'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <AuthProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-20 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      {USE_MOCK && (
        <div className="bg-amber-100 px-4 py-1.5 text-center text-sm text-amber-900">
          Demo mode: fictional sample data, not the hotel's real information.
        </div>
      )}
      <Header />
      <main id="main" className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </AuthProvider>
  )
}
