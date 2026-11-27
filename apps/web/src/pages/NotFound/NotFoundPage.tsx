import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/ui/buttonClasses'

export default function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-serif text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-stone-600">The page you are looking for does not exist.</p>
      <Link to="/" className={buttonClasses('primary', 'mt-6')}>
        Back to home
      </Link>
    </div>
  )
}
