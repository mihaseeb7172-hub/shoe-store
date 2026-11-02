import { useState } from 'react'
import { money, useStore } from '../context/StoreContext'
import { CATEGORIES } from '../data/products'

const blank = { name: '', brand: '', category: 'Sneakers', price: '', emoji: '👟', bg: '#e2e8f0', image: '' }

export default function Admin() {
  const { products, orders, saveProduct, deleteProduct } = useStore()
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [form, setForm] = useState(blank)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  if (!authed) return (
    <form onSubmit={(e) => { e.preventDefault(); pw === 'admin123' ? setAuthed(true) : alert('Wrong password. Demo password: admin123') }} className="mx-auto max-w-xs space-y-3">
      <h1 className="text-2xl font-extrabold">Admin login</h1>
      <input type="password" className="input" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <button className="btn w-full">Log in</button>
    </form>
  )

  const submit = (e) => { e.preventDefault(); saveProduct({ ...form, price: Number(form.price) }); setForm(blank) }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-3 text-2xl font-extrabold">{form.id ? 'Edit shoe' : 'Add a shoe'}</h1>
        <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 md:grid-cols-3">
          <input required className="input" placeholder="Name" value={form.name} onChange={set('name')} />
          <input required className="input" placeholder="Brand" value={form.brand} onChange={set('brand')} />
          <select className="input" value={form.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          <input required type="number" min="1" className="input" placeholder="Price (Rs.)" value={form.price} onChange={set('price')} />
          <input className="input" placeholder="Emoji" value={form.emoji} onChange={set('emoji')} />
          <input type="color" className="input !p-1" value={form.bg} onChange={set('bg')} aria-label="Card color" />
          <input className="input md:col-span-3" placeholder="Image path or URL (optional), e.g. images/my-shoe.jpg" value={form.image || ''} onChange={set('image')} />
          <button className="btn md:col-span-2">{form.id ? 'Save changes' : 'Add shoe'}</button>
          {form.id && <button type="button" className="rounded-full border px-4 text-sm" onClick={() => setForm(blank)}>Cancel</button>}
        </form>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-extrabold">Products ({products.length})</h2>
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-100"><tr><th className="p-3">Name</th><th>Category</th><th>Price</th><th></th></tr></thead>
            <tbody>{products.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-3">{p.emoji} {p.name}</td><td>{p.category}</td><td>{money(p.price)}</td>
                <td className="space-x-3 pr-3 text-right">
                  <button className="text-signal" onClick={() => setForm(p)}>Edit</button>
                  <button className="text-red-600" onClick={() => confirm(`Delete ${p.name}?`) && deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>))}</tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-extrabold">Orders ({orders.length})</h2>
        {orders.length === 0 ? <p className="text-slate-500">No orders yet. Orders placed at checkout appear here.</p> : (
          <div className="space-y-3">{orders.map((o) => (
            <div key={o.id} className="rounded-2xl bg-white p-4 text-sm ring-1 ring-slate-200">
              <p className="font-bold">{o.name} - {o.phone} - {money(o.total)}</p>
              <p className="text-slate-500">{o.address} ({o.date})</p>
              <p>{o.items.map((i) => `${i.name} (${i.size}, ${i.color}) x${i.qty}`).join(', ')}</p>
            </div>))}
          </div>
        )}
      </section>
    </div>
  )
}
