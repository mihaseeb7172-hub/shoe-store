import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage'
import { money, useStore } from '../context/StoreContext'

export default function ProductDetail() {
  const { id } = useParams()
  const { products, addToCart } = useStore()
  const nav = useNavigate()
  const p = products.find((x) => String(x.id) === id)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [error, setError] = useState('')

  if (!p) return <p>Shoe not found. <Link className="text-signal" to="/shop">Back to shop</Link></p>
  const chosen = color || p.colors[0]

  const add = () => {
    if (!size) return setError('Choose a size first.')
    addToCart(p, size, chosen)
    nav('/cart')
  }
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ProductImage p={p} className="h-80 rounded-3xl" emojiClass="text-9xl" />
      <div>
        <p className="text-sm text-slate-500">{p.brand} - {p.category}</p>
        <h1 className="text-3xl font-extrabold">{p.name}</h1>
        <p className="mt-2 text-2xl font-bold text-signal">{money(p.price)}</p>
        <h3 className="mt-6 font-semibold">Color</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {p.colors.map((c) => (
            <button key={c} onClick={() => setColor(c)} className={`rounded-full border px-4 py-1 text-sm ${chosen === c ? 'border-signal bg-signal text-white' : 'bg-white'}`}>{c}</button>
          ))}
        </div>
        <h3 className="mt-6 font-semibold">Size (EU)</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button key={s} onClick={() => { setSize(s); setError('') }} className={`h-10 w-10 rounded-lg border text-sm ${size === s ? 'border-ink bg-ink text-white' : 'bg-white'}`}>{s}</button>
          ))}
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button onClick={add} className="btn mt-6">Add to cart</button>
      </div>
    </div>
  )
}
