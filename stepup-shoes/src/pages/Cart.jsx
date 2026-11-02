import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductImage from '../components/ProductImage'
import { money, useStore } from '../context/StoreContext'

export default function Cart() {
  const { cart, changeQty, removeItem, total, placeOrder, user } = useStore()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '' })
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => { e.preventDefault(); if (!user) return nav('/login', { state: { from: '/cart' } }); placeOrder(form); setDone(true) }

  if (done) return <p className="text-lg font-semibold">Order placed. Thank you! <Link className="text-signal" to="/orders">Track your order</Link> or <Link className="text-signal" to="/shop">keep shopping</Link></p>
  if (cart.length === 0) return <p>Your cart is empty. <Link className="text-signal" to="/shop">Browse shoes</Link></p>

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="space-y-3 md:col-span-2">
        {cart.map((i) => (
          <div key={i.key} className="flex items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-slate-200">
            <ProductImage p={i} className="h-16 w-16 shrink-0 rounded-xl" emojiClass="text-3xl" />
            <div className="flex-1">
              <p className="font-bold">{i.name}</p>
              <p className="text-sm text-slate-500">Size {i.size} - {i.color} - {money(i.price)}</p>
            </div>
            <button onClick={() => changeQty(i.key, -1)} className="h-8 w-8 rounded-full border" aria-label="Decrease">-</button>
            <span className="w-5 text-center">{i.qty}</span>
            <button onClick={() => changeQty(i.key, 1)} className="h-8 w-8 rounded-full border" aria-label="Increase">+</button>
            <button onClick={() => removeItem(i.key)} className="text-sm text-red-600">Remove</button>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="text-lg font-extrabold">Checkout</h2>
        <input required className="input" placeholder="Full name" value={form.name} onChange={set('name')} />
        <input required className="input" placeholder="Phone" value={form.phone} onChange={set('phone')} />
        <textarea required className="input" rows="3" placeholder="Delivery address" value={form.address} onChange={set('address')} />
        <p className="font-bold">Total: {money(total)}</p>
        {user ? <button className="btn w-full">Place order</button> : (
          <>
            <button type="button" className="btn w-full" onClick={() => nav('/login', { state: { from: '/cart' } })}>Log in to place order</button>
            <p className="text-center text-sm text-slate-500">New here? <Link className="text-signal" to="/signup" state={{ from: '/cart' }}>Create an account</Link></p>
          </>
        )}
      </form>
    </div>
  )
}
