import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { money } from '../context/StoreContext'

export default function ProductCard({ p }) {
  return (
    <Link to={`/product/${p.id}`} className="block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 hover:ring-signal">
      <ProductImage p={p} className="h-44" />
      <div className="p-4">
        <p className="text-xs text-slate-500">{p.brand} - {p.category}</p>
        <h3 className="font-bold">{p.name}</h3>
        <p className="mt-1 font-semibold text-signal">{money(p.price)}</p>
      </div>
    </Link>
  )
}
