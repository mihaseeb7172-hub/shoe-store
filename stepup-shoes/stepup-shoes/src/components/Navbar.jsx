import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Navbar() {
  const { count } = useStore()
  const link = ({ isActive }) => (isActive ? 'text-signal' : 'hover:text-signal')
  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-extrabold tracking-tight">StepUp<span className="text-signal">.</span></Link>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <NavLink to="/shop" className={link}>Shop</NavLink>
          <NavLink to="/admin" className={link}>Admin</NavLink>
          <NavLink to="/cart" className={link}>Cart ({count})</NavLink>
        </div>
      </nav>
    </header>
  )
}
